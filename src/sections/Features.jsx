import Card from "../components/Card.jsx";
import Icon from "../components/Icon.jsx";
import Reveal from "../components/Reveal.jsx";
import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { features } from "../data/features.js";
import { sectionCopy } from "../data/sections.js";

const copy = sectionCopy.features;

export default function Features() {
  return (
    <Section id="features" tone="white">
      <SectionHeading title={copy.title} subtext={copy.subtext} />

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <Reveal key={feature.title} delay={index * 60}>
            <Card
              as="article"
              interactive
              className="h-full border-transparent bg-mint p-6"
            >
              <span className="mb-5 flex size-12 items-center justify-center rounded-full bg-brand-yellow text-brand-dark">
                <Icon name={feature.icon} className="size-6" />
              </span>
              <h3 className="text-xl">{feature.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-ink/75">{feature.description}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
