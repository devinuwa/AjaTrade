import { SITE } from "./site.js";

/**
 * Navbar copy and link lists.
 *
 * Section ids here must match the `id` on the sections rendered in App.jsx —
 * the anchors rely on CSS smooth scrolling and `scroll-mt-*` on each section.
 */

export const navLinks = [
  { label: "What it does", href: "/#features" },
  { label: "Bot screens", href: "/#demo" },
  { label: "Tutorial", href: "/#tutorial" },
  { label: "Impact", href: "/#impact" },
  { label: "SDGs", href: "/#sdgs" },
];

export const navCta = { label: "Chat on WhatsApp", href: SITE.whatsappUrl };

export const navbarCopy = {
  brand: "AjaTrade",
  homeLabel: "AjaTrade — home",
  logoAlt: "AjaTrade",
  navLabel: "Main navigation",
  menuLabel: "Menu",
  openMenuLabel: "Open navigation menu",
  closeMenuLabel: "Close navigation menu",
};
