import { AtSign, BriefcaseBusiness, Camera } from "lucide-react";

import logo from "../assets/logo.png";
import Section from "../components/Section.jsx";
import { footerCopy } from "../data/sections.js";
import { navLinks } from "../data/navbar.js";

const socialIcons = {
  "Twitter / X": AtSign,
  Instagram: Camera,
  LinkedIn: BriefcaseBusiness,
};

export default function Footer() {
  return (
    <Section as="footer" tone="dark" className="py-12 sm:py-16">
      <div className="grid gap-10 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
        <div>
          <a href="#hero" aria-label={footerCopy.homeLabel}>
            <img src={logo} alt="AjaTrade" width="120" height="40" loading="lazy" className="h-10 w-auto brightness-0 invert" />
          </a>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/80">{footerCopy.tagline}</p>
          <p className="mt-5 text-sm font-semibold text-cream/70">Powered by N-ATLAS (NCAIR / Awarri)</p>
        </div>

        <nav aria-label="Footer quick links">
          <h2 className="text-sm font-bold tracking-wide text-cream uppercase">Quick links</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-cream/75 transition-colors hover:text-brand-yellow">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={footerCopy.socialLabel}>
          <h2 className="text-sm font-bold tracking-wide text-cream uppercase">Follow along</h2>
          <ul className="mt-4 flex gap-3">
            {footerCopy.socials.map((social) => {
              const Icon = socialIcons[social.label];
              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="flex size-11 items-center justify-center rounded-full border border-cream/25 text-cream/80 transition-colors hover:border-brand-yellow hover:text-brand-yellow"
                  >
                    <Icon aria-hidden="true" className="size-5" />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div className="mt-12 flex flex-col gap-2 border-t border-cream/15 pt-5 text-sm text-cream/60 sm:flex-row sm:justify-between">
        <p>{footerCopy.note}</p>
        <p>Multilingual voice AI for better businesses.</p>
      </div>
    </Section>
  );
}
