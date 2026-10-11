"""Telegram adapter: receives updates, calls /core/, sends replies.

Run from the repository root:

    py -m channels.telegram.bot
"""

from __future__ import annotations

import asyncio
import logging

from aiogram import Bot, Dispatcher

from channels.telegram import onboarding
from config import TELEGRAM_BOT_TOKEN
from core import db

logger = logging.getLogger(__name__)

# Wiring only: handlers live in feature modules (onboarding now, menu next).
dp = Dispatcher()
dp.include_router(onboarding.router)


async def main() -> None:
    """Create tables, then poll Telegram for updates until interrupted."""
    if not TELEGRAM_BOT_TOKEN:
        raise SystemExit(
            "TELEGRAM_BOT_TOKEN is not set - copy .env.example to .env and fill it in."
        )
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(name)s %(levelname)s %(message)s",
    )
    db.init_db()
    logger.info("AjaTrade Telegram bot starting (polling)")
    async with Bot(token=TELEGRAM_BOT_TOKEN) as bot:
        await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
