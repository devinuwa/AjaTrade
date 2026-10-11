import { useEffect, useRef, useState } from "react";

import Card from "../components/Card.jsx";
import Reveal from "../components/Reveal.jsx";
import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { milestones, testimonial, tractionStats } from "../data/traction.js";
import { sectionCopy } from "../data/sections.js";

function CountUpPlaceholder({ value }) {
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

function GrowthChart() {
  return (
    <Card as="figure" className="bg-mint">
      <figcaption className="font-heading text-xl font-bold text-brand-dark">Waitlist growth</figcaption>
      <svg
        aria-label="Placeholder line chart for waitlist growth"
        role="img"
        viewBox="0 0 600 190"
        className="mt-6 h-auto w-full"
      >
        <path d="M35 160H570M35 25V160" fill="none" stroke="currentColor" strokeOpacity=".15" strokeWidth="2" />
        <path d="M35 145C120 142 130 126 205 130S285 105 350 110s90-42 130-35 60-32 90-42" fill="none" stroke="#0b6b3a" strokeDasharray="8 8" strokeWidth="5" />
        <text x="35" y="180" fill="currentColor" fontSize="12">Start</text>
        <text x="525" y="180" fill="currentColor" fontSize="12">Now</text>
        <text x="260" y="95" fill="#0b6b3a" fontSize="14">[PLACEHOLDER]</text>
      </svg>
    </Card>
  );
}

export default function Traction() {
  const copy = sectionCopy.impact;

  return (
    <Section id="impact" tone="white">
      <SectionHeading title={copy.title} subtext={copy.subtext} />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {tractionStats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 70}>
            <Card className="h-full bg-brand-green text-center">
              <p className="font-heading text-4xl font-bold text-brand-yellow sm:text-5xl">
                <CountUpPlaceholder value={stat.value} />
              </p>
              <p className="mt-3 text-base font-semibold leading-relaxed text-cream">{stat.label}</p>
            </Card>
          </Reveal>
        ))}
      </div>

      <div className="mt-10">
        <GrowthChart />
      </div>

      <ol className="relative mt-12 grid gap-6 md:grid-cols-6 md:gap-0">
        <div aria-hidden="true" className="absolute top-4 right-[8%] left-[8%] hidden h-0.5 bg-brand-green/20 md:block" />
        {milestones.map((milestone, index) => (
          <li key={milestone.label} className="relative flex items-center gap-3 md:flex-col md:gap-3 md:text-center">
            <span className={`z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2 ${
              milestone.status === "done" ? "border-brand-green bg-brand-green text-cream" : "border-brand-yellow bg-white text-brand-yellow"
            }`}>
              {index + 1}
            </span>
            <span className={`font-heading text-sm font-semibold ${milestone.status === "done" ? "text-brand-green" : "text-brand-dark"}`}>
              {milestone.label}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
        {["N-ATLAS", "NCAIR", "Awarri", "WhatsApp"].map((partner) => (
          <span key={partner} className="rounded-pill bg-mint px-4 py-2 font-heading text-sm font-semibold text-brand-green">
            {partner}
          </span>
        ))}
        {["Partner placeholder", "Partner placeholder"].map((label, index) => (
          <span key={`${label}-${index}`} className="rounded-pill border border-dashed border-brand-green/30 px-4 py-2 text-sm text-ink/50">
            {label}
          </span>
        ))}
      </div>

      <Card className="mt-10 flex flex-col gap-6 bg-cream sm:flex-row sm:items-center">
        <div className="flex size-16 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-brand-green/30 text-xs font-semibold text-brand-green">
          Photo
        </div>
        <div>
          <blockquote className="text-lg leading-relaxed text-ink">“{testimonial.quote}”</blockquote>
          <p className="mt-3 font-heading text-sm font-semibold text-brand-green">
            {testimonial.name} · {testimonial.location} · {testimonial.language}
          </p>
        </div>
      </Card>
    </Section>
  );
}
