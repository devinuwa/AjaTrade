/**
 * Hero copy — approved wording from the Phase 1 brief.
 *
 * The mockup chat is a sample conversation (carried over from the previous
 * site) used to show what a voice-first exchange looks like.
 */

import { SITE } from "./site.js";

export const heroCopy = {
  badge: "🟢 Live on WhatsApp now",
  title: "Farm smarter in your own language.",
  subtext:
    "Speak or type in Yoruba, Hausa, Igbo, Pidgin or English on WhatsApp. AjaTrade answers with a voice note in your language.",
  primaryCta: { label: "Chat on WhatsApp", href: SITE.whatsappUrl },
  secondaryCta: { label: "See how it works", href: "#features" },
  note: "Free to use. No app to download. Powered by N-ATLAS, Nigeria's open multilingual model.",
  languagesLabel: "Languages AjaTrade speaks",
  languages: [
    { label: "Yorùbá", lang: "yo" },
    { label: "Hausa", lang: "ha" },
    { label: "Igbo", lang: "ig" },
    { label: "Pidgin", lang: "pcm" },
    { label: "English", lang: "en" },
  ],
  chips: [
    { label: "Crop doctor", icon: "sprout" },
    { label: "Soil health", icon: "leaf" },
    { label: "Fertilizer plan", icon: "flask-conical" },
    { label: "Find water", icon: "droplets" },
  ],
  mockup: {
    alt: "Phone showing the AjaTrade WhatsApp chat: a farmer sends a voice note and AjaTrade replies with a voice note and a short written treatment plan.",
    header: { line: "AjaTrade · online" },
    userVoice: { duration: "0:12" },
    botVoice: { duration: "0:09" },
    botCard: {
      title: "Treatment plan",
      body: "Cutar fatar gumba. Amfani da maganin fungicide kowace mako 2. Mai sayar da iri mafi kusa: Zaria Road.",
    },
  },
};
