"""Environment-backed configuration.

Every secret and service endpoint comes from the environment. A local
``.env`` file is loaded when present (see ``.env.example``). This module
imports nothing from Telegram or the model stack, so every channel can
share it.
"""

from __future__ import annotations

import os
from pathlib import Path

from dotenv import load_dotenv

# Load the repository-root .env if it exists; real environment variables win.
load_dotenv(Path(__file__).with_name(".env"))

# Telegram
TELEGRAM_BOT_TOKEN: str = os.getenv("TELEGRAM_BOT_TOKEN", "")

# Model serving (open-source — self-hosted)
COHERE_TRANSCRIBE_URL: str = os.getenv("COHERE_TRANSCRIBE_URL", "http://localhost:8001")
SBPN_URL: str = os.getenv("SBPN_URL", "http://localhost:8002")
SIMBA_ASR_URL: str = os.getenv("SIMBA_ASR_URL", "http://localhost:8003")
YARNGPT2_MODEL_PATH: str = os.getenv("YARNGPT2_MODEL_PATH", "saheedniyi/YarnGPT2")
SOROTTS_ADAPTER_PATH: str = os.getenv("SOROTTS_ADAPTER_PATH", "Shinzmann/sorotts")
HYMT2_URL: str = os.getenv("HYMT2_URL", "http://localhost:8004")
NATLAS_URL: str = os.getenv("NATLAS_URL", "http://localhost:8005")
CROPSCAN_MODEL_PATH: str = os.getenv("CROPSCAN_MODEL_PATH", "./models/cropscan.pth")
QWEN_25_3B_URL: str = os.getenv("QWEN_25_3B_URL", "http://localhost:8006")
QWEN_35_9B_URL: str = os.getenv("QWEN_35_9B_URL", "http://localhost:8007")
MINICPM5_2B_URL: str = os.getenv("MINICPM5_2B_URL", "http://localhost:8008")

# Or use Groq for open-source models
GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "")
GROQ_MODEL_INTENT: str = os.getenv("GROQ_MODEL_INTENT", "llama-3.3-70b-versatile")
GROQ_MODEL_VISION: str = os.getenv("GROQ_MODEL_VISION", "qwen/qwen3-32b")

# Local storage (SQLite MVP) — override only if you need a custom path.
DB_PATH: Path = Path(os.getenv("DB_PATH", "ajatrade.db"))
