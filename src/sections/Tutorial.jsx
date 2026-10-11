import { ChevronDown, Download, Play } from "lucide-react";
import { useState } from "react";

import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";
import PhoneMockup from "../components/PhoneMockup.jsx";
import Reveal from "../components/Reveal.jsx";
import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { screens } from "../data/screens.js";
import { faqs, steps } from "../data/steps.js";
import { sectionCopy } from "../data/sections.js";

const whatsappUrl = import.meta.env.VITE_WHATSAPP_URL || "https://wa.me/2349067736753";

function FaqAccordion() {
  const [openQuestion, setOpenQuestion] = useState(null);

  return (
    <div className="divide-y divide-brand-green/10 rounded-card bg-white shadow-soft">
      {faqs.map((faq) => {
        const isOpen = openQuestion === faq.question;

        return (
          <div key={faq.question}>
            <button
              type="button"
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-heading font-semibold text-brand-dark"
              onClick={() => setOpenQuestion(isOpen ? null : faq.question)}
            >
              {faq.question}
              <ChevronDown aria-hidden="true" className={`size-5 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
            {isOpen ? <p className="px-5 pb-4 text-base leading-relaxed text-ink/75">{faq.answer}</p> : null}
          </div>
        );
      })}
    </div>
  );
}

function StepPreview({ step }) {
  const screen = screens.find((item) => item.id === step.preview);

  if (!screen) return null;

  return (
    <div className="flex flex-col items-center gap-4">
      <PhoneMockup screen={screen} scale={0.6} active scrollable={false} />
      {step.qr ? (
        <div className="flex flex-col items-center gap-3">
          <div className="flex size-24 items-center justify-center border-4 border-dashed border-brand-green/30 bg-white text-center text-xs font-semibold text-brand-green">
            QR placeholder
          </div>
          <Button href={whatsappUrl} size="sm">
            Chat on WhatsApp
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export default function Tutorial({ videoUrl }) {
  const copy = sectionCopy.tutorial;
  const VideoButton = videoUrl ? "a" : "button";

  return (
    <Section id="tutorial" tone="white">
      <SectionHeading title={copy.title} subtext={copy.subtext} />

      <ol className="relative mt-12 grid items-start gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-4 lg:gap-6">
        <div aria-hidden="true" className="absolute top-6 right-[12.5%] left-[12.5%] hidden h-px bg-brand-green/20 lg:block" />
        {steps.map((step, index) => (
          <Reveal key={step.number} delay={index * 80} as="li" className="relative">
            <div className="flex gap-4 md:flex-col md:items-center md:text-center">
              <span className="z-10 flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-yellow font-heading font-bold text-brand-dark">
                {step.number}
              </span>
              <div>
                <h3 className="text-xl">{step.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-ink/75">{step.description}</p>
              </div>
            </div>
            <div className="mt-5 flex justify-center">
              <StepPreview step={step} />
            </div>
          </Reveal>
        ))}
      </ol>

      <div className="mt-16 grid gap-8 lg:grid-cols-2">
        <Card className="flex aspect-video flex-col items-center justify-center bg-brand-dark text-center">
          <VideoButton
            type={videoUrl ? undefined : "button"}
            href={videoUrl}
            aria-label="Play AjaTrade in 60 seconds"
            className="mb-4 flex size-16 items-center justify-center rounded-full bg-brand-yellow text-brand-dark transition hover:scale-105"
          >
            <Play aria-hidden="true" className="ml-1 size-7 fill-current" />
          </VideoButton>
          <h3 className="text-2xl text-cream">Watch: AjaTrade in 60 seconds</h3>
        </Card>

        <FaqAccordion />
      </div>

      <Card className="mt-8 flex flex-col items-start justify-between gap-5 bg-mint sm:flex-row sm:items-center">
        <div>
          <h3 className="text-xl">Printable picture guide</h3>
          <p className="mt-1 text-base text-ink/70">Keep the four steps close by when you start.</p>
        </div>
        <span title="Coming soon">
          <Button disabled icon={Download} size="sm">
            Download poster
          </Button>
        </span>
      </Card>
    </Section>
  );
}
