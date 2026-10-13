import { useState } from "react";
import Card from "../components/Card.jsx";
import Icon from "../components/Icon.jsx";
import Reveal from "../components/Reveal.jsx";
import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { democratizeCopy, principles } from "../data/democratize.js";
import { SITE } from "../data/site.js";
import farmerFieldImg from "../assets/farmer-field.jpg";
import logoMark from "../assets/logo-mark.png";

export default function Democratize() {
  const [imageError, setImageError] = useState(false);

  return (
    <Section
      id="democratize"
      tone="green"
      className="bg-gradient-to-br from-brand-green via-brand-dark to-[#032819] text-cream"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <SectionHeading
            title={democratizeCopy.title}
            subtext={democratizeCopy.manifesto}
            align="left"
            className="[&_h2]:text-cream [&_p]:text-cream/80"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {principles.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 70}>
                <Card as="article" className="h-full border-cream/10 bg-white/10 text-cream backdrop-blur">
                  <span className="mb-4 flex size-11 items-center justify-center rounded-full bg-brand-yellow text-brand-dark">
                    <Icon name={principle.icon} className="size-5" />
                  </span>
                  <h3 className="text-xl text-cream">{principle.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-cream/75">{principle.description}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          {/* Main photo card with fallback */}
          <div className="relative overflow-hidden rounded-3xl aspect-[4/5] w-full shadow-soft-lg border border-cream/15 bg-brand-dark">
            {!imageError && farmerFieldImg ? (
              <>
                <img
                  src={farmerFieldImg}
                  alt="A farmer speaking a voice note to AjaTrade on WhatsApp in a field"
                  loading="lazy"
                  width="400"
                  height="500"
                  onError={() => setImageError(true)}
                  className="h-full w-full object-cover rounded-3xl"
                />
                {/* Subtle dark green gradient overlay with caption */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/50 to-transparent pt-16 pb-5 px-6 rounded-b-3xl flex items-end">
                  <p className="text-xs sm:text-sm font-medium text-white/95 tracking-wide drop-shadow-sm">
                    {SITE.fieldTestPhotoCaption || "Field test, Minna, Niger State"}
                  </p>
                </div>
              </>
            ) : (
              /* Fallback panel: dark green panel with AjaTrade logo and large microphone icon */
              <div
                role="img"
                aria-label="AjaTrade field testing in Niger State"
                className="flex h-full w-full flex-col items-center justify-center gap-6 p-8 text-center"
              >
                <div className="flex size-16 items-center justify-center rounded-2xl bg-white/10 p-2.5 backdrop-blur shadow-inner">
                  <img src={logoMark} alt="AjaTrade logo" className="h-full w-full object-contain" />
                </div>
                <div className="flex size-20 items-center justify-center rounded-full bg-brand-yellow/20 text-brand-yellow">
                  <Icon name="voice" className="size-10" />
                </div>
                {/* Caption also visible in fallback */}
                <p className="mt-auto text-xs sm:text-sm font-medium text-white/80">
                  {SITE.fieldTestPhotoCaption || "Field test, Minna, Niger State"}
                </p>
              </div>
            )}
          </div>

          {/* Desktop badge: circular, bottom-left corner, <= 30% overlap with photo edge */}
          <span
            aria-hidden="true"
            className="hidden sm:flex absolute -bottom-5 -left-5 z-10 size-24 items-center justify-center rounded-full bg-brand-yellow p-3 text-center font-heading text-xs font-bold leading-tight text-brand-dark shadow-soft-lg"
          >
            {democratizeCopy.badge}
          </span>

          {/* Mobile badge: below photo instead of overlapping */}
          <div className="mt-4 flex sm:hidden justify-center">
            <span className="inline-flex items-center justify-center rounded-full bg-brand-yellow px-5 py-2.5 text-center font-heading text-xs font-bold text-brand-dark shadow-soft">
              {democratizeCopy.badge}
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}
