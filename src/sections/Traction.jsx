import { useEffect, useRef, useState } from "react";

import Card from "../components/Card.jsx";
import Reveal from "../components/Reveal.jsx";
import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import {
  builtWith,
  fieldTests,
  milestones,
  testimonials,
  tractionStats,
} from "../data/traction.js";
import { sectionCopy } from "../data/sections.js";

/** Fades in when the element scrolls into view. */
function CountUp({ value }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className={visible ? "opacity-100" : "opacity-0"} aria-label={value}>
      {value}
    </span>
  );
}

/** Horizontal progress bar sized relative to `max`. */
function ProgressBar({ value, max }) {
  const pct = Math.round((value / max) * 100);

  return (
    <div className="h-3 w-full overflow-hidden rounded-pill bg-brand-green/20">
      <div
        className="h-full rounded-pill bg-brand-yellow transition-all duration-700"
        style={{ width: `${pct}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      />
    </div>
  );
}

function FieldTestCard() {
  const maxFarmers = Math.max(...fieldTests.map((t) => t.farmers));

  return (
    <Card className="bg-mint">
      <h3 className="font-heading text-xl font-bold text-brand-dark">Field tests</h3>
      <div className="mt-5 flex flex-col gap-5">
        {fieldTests.map((test) => {
          const locationLabel =
            test.ward ? `${test.ward} ward, Shiroro LGA, Niger State` : test.location;

          return (
            <div key={test.location}>
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-heading text-sm font-semibold text-brand-dark">
                  {locationLabel}
                </span>
                <span className="font-heading text-sm font-bold text-brand-green">
                  {test.farmers} farmer{test.farmers !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="mt-2">
                <ProgressBar value={test.farmers} max={maxFarmers} />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default function Traction() {
  const copy = sectionCopy.impact;

  return (
    <Section id="impact" tone="white">
      <SectionHeading title={copy.title} subtext={copy.subtext} />

      {/* Stat cards */}
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {tractionStats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 70}>
            <Card className="h-full bg-brand-green text-center">
              <p className="font-heading text-4xl font-bold text-brand-yellow sm:text-5xl">
                <CountUp value={stat.value} />
              </p>
              <p className="mt-3 text-base font-semibold leading-relaxed text-cream">{stat.label}</p>
            </Card>
          </Reveal>
        ))}
      </div>

      {/* Field tests */}
      <div className="mt-10">
        <FieldTestCard />
      </div>

      {/* Milestone timeline */}
      <ol
        className="relative mt-12 grid gap-6 md:gap-0"
        style={{ gridTemplateColumns: `repeat(${milestones.length}, minmax(0, 1fr))` }}
      >
        <div aria-hidden="true" className="absolute top-4 right-[8%] left-[8%] hidden h-0.5 bg-brand-green/20 md:block" />
        {milestones.map((milestone, index) => (
          <li key={milestone.label} className="relative flex items-center gap-3 md:flex-col md:gap-3 md:text-center">
            <span className={`z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2 ${
              milestone.status === "done"
                ? "border-brand-green bg-brand-green text-cream"
                : "border-brand-yellow bg-white text-brand-dark"
            }`}>
              {index + 1}
            </span>
            <span className={`font-heading text-sm font-semibold ${milestone.status === "done" ? "text-brand-green" : "text-brand-dark"}`}>
              {milestone.label}
            </span>
          </li>
        ))}
      </ol>

      {/* Built with strip */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
        {builtWith.map((partner) => (
          <span key={partner} className="rounded-pill bg-mint px-4 py-2 font-heading text-sm font-semibold text-brand-green">
            {partner}
          </span>
        ))}
      </div>

      {/* Testimonials — only if real ones exist */}
      {testimonials.length > 0
        ? testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="mt-10 flex flex-col gap-6 bg-cream sm:flex-row sm:items-center">
              <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-brand-green/10 font-heading text-2xl font-bold text-brand-green">
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <blockquote className="text-lg leading-relaxed text-ink">&ldquo;{testimonial.quote}&rdquo;</blockquote>
                <p className="mt-3 font-heading text-sm font-semibold text-brand-green">
                  {testimonial.name} · {testimonial.location} · {testimonial.language}
                </p>
              </div>
            </Card>
          ))
        : null}
    </Section>
  );
}
