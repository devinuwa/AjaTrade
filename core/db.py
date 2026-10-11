"""SQLite storage shared by every AjaTrade channel.

Tables (AGENTS.md → Data Model):

- ``users`` — one row per Telegram profile
- ``vendor_requests`` — the customer → vendor connection funnel

No Telegram imports here: this module is channel-agnostic. The async
helpers run each SQLite call in a worker thread so the bot's event loop
never blocks.
"""

from __future__ import annotations

import asyncio
import sqlite3
from collections.abc import Iterator
from contextlib import contextmanager
from typing import TypedDict, cast

from config import DB_PATH

_USER_COLUMNS = "telegram_id, name, language, segment, created_at, last_intent"


class User(TypedDict):
    """A row of the ``users`` table."""

    telegram_id: int
    name: str
    language: str | None
    segment: str | None
    created_at: str
    last_intent: str | None


class VendorRequest(TypedDict):
    """A row of the ``vendor_requests`` table."""

    request_id: int
    telegram_id: int
    input_needed: str
    location_text: str | None
    status: str
    created_at: str


_SCHEMA = """
CREATE TABLE IF NOT EXISTS users (
    telegram_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    language TEXT,
    segment TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    last_intent TEXT
);

CREATE TABLE IF NOT EXISTS vendor_requests (
    request_id INTEGER PRIMARY KEY AUTOINCREMENT,
    telegram_id INTEGER NOT NULL REFERENCES users (telegram_id),
    input_needed TEXT NOT NULL,
    location_text TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
"""


@contextmanager
def _connect() -> Iterator[sqlite3.Connection]:
    """Open a short-lived connection; commit on success, roll back on error."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    try:
        yield conn
        conn.commit()
    except BaseException:
        conn.rollback()
        raise
    finally:
        conn.close()


def init_db() -> None:
    """Create both tables if they do not exist yet. Safe to call repeatedly."""
    with _connect() as conn:
        conn.executescript(_SCHEMA)


def _get_user_sync(telegram_id: int) -> User | None:
    with _connect() as conn:
        row = conn.execute(
            f"SELECT {_USER_COLUMNS} FROM users WHERE telegram_id = ?",
            (telegram_id,),
        ).fetchone()
    if row is None:
        return None
    return cast(User, dict(row))


def _upsert_user_sync(telegram_id: int, name: str) -> User:
    """Create the user if new; refresh ``name`` without touching the rest."""
    with _connect() as conn:
        conn.execute(
            """
            INSERT INTO users (telegram_id, name)
            VALUES (?, ?)
            ON CONFLICT (telegram_id) DO UPDATE SET name = excluded.name
            """,
            (telegram_id, name),
        )
        row = conn.execute(
            f"SELECT {_USER_COLUMNS} FROM users WHERE telegram_id = ?",
            (telegram_id,),
        ).fetchone()
    if row is None:
        raise RuntimeError(f"user {telegram_id} missing right after upsert")
    return cast(User, dict(row))


def _set_language_sync(telegram_id: int, language: str) -> None:
    with _connect() as conn:
        conn.execute(
            "UPDATE users SET language = ? WHERE telegram_id = ?",
            (language, telegram_id),
        )


def _set_segment_sync(telegram_id: int, segment: str) -> None:
    with _connect() as conn:
        conn.execute(
            "UPDATE users SET segment = ? WHERE telegram_id = ?",
            (segment, telegram_id),
        )


def _set_last_intent_sync(telegram_id: int, intent: str) -> None:
    with _connect() as conn:
        conn.execute(
            "UPDATE users SET last_intent = ? WHERE telegram_id = ?",
            (intent, telegram_id),
        )


def _create_vendor_request_sync(
    telegram_id: int,
    input_needed: str,
    location_text: str | None,
) -> int:
    with _connect() as conn:
        cursor = conn.execute(
            """
            INSERT INTO vendor_requests (telegram_id, input_needed, location_text)
            VALUES (?, ?, ?)
            """,
            (telegram_id, input_needed, location_text),
        )
    if cursor.lastrowid is None:
        raise RuntimeError("insert did not return a request_id")
    return cursor.lastrowid


async def get_user(telegram_id: int) -> User | None:
    """Return the user's row, or None if they have not been onboarded yet."""
    return await asyncio.to_thread(_get_user_sync, telegram_id)


async def upsert_user(telegram_id: int, name: str) -> User:
    """Ensure the user exists and their display name is current."""
    return await asyncio.to_thread(_upsert_user_sync, telegram_id, name)


async def set_language(telegram_id: int, language: str) -> None:
    """Store the Step 1 choice (e.g. ``ha``, ``yo``, ``ig``, ``pcm``, ``en``).

    Requires the user row to exist — call ``upsert_user`` first.
    """
    await asyncio.to_thread(_set_language_sync, telegram_id, language)


async def set_segment(telegram_id: int, segment: str) -> None:
    """Store the Step 2 choice (``customer`` or ``vendor``).

    Requires the user row to exist — call ``upsert_user`` first.
    """
    await asyncio.to_thread(_set_segment_sync, telegram_id, segment)


async def set_last_intent(telegram_id: int, intent: str) -> None:
    """Record the latest detected intent, for debugging/analytics."""
    await asyncio.to_thread(_set_last_intent_sync, telegram_id, intent)


async def create_vendor_request(
    telegram_id: int,
    input_needed: str,
    location_text: str | None,
) -> int:
    """Log a vendor connection request (status ``pending``) and return its id."""
    return await asyncio.to_thread(
        _create_vendor_request_sync, telegram_id, input_needed, location_text
    )
