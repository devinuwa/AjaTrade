import { Mail, MessageCircle, Play, Video } from "lucide-react";

import logo from "../assets/logo.png";
import Button from "../components/Button.jsx";
import Section from "../components/Section.jsx";
import { footerCopy } from "../data/sections.js";
import { navLinks } from "../data/navbar.js";
import { SITE } from "../data/site.js";

/** YouTube brand icon rendered cleanly with inline SVG matching Lucide stroke style */
function YouTubeIcon({ className = "size-4" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  return (
    <Section as="footer" tone="dark" className="py-12 sm:py-16">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand Column */}
        <div className="flex flex-col items-start">
          <a href="/#hero" aria-label={footerCopy.homeLabel}>
            <img
              src={logo}
              alt="AjaTrade"
              width="120"
              height="40"
              loading="lazy"
              className="h-10 w-auto brightness-0 invert"
            />
          </a>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-cream/80">
            {footerCopy.tagline}
          </p>
          <p className="mt-4 text-xs font-semibold text-cream/70">
            Powered by N-ATLAS (NCAIR / Awarri)
          </p>
          <div className="mt-6">
            <Button
              href={SITE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              icon={MessageCircle}
              size="sm"
            >
              Chat on WhatsApp
            </Button>
          </div>
        </div>

        {/* Quick Links Column */}
        <nav aria-label="Footer quick links">
          <h2 className="text-sm font-bold tracking-wide text-cream uppercase">
            Quick links
          </h2>
          <ul className="mt-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-cream/75 transition-colors hover:text-brand-yellow"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact Column */}
        <div>
          <h2 className="text-sm font-bold tracking-wide text-cream uppercase">
            Contact
          </h2>
          <ul className="mt-4 flex flex-col gap-3.5 text-sm text-cream/80">
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center gap-2.5 transition-colors hover:text-brand-yellow"
              >
                <Mail className="size-4 shrink-0 text-brand-yellow" />
                <span>{SITE.email}</span>
              </a>
            </li>
            <li>
              <a
                href={SITE.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 transition-colors hover:text-brand-yellow"
              >
                <MessageCircle className="size-4 shrink-0 text-[#25D366]" />
                <span>{SITE.whatsappNumberDisplay}</span>
              </a>
            </li>
            <li>
              <a
                href={SITE.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 transition-colors hover:text-brand-yellow"
              >
                <YouTubeIcon className="size-4 shrink-0 text-brand-yellow" />
                <span>@{SITE.youtubeHandle}</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Follow Along Column */}
        <nav aria-label={footerCopy.socialLabel}>
          <h2 className="text-sm font-bold tracking-wide text-cream uppercase">
            Follow along
          </h2>
          <p className="mt-4 text-xs text-cream/70">
            Watch real demonstrations and see how farmers across Nigeria use AjaTrade.
          </p>
          <ul className="mt-4 flex flex-wrap gap-3">
            <li>
              <a
                href={SITE.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`YouTube @${SITE.youtubeHandle}`}
                className="flex size-10 items-center justify-center rounded-full border border-cream/25 text-cream/80 transition-colors hover:border-brand-yellow hover:text-brand-yellow"
              >
                <YouTubeIcon className="size-4.5" />
              </a>
            </li>
            <li>
              <a
                href={SITE.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex size-10 items-center justify-center rounded-full border border-cream/25 text-cream/80 transition-colors hover:border-brand-yellow hover:text-brand-yellow"
              >
                <MessageCircle aria-hidden="true" className="size-4.5" />
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 flex flex-col gap-4 border-t border-cream/15 pt-6 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between">
        <p>{footerCopy.note}</p>
        <div className="flex flex-wrap items-center gap-6">
          <a href="/terms" className="transition-colors hover:text-brand-yellow">
            Terms of Use
          </a>
          <a href="/privacy" className="transition-colors hover:text-brand-yellow">
            Privacy Policy
          </a>
          <span>Multilingual voice AI for better businesses.</span>
        </div>
      </div>
    </Section>
  );
}
