import { MessageCircle, Mic, Phone, Play, Video } from "lucide-react";

import logoMark from "../assets/logo-mark.png";
import Button from "../components/Button.jsx";
import Icon from "../components/Icon.jsx";
import Reveal from "../components/Reveal.jsx";
import Section from "../components/Section.jsx";
import Waveform from "../components/Waveform.jsx";
import { heroCopy } from "../data/hero.js";
import { SITE } from "../data/site.js";

const copy = heroCopy;

/**
 * Chip anchors positioned on outer edges of phone frame.
 * Overlaps bezel by <= 30%, never covers chat text, voice notes or header.
 * Hidden on mobile/tablet (below 1024px, lg).
 */
const CHIP_POSITIONS = [
  // Top-left: sits outside the left bezel near top, clear of the header
  "top-12 -left-24 xl:-left-28",
  // Top-right: sits outside the right bezel, clear of the user voice note
  "top-28 -right-24 xl:-right-28",
  // Bottom-left: sits outside the left bezel, clear of the bot card
  "bottom-28 -left-24 xl:-left-28",
  // Bottom-right: sits outside the right bezel near bottom
  "bottom-10 -right-20 xl:-right-24",
];

export default function Hero() {
  return (
    <Section
      id="hero"
      tone="white"
      className="relative isolate overflow-hidden pt-24 sm:pt-28 lg:pt-32 scroll-mt-28"
    >
      {/* Soft green gradient blob */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 -right-32 size-[34rem] rounded-full bg-brand-green/20 blur-3xl" />
        <div className="absolute -bottom-56 -left-40 size-[30rem] rounded-full bg-brand-yellow/10 blur-3xl" />
      </div>

      <div className="relative grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        {/* Left: copy */}
        <Reveal className="flex flex-col items-start gap-6">
          <span className="rounded-pill bg-brand-yellow/20 px-4 py-1.5 font-heading text-sm font-semibold text-brand-dark">
            {copy.badge}
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl">{copy.title}</h1>

          <p className="max-w-xl text-lg leading-relaxed text-ink/80 sm:text-xl">{copy.subtext}</p>

          <div className="flex flex-wrap items-center gap-4">
            <Button href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" icon={MessageCircle} size="lg">
              {copy.primaryCta.label}
            </Button>
            <Button href={copy.secondaryCta.href} variant="outline" size="lg">
              {copy.secondaryCta.label}
            </Button>
          </div>

          <p className="text-base text-ink/70">{copy.note}</p>

          <ul aria-label={copy.languagesLabel} className="flex list-none flex-wrap gap-2">
            {copy.languages.map((language) => (
              <li
                key={language.lang}
                lang={language.lang}
                className="rounded-pill border border-brand-green/15 bg-mint px-4 py-1.5 font-heading text-sm font-semibold text-brand-dark"
              >
                {language.label}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Right: phone mockup */}
        <Reveal delay={150} className="relative">
          <div
            role="img"
            aria-label={copy.mockup.alt}
            className="relative mx-auto w-full max-w-[19rem] sm:max-w-[21rem]"
          >
            <div aria-hidden="true" className="relative">
              {/* Frame */}
              <div className="relative rounded-[2.75rem] border-[10px] border-brand-dark bg-brand-dark shadow-soft-lg">
                {/* Notch */}
                <div className="absolute top-1.5 left-1/2 z-20 h-5 w-24 -translate-x-1/2 rounded-pill bg-brand-dark" />

                {/* Screen */}
                <div className="overflow-hidden rounded-[2.1rem] bg-cream">
                  {/* Chat header */}
                  <div className="flex items-center gap-3 bg-brand-green px-4 pt-8 pb-3 text-cream">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-pill bg-cream">
                      <img src={logoMark} alt="" className="size-7" />
                    </span>
                    <span className="min-w-0 truncate font-heading font-semibold">{copy.mockup.header.line}</span>
                    <span className="ml-auto flex shrink-0 items-center gap-3 text-cream/90">
                      <Video className="size-5" />
                      <Phone className="size-4" />
                    </span>
                  </div>

                  {/* Messages */}
                  <div className="flex flex-col gap-3 p-3 pb-5">
                    <div className="ml-auto flex max-w-[85%] items-center gap-2.5 rounded-card rounded-br-md bg-mint px-3 py-2.5 text-brand-green shadow-soft">
                      <Waveform activeFrom={11} />
                      <Mic className="size-4 shrink-0" />
                      <span className="text-sm font-medium text-ink/70">{copy.mockup.userVoice.duration}</span>
                    </div>

                    <div className="mr-auto flex max-w-[92%] flex-col gap-2 rounded-card rounded-bl-md bg-white p-3 shadow-soft">
                      <span className="flex items-center gap-2.5 text-brand-green">
                        <Play className="size-4 shrink-0" />
                        <Waveform activeFrom={7} />
                        <span className="text-sm font-medium text-ink/70">{copy.mockup.botVoice.duration}</span>
                      </span>

                      <span className="block rounded-card bg-mint/70 p-3">
                        <span className="block font-heading text-sm font-semibold text-brand-dark">
                          {copy.mockup.botCard.title}
                        </span>
                        <span className="mt-1 block text-sm leading-snug text-ink/80">
                          {copy.mockup.botCard.body}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating chips: hidden below lg (1024px), positioned strictly on outer edges */}
              {copy.chips.map((chip, index) => (
                <span
                  key={chip.label}
                  style={{ animationDelay: `${index * 0.9}s` }}
                  className={`animate-float absolute hidden items-center gap-2 rounded-pill border border-brand-green/10 bg-white/95 px-3.5 py-2 font-heading text-sm font-semibold text-brand-dark shadow-soft backdrop-blur lg:inline-flex ${
                    CHIP_POSITIONS[index] ?? ""
                  }`}
                >
                  <Icon name={chip.icon} className="size-4 text-brand-green" />
                  {chip.label}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
