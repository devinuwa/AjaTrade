import { ArrowRight, Ear, MessageCircle, Languages } from "lucide-react";

import Card from "../components/Card.jsx";
import Reveal from "../components/Reveal.jsx";
import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { howItWorks, howItWorksBadge } from "../data/howItWorks.js";
import { sectionCopy } from "../data/sections.js";

const icons = [Ear, Languages, MessageCircle];

export default function HowItWorks() {
  const copy = sectionCopy.howItWorks;

  return (
    <Section id="how-it-works" tone="cream">
      <SectionHeading title={copy.title} subtext={copy.subtext} />
      <div className="mt-12 grid gap-5 md:grid-cols-3 md:gap-10">
        {howItWorks.map((item, index) => {
          const Icon = icons[index];
          return (
            <Reveal key={item.title} delay={index * 100} className="relative">
              <Card as="article" className="h-full bg-white">
                <span className="mb-5 flex size-12 items-center justify-center rounded-full bg-brand-yellow text-brand-dark">
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <h3 className="text-2xl">{item.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-ink/75">{item.description}</p>
              </Card>
              {index < howItWorks.length - 1 ? (
                <ArrowRight aria-hidden="true" className="absolute -right-8 top-1/2 hidden size-6 -translate-y-1/2 text-brand-green/50 md:block" />
              ) : null}
            </Reveal>
          );
        })}
      </div>
      <div className="mt-10 flex justify-center">
        <span className="rounded-pill bg-brand-green px-5 py-2 text-center font-heading text-sm font-semibold text-cream">
          {howItWorksBadge}
        </span>
      </div>
    </Section>
  );
}
