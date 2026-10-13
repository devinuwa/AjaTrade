import { MessageCircle } from "lucide-react";

import qrImage from "../assets/whatsapp-qr.png";
import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";
import Reveal from "../components/Reveal.jsx";
import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { SITE } from "../data/site.js";
import { sectionCopy } from "../data/sections.js";

const languages = ["Hausa", "Igbo", "Yoruba", "Pidgin", "Nigerian English"];

export default function ChatCTA() {
  const copy = sectionCopy.chat;

  return (
    <Section id="chat" tone="dark">
      <SectionHeading
        title={copy.title}
        subtext={copy.subtext}
        className="[&_h2]:text-cream [&_p]:text-cream/80"
      />

      <div className="mt-12 grid items-center gap-8 lg:grid-cols-2">
        <Reveal>
          <Card className="mx-auto flex max-w-md flex-col items-center gap-5 bg-white p-6 text-center sm:p-8">
            <img
              src={qrImage}
              alt="Scan to open the AjaTrade WhatsApp chat"
              width="320"
              height="320"
              className="size-56 rounded-card bg-white object-contain p-4 sm:size-72"
              style={{ imageRendering: "pixelated" }}
            />
            <p className="font-heading text-xl font-bold text-brand-dark">{SITE.whatsappNumberDisplay}</p>
            <Button href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" icon={MessageCircle} size="lg">
              Chat on WhatsApp
            </Button>
          </Card>
        </Reveal>

        <Reveal delay={120} className="lg:pl-8">
          <p className="font-heading text-3xl font-bold text-cream sm:text-4xl">{SITE.whatsappNumberDisplay}</p>
          <Button
            href={SITE.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            icon={MessageCircle}
            size="lg"
            className="mt-6 w-full sm:w-auto"
          >
            Chat on WhatsApp
          </Button>
          <ul aria-label="Languages supported" className="mt-8 flex flex-wrap gap-2">
            {languages.map((language) => (
              <li key={language} className="rounded-pill border border-cream/25 px-4 py-2 text-sm font-semibold text-cream/90">
                {language}
              </li>
            ))}
          </ul>
          <p className="mt-8 font-heading text-xl font-semibold text-brand-yellow">Free to use.</p>
        </Reveal>
      </div>
    </Section>
  );
}
