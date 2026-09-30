# AjaTrade 🌾

**Voice AI on WhatsApp — in Hausa, Yoruba, and Igbo — that turns any Nigerian farmer or trader into a bankable, market-ready business.**

> 🚧 **Status: Pre-launch.** AjaTrade isn't live yet — this repository contains the waitlist landing page collecting sign-ups ahead of launch.

---

## The Problem

Agriculture (30.1%) and trade (27.5%) are Nigeria's two largest employment sectors — yet most digital and AI tools assume typing literacy in English, locking out millions of farmers, traders, and small manufacturers who can speak fluently but can't type. Meanwhile, 95% of Nigerians online use WhatsApp daily, but it sits underused as a serious economic tool.

## The Solution

AjaTrade is a **voice-first AI assistant that lives inside WhatsApp**. Users send voice notes and photos in Hausa, Yoruba, or Igbo instead of typing in English. Powered by Meta's open-source **Llama 3** and **Llama Vision**, it can:

- 🌱 **Diagnose crop diseases** from a photo and reply with treatment guidance — by voice
- 📒 **Read handwritten sales ledgers** and turn them into loan-ready financial records
- 🔍 **Check product/manufacturing quality** against market standards before a customer complains
- 💰 **Recommend fair market pricing** and generate product descriptions

It replies with voice notes, translated text, and generated documents (like PDFs). No new app to download.

## Who It's For

| Persona | Role | Language | What they do with AjaTrade |
|---|---|---|---|
| **Musa, 42** | Maize farmer, Kaduna | Hausa | Voice-notes a photo of a diseased crop → diagnosis + treatment dose + nearest certified seed dealer, all by voice |
| **Tolu, 28** | Shoe trader, Alaba, Lagos | Yoruba | Sends ledger photos + voice summary → P&L built and a pre-filled loan application generated |
| **Chidi, 31** | Shoe manufacturer, Aba | Igbo | Photographs a finished product → defects flagged and optimal pricing recommended |

---

## This Repository

This repo hosts the **pre-launch waitlist landing page** — a single, dependency-free static page.

### Tech Stack

- Plain **HTML / CSS / vanilla JavaScript** — no frameworks, no build step
- Mobile-first responsive design
- Google Fonts (Inter) as the only external resource

### Files

```
├── index.html   # Page structure & content
├── styles.css   # Styling (Nigerian-market inspired palette)
└── script.js    # Form handling + WhatsApp "Coming Soon" modal
```

### Features

- Hero with animated WhatsApp chat mockup
- Stat callouts (30.1% agriculture · 27.5% trade · 95% WhatsApp usage)
- How-it-works flow and persona cards
- Waitlist form with client-side email validation and success state
- Floating WhatsApp button that opens a "Coming Soon" modal (accessible: Escape/outside-click dismissible, focus-trapped)
- Smooth-scroll CTAs pointing to the waitlist form

### Running Locally

No build step required — just open `index.html` in a browser, or serve the folder:

```bash
# any static server works, e.g.
npx serve .
# or
python -m http.server 8000
```

### Wiring Up the Waitlist

Form submissions currently persist to `localStorage` for demo purposes. To connect a real email service (Mailchimp, ConvertKit, an API endpoint, or a Google Form/Sheet), edit the handler in `script.js` and replace the storage block at the marked `// TODO: connect to email service` comment with your endpoint call.

---

*AjaTrade is currently in development. © 2026.*
