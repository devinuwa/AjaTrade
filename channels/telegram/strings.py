"""User-facing text for the Telegram adapter, keyed by language code.

English is the source language; every other language currently falls back
to English until real translations land. Handlers must pull all display
text from here — no hardcoded strings in handlers.
"""

from __future__ import annotations

TEXTS: dict[str, dict[str, str]] = {
    "en": {
        # Step 1 — language
        "language_prompt": "Please select your preferred language / Da fatan zaɓi yaren ku:",
        "language_set_ack": "Language set to {language}.",
        # Step 2 — segment
        "segment_question": (
            "Are you looking for help as a farmer/buyer, "
            "or are you here as a seller/vendor?"
        ),
        "segment_customer": "👨‍🌾 I need help",
        "segment_vendor": "🏪 I'm a seller",
        # Step 3 — greetings
        "greeting_customer": "Hello {name}, I am AjaTrade. How can I help you today?",
        "greeting_vendor": (
            "Hello {name}, I am AjaTrade. "
            "Here's how I can help you grow your business:"
        ),
        # Customer menu
        "menu_diagnose": "Diagnose a crop problem (send a photo or voice note)",
        "menu_price": "Check today's market price",
        "menu_connect_vendor": "Connect me to a herbicide/fertilizer vendor",
        "menu_talk_human": "Talk to a real person",
        # Vendor menu
        "menu_register": "Register as a vendor",
        "menu_list_products": "List your products or prices",
        "menu_find_buyers": "Get connected to buyers",
        "menu_learn_more": "Learn more about AjaTrade for sellers",
        # Shared replies
        "coming_soon": "Coming soon.",
        "unknown_option": "Unknown option. Please try again.",
    },
    # TODO: real translations. Empty dicts fall back to English.
    "ha": {},
    "yo": {},
    "ig": {},
    "pcm": {},
}


def text(language: str | None, key: str) -> str:
    """Text for ``key`` in ``language``, falling back to English.

    Raises ``KeyError`` for keys missing from English — that is a
    developer mistake, not something to show to a user.
    """
    if language is not None:
        localized = TEXTS.get(language, {}).get(key)
        if localized is not None:
            return localized
    return TEXTS["en"][key]
