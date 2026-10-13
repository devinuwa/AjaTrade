# AjaTrade

**Voice-first AI on WhatsApp for Nigerian farmers, traders and small manufacturers.**

AjaTrade helps people ask for practical business and farming support by voice,
photo or text in Yoruba, Hausa, Igbo, Pidgin or English. It responds with a
voice note and a clear text summary. The public service is live on WhatsApp.

## Features

- Crop problem checks from a photo, voice note or description
- Soil health guidance from a soil-test photo or typed values
- Watering plans, water-loss checks and well or pond siting
- Fertilizer plans with timing, bag quantities and estimated cost
- Weed control guidance, including Striga
- Seed choice and germination checks
- WhatsApp-first, multilingual voice conversations
- Responsive, accessible landing page with bot screen demos, tutorial,
  personas, SDG mapping and WhatsApp chat CTAs

## N-ATLAS integration

AjaTrade is designed around **N-ATLAS**, Nigeria's open multilingual model from
NCAIR and Awarri. The site presents N-ATLAS as the language and reasoning layer
in a channel-agnostic architecture.

## Tech stack

- Vite
- React
- react-router-dom
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
│   ├── lib/              # shared client utilities
│   └── sections/         # page sections rendered by App.jsx
├── .env.example
├── .github/copilot-instructions.md
├── package.json
├── vercel.json
└── vite.config.js
```

## Site configuration

Public contact details and links live in
[`src/data/site.js`](src/data/site.js), the single source of truth used by
the landing page. No client environment variables are required for the site
CTAs.

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
4. Deploy. Vercel uses the included `vercel.json` rewrite so direct SPA
   requests safely resolve to `index.html`.
5. Test the WhatsApp CTA, mobile layout and keyboard navigation
   on the deployed URL.

## Roadmap

- [x] Build the live marketing site
- [x] Add multilingual WhatsApp product demonstrations
- [x] Add accessible WhatsApp chat CTAs
- [ ] Complete the Telegram channel adapter
- [ ] Connect shared speech-to-text, translation, diagnosis and text-to-speech
  services
- [ ] Pilot with farmers and traders across selected communities
- [x] Launch the public WhatsApp service
- [ ] Expand vendor connections and marketplace workflows

## Content and accessibility rules

- Keep approved copy and lists in `src/data/`.
- Mark unverified values, testimonials and answers as placeholders.
- Preserve semantic HTML, visible focus states, keyboard interaction,
  responsive layouts and reduced-motion support.

---

*AjaTrade is live on WhatsApp. © 2026.*
