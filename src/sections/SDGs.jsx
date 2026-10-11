import { useState } from "react";

import Reveal from "../components/Reveal.jsx";
import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { sdgs } from "../data/sdgs.js";
import { sectionCopy } from "../data/sections.js";

const sdgAssets = import.meta.glob("/src/assets/sdgs icon/*.{png,jpg,jpeg,svg,webp}", {
  eager: true,
  import: "default",
});

const supportedGoals = new Set(sdgs.map((sdg) => sdg.goal));

function goalFromFilename(path) {
  const filename = path.split("/").pop() ?? "";
  const numbers = filename.match(/\d+/g) ?? [];
  return numbers.find((number) => supportedGoals.has(String(Number(number))));
}

const iconByGoal = Object.entries(sdgAssets).reduce((icons, [path, source]) => {
  const goal = goalFromFilename(path);
  if (goal && !icons[goal]) {
    icons[goal] = source;
  }
  return icons;
}, {});

sdgs.forEach((sdg) => {
  if (!iconByGoal[sdg.goal]) {
    console.warn(`No SDG icon found for goal ${sdg.goal}. Using the coloured fallback tile.`);
  }
});

function FallbackTile({ sdg }) {
  const textClass = sdg.textColor === "light" ? "text-white" : "text-brand-dark";

  return (
    <div className={`flex aspect-square flex-col justify-between rounded-2xl p-5 ${textClass}`} style={{ backgroundColor: sdg.color }}>
      <span className="font-heading text-6xl font-bold leading-none">{sdg.goal}</span>
      <span className="font-heading text-lg font-bold leading-tight">{sdg.name}</span>
    </div>
  );
}

export default function SDGs() {
  const [activeGoal, setActiveGoal] = useState(null);
  const copy = sectionCopy.sdgs;

  return (
    <Section id="sdgs" tone="cream">
      <SectionHeading title={copy.title} subtext={copy.subtext} />

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
        {sdgs.map((sdg, index) => {
          const isActive = activeGoal === sdg.goal;
          const icon = iconByGoal[sdg.goal];

          return (
            <Reveal
              key={sdg.goal}
              delay={index * 60}
              className={sdg.primary ? "sm:col-span-2 sm:row-span-2" : ""}
            >
              <article className="group flex h-full flex-col gap-3">
                <button
                  type="button"
                  aria-expanded={isActive}
                  aria-label={`SDG ${sdg.goal}: ${sdg.name}`}
                  className="relative block aspect-square w-full overflow-hidden rounded-2xl text-left shadow-soft transition hover:-translate-y-1 hover:shadow-soft-lg focus-visible:-translate-y-1 focus-visible:shadow-soft-lg"
                  onClick={() => setActiveGoal(isActive ? null : sdg.goal)}
                >
                  {icon ? (
                    <img
                      src={icon}
                      alt={`SDG ${sdg.goal}: ${sdg.name}`}
                      width="800"
                      height="800"
                      loading="lazy"
                      className="block aspect-square h-full w-full rounded-2xl object-contain"
                    />
                  ) : (
                    <FallbackTile sdg={sdg} />
                  )}
                  {sdg.primary ? (
                    <span className="absolute top-3 left-3 rounded-pill bg-white/95 px-3 py-1 text-xs font-bold text-brand-dark shadow-soft">
                      Primary goal
                    </span>
                  ) : null}
                </button>
                <p
                  className={`rounded-2xl bg-white p-4 text-sm font-semibold leading-relaxed text-ink shadow-soft transition-opacity ${
                    isActive ? "opacity-100" : "opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
                  }`}
                >
                  {sdg.summary}
                </p>
              </article>
            </Reveal>
          );
        })}
      </div>

      <p className="mt-8 text-center text-sm leading-relaxed text-ink/65">
        The SDG icons are used in line with UN guidelines. The content of this website has not been approved by the United Nations and does not reflect the views of the UN or its officials.
      </p>
    </Section>
  );
}
