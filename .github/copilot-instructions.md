# Copilot Instructions — AjaTrade

## Project

**AjaTrade** is a multilingual, voice-first AI assistant on WhatsApp for Nigerian
farmers, traders and small manufacturers. It speaks **Yoruba, Hausa, Igbo,
Pidgin and English**, and replies as **voice notes**.

Powered by **N-ATLAS** (NCAIR / Awarri), Nigeria's open multilingual model.

**Status: live on WhatsApp.**

## Stack

- Vite
- React
- Tailwind CSS v4
- lucide-react

No other UI libraries. Do not add a dependency without asking first.

## Structure

- Components in `src/components`
- Page sections in `src/sections`
- Copy and lists in `src/data/*.js` — **never hardcode content inside JSX**
- Hooks in `src/hooks`

## Accessibility & responsiveness

- Mobile-first, responsive
- Semantic HTML
- WCAG AA contrast
- Visible focus states
- Alt text on images
- Respect `prefers-reduced-motion`

## Content

- **Never invent statistics or testimonials.** Use clearly marked placeholders
  (e.g. `[PLACEHOLDER: …]`) instead.

## Style

Warm, trustworthy, Nigerian — not generic SaaS.

- 24px rounded corners
- Soft shadows
- Generous whitespace
- Pill buttons
