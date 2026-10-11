/**
 * All page copy lives here — components and sections must not hardcode
 * strings in JSX.
 *
 * Anything we do not have approved wording for yet is a clearly marked
 * placeholder. Never invent statistics, testimonials or partner names.
 *
 * Navbar copy lives in src/data/navbar.js and hero copy in src/data/hero.js.
 */

export const brand = {
  name: "AjaTrade",
  tagline:
    "[PLACEHOLDER: one-line tagline — voice-first AI on WhatsApp for Nigerian farmers, traders and manufacturers]",
  footerNote: "AjaTrade is currently in development. © 2026.",
};

export const accessibilityCopy = {
  skipToContent: "Skip to main content",
};

export const footerCopy = {
  brand: brand.name,
  homeLabel: "AjaTrade home",
  tagline: "Multilingual voice AI on WhatsApp, helping Nigerian farmers, traders and small manufacturers run better businesses.",
  socialLabel: "Social links",
  socials: [
    { label: "Twitter / X", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
  note: brand.footerNote,
};

/**
 * Section copy, keyed by section id. Each section component reads the
 * entry it owns instead of inlining text.
 */
export const sectionCopy = {
  features: {
    title: "One assistant for the whole farm.",
    subtext: "Ask by voice, photo or text. Get answers as a voice note.",
  },
  problem: {
    title: "The tools exist. The people don't fit.",
    subtext: "Millions can speak fluently but are locked out of AI.",
  },
  demo: {
    title: "See AjaTrade in action",
    subtext: "Voice notes, photos and plain text, in the language you speak.",
  },
  tutorial: {
    title: "Get started in 4 simple steps. No typing needed.",
    subtext: "",
  },
  howItWorks: {
    title: "Built on Nigeria's own AI.",
    subtext: "",
  },
  impact: {
    title: "Traction & momentum",
    subtext: "",
  },
  democratize: {
    title: "AI should speak the language of the people who feed the nation.",
    subtext: "",
  },
  sdgs: {
    title: "Built for the Global Goals",
    subtext: "AjaTrade directly advances these UN Sustainable Development Goals.",
  },
  personas: {
    title: "Real people, real farms, real languages.",
    subtext: "",
  },
  waitlist: {
    title: "Be the first to try AjaTrade",
    subtext: "AjaTrade isn't live yet. Leave your email and we'll notify you the moment it's ready.",
  },
};
