# AjaTrade

**Voice-first AI on WhatsApp for Nigerian farmers, traders and small manufacturers.**

AjaTrade helps people ask for practical business and farming support by voice,
photo or text in Yoruba, Hausa, Igbo, Pidgin or English. It responds with a
voice note and a clear text summary. The project is currently pre-launch and
this repository contains the public marketing site and the early-access
waitlist.

## Features

- Crop problem checks from a photo, voice note or description
- Soil health guidance from a soil-test photo or typed values
- Watering plans, water-loss checks and well or pond siting
- Fertilizer plans with timing, bag quantities and estimated cost
- Weed control guidance, including Striga
- Seed choice and germination checks
- WhatsApp-first, multilingual voice conversations
- Responsive, accessible landing page with bot screen demos, tutorial,
  personas, SDG mapping and waitlist form

## N-ATLAS integration

AjaTrade is designed around **N-ATLAS**, Nigeria's open multilingual model from
NCAIR and Awarri. The site presents N-ATLAS as the language and reasoning layer
in a channel-agnostic architecture. Production model serving and the final
waitlist backend are not connected in this pre-launch site.

## Tech stack

- Vite
- React
- Tailwind CSS v4
- lucide-react
- JavaScript and JSX

No additional UI libraries are required.

## Project structure

```text
├── index.html
├── public/
├── src/
│   ├── App.jsx
│   ├── index.css
│   ├── assets/
│   ├── components/       # reusable UI, mockups and accessibility primitives
│   ├── data/             # page copy and content lists
│   ├── hooks/            # shared React hooks
│   ├── lib/              # integrations such as waitlist submission
│   └── sections/         # page sections rendered by App.jsx
├── .env.example
├── .github/copilot-instructions.md
├── package.json
├── vercel.json
└── vite.config.js
```

## Environment variables

Copy `.env.example` to `.env` for local development:

```bash
VITE_WAITLIST_ENDPOINT=
VITE_WHATSAPP_URL=https://wa.me/2349067736753
```

- `VITE_WAITLIST_ENDPOINT` is optional. When set, the site posts waitlist
  details as JSON. When empty, the form simulates a successful submission and
  logs a development warning.
- `VITE_WHATSAPP_URL` controls the WhatsApp buttons. It defaults to the
  AjaTrade number if omitted.

Do not commit secrets or real credentials. Vite variables are exposed to the
browser, so only use public client configuration with the `VITE_` prefix.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Build and preview

```bash
npm run build
npm run preview
```

The production output is written to `dist/`.

## Deploy to Vercel

1. Push the repository to GitHub.
2. Import the repository into Vercel.
3. Keep the detected framework as **Vite**.
4. Add `VITE_WAITLIST_ENDPOINT` and `VITE_WHATSAPP_URL` in the Vercel project
   Environment Variables settings.
5. Deploy. Vercel uses the included `vercel.json` rewrite so direct SPA
   requests safely resolve to `index.html`.
6. Test the waitlist form, WhatsApp CTA, mobile layout and keyboard navigation
   on the deployed URL.

## Roadmap

- [x] Build the pre-launch marketing site
- [x] Add multilingual WhatsApp product demonstrations
- [x] Add accessible waitlist capture flow
- [ ] Connect the waitlist to a production endpoint
- [ ] Complete the Telegram channel adapter
- [ ] Connect shared speech-to-text, translation, diagnosis and text-to-speech
  services
- [ ] Pilot with farmers and traders across selected communities
- [ ] Launch the public WhatsApp service
- [ ] Expand vendor connections and marketplace workflows

## Content and accessibility rules

- Keep approved copy and lists in `src/data/`.
- Mark unverified values, testimonials and answers as placeholders.
- Preserve semantic HTML, visible focus states, keyboard interaction,
  responsive layouts and reduced-motion support.

---

*AjaTrade is currently in development. © 2026.*
