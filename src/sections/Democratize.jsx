import Card from "../components/Card.jsx";
import Icon from "../components/Icon.jsx";
import Reveal from "../components/Reveal.jsx";
import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { democratizeCopy, principles } from "../data/democratize.js";

export default function Democratize() {
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
          <div
            role="img"
            aria-label={democratizeCopy.imageAlt}
            className="flex aspect-[4/5] items-end justify-center rounded-card border border-cream/20 bg-brand-dark/60 p-8 text-center shadow-soft-lg"
          >
            <p className="rounded-pill bg-brand-dark/80 px-4 py-2 text-sm text-cream/75">Photo placeholder</p>
          </div>
          <span className="absolute -bottom-6 -left-4 flex size-28 items-center justify-center rounded-full bg-brand-yellow p-5 text-center font-heading text-sm font-bold text-brand-dark shadow-soft-lg sm:-left-8">
            {democratizeCopy.badge}
          </span>
        </div>
      </div>
    </Section>
  );
}
