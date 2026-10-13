import { ChevronDown, Download, Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";
import PhoneMockup from "../components/PhoneMockup.jsx";
import Reveal from "../components/Reveal.jsx";
import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { screens } from "../data/screens.js";
import { faqs } from "../data/faqs.js";
import { steps } from "../data/steps.js";
import { sectionCopy } from "../data/sections.js";
import { SITE } from "../data/site.js";
import qrImage from "../assets/whatsapp-qr.png";
import logoMark from "../assets/logo-mark.png";

function FaqAccordion() {
  // First item open by default
  const [openQuestion, setOpenQuestion] = useState(faqs[0]?.question ?? null);

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
              <span>{faq.question}</span>
              <ChevronDown
                aria-hidden="true"
                className={`size-5 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isOpen ? (
              <div className="px-5 pb-4 text-base leading-relaxed text-ink/75">
                {faq.hasPrivacyLink ? (
                  <p>
                    Yes. Your conversations are kept private and secure. We may use your messages (voice, photos and text) to train and improve AjaTrade, as explained in our{" "}
                    <a
                      href="/privacy"
                      className="font-semibold text-brand-green underline decoration-brand-green/40 hover:decoration-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-1"
                    >
                      Privacy Policy
                    </a>
                    .
                  </p>
                ) : (
                  <p>{faq.answer}</p>
                )}
              </div>
            ) : null}
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
          <div className="flex size-48 items-center justify-center rounded-card bg-white p-4 shadow-soft">
            <img
              src={qrImage}
              alt="Scan to open the AjaTrade WhatsApp chat"
              width="240"
              height="240"
              className="size-full object-contain"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
          <p className="font-heading text-sm font-bold text-brand-dark">{SITE.whatsappNumberDisplay}</p>
          <Button href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" size="sm">
            Chat on WhatsApp
          </Button>
        </div>
      ) : null}
    </div>
  );
}

function VideoModal({ videoId, onClose }) {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="AjaTrade demo video"
      className="fixed inset-0 z-50 flex items-center justify-center bg-brand-dark/80 p-4 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="relative flex w-full max-w-4xl flex-col items-center overflow-hidden rounded-2xl bg-brand-dark shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full items-center justify-between border-b border-white/10 px-4 py-3 text-cream">
          <span className="font-heading text-sm font-semibold">Watch: AjaTrade in 60 seconds</span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close video modal"
            className="rounded-full p-1 text-cream/70 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-yellow"
          >
            <X className="size-6" />
          </button>
        </div>

        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title="AjaTrade demo video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            className="size-full border-0"
          />
        </div>
      </div>
    </div>
  );
}

function VideoCard() {
  const [modalOpen, setModalOpen] = useState(false);
  const triggerRef = useRef(null);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => {
    setModalOpen(false);
    triggerRef.current?.focus();
  };

  const hasVideoId = Boolean(SITE.videoId);

  return (
    <>
      <div className="relative aspect-video w-full overflow-hidden rounded-card bg-gradient-to-br from-[#064226] via-[#04331d] to-[#021f11] p-6 text-center shadow-soft-lg sm:p-8">
        {/* Faint watermark logo in background */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <img
            src={logoMark}
            alt=""
            className="size-72 select-none opacity-[0.06] brightness-200 contrast-125"
          />
        </div>

        {/* Content container */}
        <div className="relative z-10 flex size-full flex-col items-center justify-center">
          {hasVideoId ? (
            <button
              ref={triggerRef}
              type="button"
              onClick={handleOpen}
              aria-label="Play AjaTrade in 60 seconds"
              className="group mb-4 flex size-16 items-center justify-center rounded-full bg-brand-yellow text-brand-dark shadow-md transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-brand-yellow/40 active:scale-95"
            >
              <Play aria-hidden="true" className="ml-1 size-7 fill-current" />
            </button>
          ) : (
            <a
              href={SITE.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Watch on YouTube · @ai.ajatrade"
              className="group mb-4 flex size-16 items-center justify-center rounded-full bg-brand-yellow text-brand-dark shadow-md transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-brand-yellow/40 active:scale-95"
            >
              <Play aria-hidden="true" className="ml-1 size-7 fill-current" />
            </a>
          )}

          <h3 className="font-heading text-2xl font-bold tracking-tight text-white drop-shadow-sm sm:text-3xl">
            Watch: AjaTrade in 60 seconds
          </h3>

          <p className="mt-2 text-sm text-cream/90 sm:text-base">
            See how a farmer uses AjaTrade
          </p>

          <a
            href={SITE.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 rounded-pill border border-cream/20 bg-white/5 px-3 py-1 font-heading text-xs font-medium text-cream/80 backdrop-blur-sm transition hover:border-brand-yellow/50 hover:bg-white/10 hover:text-white"
          >
            <span>Watch on YouTube · @{SITE.youtubeHandle}</span>
          </a>
        </div>
      </div>

      {modalOpen && hasVideoId ? (
        <VideoModal videoId={SITE.videoId} onClose={handleClose} />
      ) : null}
    </>
  );
}

export default function Tutorial() {
  const copy = sectionCopy.tutorial;

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

      <div className="mt-16 grid items-start gap-8 lg:grid-cols-2">
        <VideoCard />
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
