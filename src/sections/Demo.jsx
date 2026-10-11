import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { sectionCopy } from "../data/sections.js";

const copy = sectionCopy.demo;

/**
 * Placeholder "Bot screens" section — the navbar's #demo anchor.
 * TODO: build from the Phase 1 design.
 */
export default function Demo() {
  return (
    <Section id="demo" tone="white">
      <SectionHeading eyebrow={copy.eyebrow} title={copy.title} subtext={copy.subtext} />
      {/* TODO: bot screens */}
    </Section>
  );
}
