import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import Button from "../components/Button.jsx";
import PhoneMockup from "../components/PhoneMockup.jsx";
import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { PHONE_DIMENSIONS } from "../components/PhoneMockup.jsx";
import { screens } from "../data/screens.js";
import { sectionCopy } from "../data/sections.js";

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

export default function BotScreens() {
  const [activeIndex, setActiveIndex] = useState(0);
  const slideRefs = useRef([]);
  const copy = sectionCopy.demo;
  const mobileScale = 0.72;
  const desktopScale = 0.78;
  const slideWidth = PHONE_DIMENSIONS.width * desktopScale;

  useEffect(() => {
    const slide = slideRefs.current[activeIndex];
    slide?.parentElement?.scrollTo({
      left: slide.offsetLeft - (slide.parentElement.clientWidth - slide.offsetWidth) / 2,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, [activeIndex]);

  const move = (direction) => {
    setActiveIndex((current) => (current + direction + screens.length) % screens.length);
  };

  return (
    <Section id="demo" tone="green" className="overflow-hidden">
      <SectionHeading
        title={copy.title}
        subtext={copy.subtext}
        className="[&_h2]:text-cream [&_p]:text-cream/80"
      />

      <div
        aria-label="AjaTrade conversation examples"
        aria-roledescription="carousel"
        className="relative mt-12"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") move(-1);
          if (event.key === "ArrowRight") move(1);
        }}
        role="region"
        tabIndex="0"
      >
        <div
          className="flex snap-x snap-mandatory gap-10 overflow-x-auto pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{
            paddingInline: `max(1rem, calc((100% - ${slideWidth}px) / 2))`,
          }}
        >
          {screens.map((screen, index) => (
            <div
              key={screen.id}
              ref={(element) => {
                slideRefs.current[index] = element;
              }}
              aria-label={`${screen.title} ${index + 1} of ${screens.length}`}
              aria-roledescription="slide"
              className="w-[var(--slide-width)] shrink-0 snap-center md:w-[var(--desktop-slide-width)]"
              style={{
                "--slide-width": `${PHONE_DIMENSIONS.width * mobileScale}px`,
                "--desktop-slide-width": `${PHONE_DIMENSIONS.width * desktopScale}px`,
              }}
              role="group"
            >
              <div className="md:hidden">
                <PhoneMockup screen={screen} scale={mobileScale} active={index === activeIndex} scrollable />
              </div>
              <div className="hidden md:block">
                <PhoneMockup screen={screen} scale={desktopScale} active={index === activeIndex} scrollable />
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label="Previous conversation"
          className="absolute top-1/3 left-0 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream/30 bg-brand-dark/80 text-cream transition hover:bg-brand-dark"
          onClick={() => move(-1)}
        >
          <ChevronLeft aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="Next conversation"
          className="absolute top-1/3 right-0 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream/30 bg-brand-dark/80 text-cream transition hover:bg-brand-dark"
          onClick={() => move(1)}
        >
          <ChevronRight aria-hidden="true" />
        </button>
      </div>

      <div className="mt-6 flex flex-col items-center gap-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-cream/85" aria-label="Message types">
          <span>Voice</span>
          <span aria-hidden="true">•</span>
          <span>Photo</span>
          <span aria-hidden="true">•</span>
          <span>Text</span>
        </div>
        <div className="flex flex-wrap justify-center gap-2" aria-label="Languages">
          {["Hausa", "Yoruba", "Igbo", "Pidgin", "English"].map((language) => (
            <span key={language} className="rounded-pill border border-cream/25 px-3 py-1 text-sm text-cream/85">
              {language}
            </span>
          ))}
        </div>
        <Button href="#waitlist">Try the demo</Button>
        <div className="flex gap-2" aria-label="Choose a conversation">
          {screens.map((screen, index) => (
            <button
              key={screen.id}
              type="button"
              aria-label={`Show ${screen.title}`}
              aria-current={index === activeIndex ? "true" : undefined}
              className={`size-2.5 rounded-full transition ${index === activeIndex ? "bg-brand-yellow" : "bg-cream/40 hover:bg-cream/70"}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
