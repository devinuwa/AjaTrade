"""Onboarding Steps 1–3 (AGENTS.md → Onboarding Flow):

1. Language — /start and /language show the language keyboard
2. Segment  — asked right after the language is saved
3. Menu     — personalized greeting + segment menu; /menu and returning
               /start land here directly

Every user-facing string comes from strings.py; this module only wires
callbacks to db helpers.
"""

from __future__ import annotations

from aiogram import Router
from aiogram.exceptions import TelegramBadRequest
from aiogram.filters import Command, CommandStart
from aiogram.filters.callback_data import CallbackData
from aiogram.types import (
    CallbackQuery,
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    Message,
    User,
)

from channels.telegram.strings import text
from core import db

router = Router()

# Language code -> display name. Spelled the same in every language by
# design, so these are labels here rather than entries in strings.py.
LANGUAGE_LABELS: dict[str, str] = {
    "ha": "Hausa",
    "yo": "Yoruba",
    "ig": "Igbo",
    "pcm": "Pidgin",
    "en": "English",
}

# One flag per language button label (never in body text).
FLAG = "\U0001F1F3\U0001F1EC"

# Values allowed in users.segment (AGENTS.md → Data Model).
SEGMENTS: tuple[str, ...] = ("customer", "vendor")

# segment -> menu as (last_intent, strings.py key) rows.
SEGMENT_MENUS: dict[str, tuple[tuple[str, str], ...]] = {
    "customer": (
        ("diagnose", "menu_diagnose"),
        ("price_check", "menu_price"),
        ("vendor_connect", "menu_connect_vendor"),
        ("talk_to_human", "menu_talk_human"),
    ),
    "vendor": (
        ("vendor_register", "menu_register"),
        ("vendor_list_products", "menu_list_products"),
        ("vendor_find_buyers", "menu_find_buyers"),
        ("vendor_learn_more", "menu_learn_more"),
    ),
}


class LanguageChosen(CallbackData, prefix="lang"):
    """Language button payload, e.g. ``lang:ha``."""

    code: str


class SegmentChosen(CallbackData, prefix="seg"):
    """Segment button payload, e.g. ``seg:customer``."""

    segment: str


class MenuAction(CallbackData, prefix="act"):
    """Menu button payload, e.g. ``act:diagnose`` — stored as last_intent."""

    intent: str


def display_name(user: User) -> str:
    """first_name, falling back to username (AGENTS.md Conversation Rules)."""
    return user.first_name or user.username or ""


def _language_keyboard() -> InlineKeyboardMarkup:
    """One full-width row per language: large, hard-to-miss tap targets."""
    rows = [
        [
            InlineKeyboardButton(
                text=f"{FLAG} {LANGUAGE_LABELS[code]}",
                callback_data=LanguageChosen(code=code).pack(),
            )
        ]
        for code in LANGUAGE_LABELS
    ]
    return InlineKeyboardMarkup(inline_keyboard=rows)


def _segment_keyboard(language: str | None) -> InlineKeyboardMarkup:
    """The two Step 2 choices side by side, as written in AGENTS.md."""
    row = [
        InlineKeyboardButton(
            text=text(language, "segment_customer"),
            callback_data=SegmentChosen(segment="customer").pack(),
        ),
        InlineKeyboardButton(
            text=text(language, "segment_vendor"),
            callback_data=SegmentChosen(segment="vendor").pack(),
        ),
    ]
    return InlineKeyboardMarkup(inline_keyboard=[row])


def _menu(
    language: str | None,
    name: str,
    segment: str,
) -> tuple[str, InlineKeyboardMarkup]:
    """(Greeting, menu keyboard) for a fully onboarded user — Step 3."""
    greeting = text(language, f"greeting_{segment}").format(name=name)
    keyboard = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text=text(language, key),
                    callback_data=MenuAction(intent=intent).pack(),
                )
            ]
            for intent, key in SEGMENT_MENUS[segment]
        ]
    )
    return greeting, keyboard


async def _route(message: Message) -> None:
    """Resume onboarding where the user left off, or show their main menu."""
    if message.from_user is None:
        return
    user = await db.upsert_user(message.from_user.id, display_name(message.from_user))
    language = user["language"]
    segment = user["segment"]
    if language is None:
        await message.answer(text(None, "language_prompt"), reply_markup=_language_keyboard())
    elif segment is None:
        await message.answer(
            text(language, "segment_question"),
            reply_markup=_segment_keyboard(language),
        )
    else:
        greeting, keyboard = _menu(language, user["name"], segment)
        await message.answer(greeting, reply_markup=keyboard)


@router.message(CommandStart())
async def on_start(message: Message) -> None:
    """New users begin at Step 1; onboarded users jump straight to their menu."""
    await _route(message)


@router.message(Command("menu"))
async def on_menu(message: Message) -> None:
    """Main menu for the saved segment and language (AGENTS.md Conversation Rules)."""
    await _route(message)


@router.message(Command("language"))
async def on_language(message: Message) -> None:
    """Re-show the Step 1 keyboard so the language can be changed later."""
    if message.from_user is None:
        return
    user = await db.upsert_user(message.from_user.id, display_name(message.from_user))
    await message.answer(
        text(user["language"], "language_prompt"),
        reply_markup=_language_keyboard(),
    )


@router.callback_query(LanguageChosen.filter())
async def on_language_chosen(
    callback: CallbackQuery,
    callback_data: LanguageChosen,
) -> None:
    """Save the language (Step 1), acknowledge it, then ask Step 2."""
    language = callback_data.code
    display = LANGUAGE_LABELS.get(language)
    if display is None:
        await callback.answer(text(None, "unknown_option"), show_alert=True)
        return

    await db.set_language(callback.from_user.id, language)
    if isinstance(callback.message, Message):
        ack = text(language, "language_set_ack").format(language=display)
        try:
            await callback.message.edit_text(ack)
        except TelegramBadRequest:
            pass  # a double-tap raced the first edit — choice already saved
        user = await db.get_user(callback.from_user.id)
        if user is not None and user["segment"] is None:
            await callback.message.answer(
                text(language, "segment_question"),
                reply_markup=_segment_keyboard(language),
            )
    await callback.answer()


@router.callback_query(SegmentChosen.filter())
async def on_segment_chosen(
    callback: CallbackQuery,
    callback_data: SegmentChosen,
) -> None:
    """Save the segment (Step 2) and turn the question into the Step 3 menu."""
    segment = callback_data.segment
    if segment not in SEGMENTS:
        await callback.answer(text(None, "unknown_option"), show_alert=True)
        return

    await db.set_segment(callback.from_user.id, segment)
    user = await db.get_user(callback.from_user.id)
    if user is None:
        await callback.answer()
        return
    greeting, keyboard = _menu(user["language"], user["name"], segment)
    if isinstance(callback.message, Message):
        try:
            await callback.message.edit_text(greeting, reply_markup=keyboard)
        except TelegramBadRequest:
            pass  # double-tap: the menu is already on screen
    await callback.answer()


@router.callback_query(MenuAction.filter())
async def on_menu_action(
    callback: CallbackQuery,
    callback_data: MenuAction,
) -> None:
    """Record last_intent; real routing lands with the Step 4 features."""
    await db.set_last_intent(callback.from_user.id, callback_data.intent)
    user = await db.get_user(callback.from_user.id)
    language = user["language"] if user is not None else None
    if isinstance(callback.message, Message):
        await callback.message.answer(text(language, "coming_soon"))
    await callback.answer()
