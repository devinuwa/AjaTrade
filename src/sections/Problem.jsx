import { useEffect, useState } from "react";

import Reveal from "../components/Reveal.jsx";
import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { useInView } from "../hooks/useInView.js";
import { stats } from "../data/stats.js";
import { sectionCopy } from "../data/sections.js";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function CountUp({ value, suffix, active }) {
  const [displayValue, setDisplayValue] = useState(prefersReducedMotion() || !active ? value : 0);
  const reducedMotion = prefersReducedMotion();

  useEffect(() => {
    if (!active || reducedMotion) {
      setDisplayValue(value);
      return undefined;
    }

    const duration = 1200;
    const start = performance.now();
    let frameId;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const easedProgress = 1 - (1 - progress) ** 3;
      setDisplayValue(value * easedProgress);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [active, reducedMotion, value]);

  const formattedValue = Number.isInteger(value) ? Math.round(displayValue) : displayValue.toFixed(1);

  return (
    <span>
      {formattedValue}
      {suffix}
    </span>
  );
}

function StatCard({ stat, index }) {
  const { ref, inView } = useInView({ threshold: 0.35 });

  return (
    <Reveal delay={index * 80}>
      <article ref={ref} className="rounded-card bg-white p-6 text-center shadow-soft sm:p-8">
        <p className="font-heading text-5xl font-bold tracking-tight text-brand-yellow sm:text-6xl" aria-label={`${stat.value}${stat.suffix}`}>
          <CountUp value={stat.value} suffix={stat.suffix} active={inView} />
        </p>
        <p className="mt-4 font-heading text-base font-semibold leading-relaxed text-brand-green sm:text-lg">
          {stat.label}
        </p>
      </article>
    </Reveal>
  );
}

export default function Problem() {
  const copy = sectionCopy.problem;

  return (
    <Section id="problem" tone="cream">
      <SectionHeading title={copy.title} subtext={copy.subtext} />

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {stats.map((stat, index) => (
          <StatCard key={stat.label} stat={stat} index={index} />
        ))}
      </div>
    </Section>
  );
}
