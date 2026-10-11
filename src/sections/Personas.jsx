import Card from "../components/Card.jsx";
import Reveal from "../components/Reveal.jsx";
import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { personas } from "../data/personas.js";
import { sectionCopy } from "../data/sections.js";

export default function Personas() {
  const copy = sectionCopy.personas;

  return (
    <Section id="personas" tone="white">
      <SectionHeading title={copy.title} subtext={copy.subtext} />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {personas.map((persona, index) => (
          <Reveal key={persona.name} delay={index * 70}>
            <Card as="article" className="h-full">
              <div className="flex items-center gap-4">
                <div
                  aria-label={`${persona.name} portrait placeholder`}
                  className="flex size-16 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-brand-green/30 bg-mint font-heading text-2xl font-bold text-brand-green"
                >
                  {persona.initials}
                </div>
                <div>
                  <h3 className="text-xl">{persona.name}</h3>
                  <p className="text-sm text-ink/65">{persona.age} · {persona.role}</p>
                </div>
              </div>
              <p className="mt-5 font-heading text-sm font-semibold text-brand-green">{persona.location}</p>
              <p className="mt-4 text-base leading-relaxed text-ink/75">{persona.description}</p>
              <span className="mt-5 inline-flex rounded-pill bg-brand-yellow/25 px-3 py-1 text-sm font-semibold text-brand-dark">
                {persona.language}
              </span>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
