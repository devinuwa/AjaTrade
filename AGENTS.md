# AGENTS.md

You are an expert Python backend engineer and conversational AI developer
helping me build AjaTrade's Telegram bot.

Write clean, simple, maintainable code. Prioritize clarity over
unnecessary abstraction.
Think like a senior backend developer building for low-bandwidth,
voice-first users in Nigeria.

---

## Project Overview

AjaTrade is a voice-first AI assistant for Nigerian farmers and traders,
currently live on WhatsApp. This project is the **second channel: Telegram** —
same "brain," different front door.

The Telegram bot:
1. Asks the user's preferred language before anything else
2. Greets the user by their Telegram name and pitches AjaTrade's services
3. Splits users into two tracks — **customers** (farmers seeking help) and
   **future vendors** (traders/sellers who will migrate onto AjaTrade's
   marketplace later) — with a different menu for each

The bot calls into the **same existing logic** as WhatsApp. No diagnosis,
translation, or pricing logic gets written twice.

---

## Tech Stack

### Channel Layer
- Python 3.11+
- `aiogram 3.x` (async Telegram bot framework)
- Polling mode for local dev; webhook mode for deployment

### Core Brain (Shared with WhatsApp)
- Speech-to-text: Cohere Transcribe (general) + SBPN (Hausa/Yoruba/Igbo/Pidgin) + Simba-ASR (African fallback)
- Text-to-speech: YarnGPT2 (English, Yoruba, Igbo, Hausa) + SoroTTS (Pidgin)
- Translation: Hy-MT2-7B (general) + N-ATLAS (Nigerian languages)
- Crop disease diagnosis: CropScan (RF-DETR) + Qwen2.5-3B-Instruct (treatment generation)
- Intent routing / RAG / price lookup: Qwen3.5-9B or Gemma4 E4B + MiniCPM5-2B (lightweight classification)

### Inference
- vLLM for GPU serving
- llama.cpp (GGUF) for CPU/edge
- Groq (open-source models) as managed alternative
- Hugging Face / ModelScope for model hosting

### Data & Storage
- SQLite for MVP (reuse existing WhatsApp DB if available)
- PostgreSQL + pgvector for scale
- Redis for caching and session state

### Deployment
- Docker + docker-compose (MVP)
- Nginx/Caddy (reverse proxy, webhook termination)
- Prometheus + Grafana (monitoring)

Do not introduce new major libraries unless there is a strong reason.
Ask before installing anything new.

---

## Development Philosophy

Build feature by feature.
For every feature:
1. Read this file first.
2. Keep the implementation simple.
3. Avoid overengineering.
4. Prefer readable code over clever code.
5. Build the smallest useful version first.
6. Refactor only when repetition appears.

---

## Decision Making

If something is unclear or could be improved, suggest a better
approach. If a new library would significantly help, recommend it,
explain why, and ask before adding it.
Do not install new libraries without approval.

---

## Architecture

Keep the "brain" channel-agnostic. Telegram and WhatsApp should both call
the same shared modules — only the message-receiving/sending adapter differs.

```
/core/
  intent_router.py      # shared — Qwen3.5-9B / Gemma4 E4B / MiniCPM5-2B
  diagnosis.py          # shared — CropScan + Qwen2.5-3B
  price_lookup.py       # shared — from roadmap Phase 6
  translate.py          # shared — Hy-MT2 / N-ATLAS
  tts.py                # shared — YarnGPT2 / SoroTTS
  stt.py                # shared — Cohere Transcribe / SBPN / Simba-ASR
/channels/
  whatsapp/             # existing
  telegram/             # new — this spec
    bot.py              # Telegram adapter only: receives updates, calls /core/, sends replies
    onboarding.py       # language + segment selection, stored per telegram_id
```

If this folder structure doesn't match what already exists in the repo, adapt
the names — but preserve the principle: **no diagnosis/translation/pricing
logic gets written twice.**

**`/core/`** holds all model calls and business logic. Channel-agnostic.
Pure Python functions and async callables. No Telegram imports here.

**`/channels/telegram/`** is the adapter. Receives Telegram updates, calls
`/core/`, sends replies back. No model logic here.

---

## Data Model

A `users` table (SQLite is fine for MVP; reuse an existing DB if one already
exists for WhatsApp):

| field | notes |
|---|---|
| `telegram_id` | primary key |
| `name` | first_name or username, whichever is available |
| `language` | set in Step 1, editable later via a `/language` command |
| `segment` | `customer` or `vendor` |
| `created_at` | |
| `last_intent` | for debugging/analytics |

A `vendor_requests` table for the connection funnel:

| field | notes |
|---|---|
| `request_id` | primary key |
| `telegram_id` | foreign key to users |
| `input_needed` | herbicide / fertilizer / seeds / other |
| `location_text` | farmer's typed town/LGA or Telegram location |
| `status` | pending / referred / fulfilled |
| `created_at` | |

Telegram users are **separate profiles from WhatsApp users** for now — no
cross-channel identity matching yet.

---

## Conversation Rules

For any Telegram conversation task:
- Use **inline keyboards** (buttons), not numbered text. Telegram supports
  this natively and it is more reliable than parsing free-typed numbers.
- Use the user's Telegram `first_name` (fall back to `username`) in greetings.
- Keep messages short. Voice-first users may have low literacy.
- Use emoji sparingly — one per button label, not in body text.
- Always provide a "menu" command to return to the main menu.

### Onboarding Flow

#### Step 1 — Language selection (always first, before any greeting)

On `/start`, before anything else, show an inline keyboard:

> Please select your preferred language / Da fatan zaɓi yaren ku:
> 🇳🇬 Hausa · Yoruba · Igbo · Pidgin · English

Store the selection against the user's Telegram ID. All following messages in
this session (and future sessions) use this language.

#### Step 2 — Segment selection

> Are you looking for help as a farmer/buyer, or are you here as a seller/vendor?
> [👨‍🌾 I need help] [🏪 I'm a seller]

Store this as the user's `segment`. This determines which menu they see in Step 3
and on every future `/start` or "menu" command.

#### Step 3 — Personalized greeting + service pitch

Use the user's Telegram `first_name` (fall back to `username` if no first name is
set). This is the "sell itself" moment — don't skip it.

**Customer segment example:**

> Hello {name}, I am AjaTrade. How can I help you today?
> 1️⃣ Diagnose a crop problem (send a photo or voice note)
> 2️⃣ Check today's market price
> 3️⃣ Connect me to a herbicide/fertilizer vendor
> 4️⃣ Talk to a real person

**Vendor-track segment example:**

> Hello {name}, I am AjaTrade. Here's how I can help you grow your business:
> 1️⃣ Register as a vendor (early access waitlist)
> 2️⃣ List your products or prices
> 3️⃣ Get connected to buyers
> 4️⃣ Learn more about AjaTrade for sellers

Use an inline keyboard (buttons), not just numbered text.

#### Step 4 — Route into existing logic

- Customer → photo/voice → existing diagnosis pipeline (Cohere Transcribe /
  SBPN / Simba-ASR → Hy-MT2 / N-ATLAS translate → CropScan + Qwen2.5-3B → RAG →
  translate back → YarnGPT2 / SoroTTS)
- Customer → price intent → existing price lookup table
- Customer → vendor connection → capture location + input needed, log to
  `vendor_requests`, reply with referral confirmation (manual referral for MVP)
- Vendor track → for now, this is a **data-collection funnel, not a live
  marketplace**

---

## Model Stack

### 1. Speech-to-Text

| Model | Role | License |
|---|---|---|
| Cohere Transcribe | General ASR (English, French, Arabic, etc.) | Apache 2.0 |
| SBPN | Nigerian languages (Hausa, Yoruba, Igbo, Pidgin) | Open |
| Simba-ASR | African languages (43 total) | Open |

Cohere Transcribe for English/Pidgin; SBPN for pure Hausa/Yoruba/Igbo;
Simba-ASR as broad African fallback.

### 2. Text-to-Speech

| Model | Languages | License |
|---|---|---|
| YarnGPT2 | English (Nigerian accent), Yoruba, Igbo, Hausa | Apache 2.0 |
| SoroTTS | Yoruba, Hausa, Igbo, **Nigerian Pidgin** | Apache 2.0 |

Routing logic:

```python
def synthesize(text: str, language: str, voice: str | None = None) -> bytes:
    if language == "pcm":  # Nigerian Pidgin
        return sorotts_speak(text, voice=voice or "NaijaA")
    return yarngpt2_speak(text, language=language, voice=voice)
```

SoroTTS explicitly covers Pidgin (NaijaA voice is cleanest). YarnGPT2 does not
cover Pidgin — use SoroTTS for all Pidgin TTS.

### 3. Translation

| Model | Role | License |
|---|---|---|
| Hy-MT2-7B | General translation (33 languages) | Apache 2.0 |
| N-ATLAS | Nigerian languages (Yoruba, Hausa, Igbo, Nigerian English) | Open |

Hy-MT2-7B for general translation; N-ATLAS for Nigerian language pairs.

### 4. Crop Disease Diagnosis / Vision

| Model | Role | License |
|---|---|---|
| CropScan | Plant disease detection (RF-DETR) | MIT |
| Qwen2.5-3B-Instruct | Treatment recommendation generation | Apache 2.0 |

CropScan as primary detector; Qwen2.5-3B for treatment generation.

### 5. Intent Routing / RAG / Price Lookup

| Model | Role | License |
|---|---|---|
| Qwen3.5-9B | Primary intent routing + RAG | Apache 2.0 |
| Gemma4 E4B | Alternative routing model | Open |
| MiniCPM5-2B | Lightweight on-device classification | Apache 2.0 |
| Phi-3.5 Mini | Lightweight fallback | MIT |

Qwen3.5-9B for primary routing; MiniCPM5-2B for lightweight classification;
Groq (open-source models) for LPU speed.

---

## Vendor Connection Strategy

MVP (Phase 1 — Data Collection Funnel):

When a customer selects "Connect me to a herbicide/fertilizer vendor":

1. Ask for location (Telegram `location` message or typed town/LGA)
2. Ask what input they need (herbicide, fertilizer, seeds, other)
3. Log to `vendor_requests` table
4. Reply: "We've noted your request. A verified supplier in your area will
   contact you within 24 hours."
5. Manual referral by AjaTrade team

Phase 2 (later — do not build yet): map-based browsing of verified vendors.

Phase 3 (deferred — do not build yet): live vendor-to-buyer matching.

---

## Python Rules

- Use type hints everywhere. No `Any` unless absolutely necessary.
- Keep functions small and focused.
- Use `async`/`await` consistently in the Telegram adapter layer.
- Handle Telegram audio format differences explicitly: Telegram voice notes are
  `.ogg` (Opus). Cohere Transcribe accepts standard formats via vLLM;
  Whisper-based models (Simba-W) handle `.ogg` natively.
- For photos: grab the highest-resolution `file_id` (last item in the `photo`
  array).
- Use environment variables for all secrets. Never hardcode tokens.
- Fix lint and type errors before finishing.

---

## Feature Implementation

When building a feature:
1. Read this file first.
2. Identify the files to change.
3. Keep changes focused.
4. Do not rewrite unrelated code.
5. Follow existing patterns.
6. Make sure the feature works end to end.
7. Fix lint and type errors before finishing.

---

## Secrets

- Never expose secret keys in source code.
- Use environment variables for all tokens.
- Use server-side calls for all model access.

---

## Authentication

- Telegram-native auth only for MVP (Telegram ID is the identity).
- No custom auth.

---

## Environment Variables

```
# Telegram
TELEGRAM_BOT_TOKEN=

# Model serving (open-source — self-hosted)
COHERE_TRANSCRIBE_URL=http://localhost:8001
SBPN_URL=http://localhost:8002
SIMBA_ASR_URL=http://localhost:8003
YARNGPT2_MODEL_PATH=saheedniyi/YarnGPT2
SOROTTS_ADAPTER_PATH=Shinzmann/sorotts
HYMT2_URL=http://localhost:8004
NATLAS_URL=http://localhost:8005
CROPSCAN_MODEL_PATH=./models/cropscan.pth
QWEN_25_3B_URL=http://localhost:8006
QWEN_35_9B_URL=http://localhost:8007
MINICPM5_2B_URL=http://localhost:8008

# Or use Groq for open-source models
GROQ_API_KEY=
GROQ_MODEL_INTENT=llama-3.3-70b-versatile
GROQ_MODEL_VISION=qwen/qwen3-32b
```

---

## Milestones

- [ ] `/start` shows language selection, choice is saved
- [ ] Segment question shows correct follow-up, choice is saved
- [ ] Bot greets user by name with the correct menu for their segment
- [ ] Customer path: voice note → diagnosis → voice reply, full loop works
      (YarnGPT2 / SoroTTS TTS + Cohere Transcribe / SBPN ASR)
- [ ] Customer path: price intent returns a real answer
- [ ] Customer path: vendor connection request is captured and logged
- [ ] Vendor path: registration/waitlist info is captured
- [ ] Test end-to-end with 2–3 real Telegram accounts across both segments

---

## Explicitly Deferred (Do Not Build Yet)

- Live vendor-to-buyer matching (AjaTrade Maps marketplace)
- Linking a Telegram profile to the same person's WhatsApp profile
- Payment collection of any kind
- Any map interface

---

## Communication

Be concise. Explain what changed and how to test it.

---

## Final Reminder

Before every feature:
- Read this file.
- Follow it strictly.
- Build clean, simple code.
- Keep the brain channel-agnostic.
