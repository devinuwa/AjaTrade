import { useState } from "react";

import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";
import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { submitWaitlist } from "../lib/waitlist.js";
import { sectionCopy } from "../data/sections.js";

const whatsappUrl = import.meta.env.VITE_WHATSAPP_URL || "https://wa.me/2349067736753";

const initialForm = {
  name: "",
  email: "",
  role: "",
  language: "",
  website: "",
};

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Waitlist() {
  const copy = sectionCopy.waitlist;
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!validateEmail(form.email)) {
      setStatus("error");
      setError("Enter a valid email address.");
      return;
    }

    if (form.website) {
      setStatus("success");
      return;
    }

    setStatus("submitting");
    try {
      await submitWaitlist({
        name: form.name.trim(),
        email: form.email.trim(),
        role: form.role,
        language: form.language,
      });
      setStatus("success");
      setForm(initialForm);
    } catch (submissionError) {
      setStatus("error");
      setError("We couldn't add you right now. Please try again.");
      console.error(submissionError);
    }
  };

  return (
    <Section id="waitlist" tone="dark">
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          title={copy.title}
          subtext={copy.subtext}
          align="left"
          className="[&_h2]:text-cream [&_p]:text-cream/80"
        />

        <Card className="bg-white">
          {status === "success" ? (
            <div role="status" aria-live="polite" className="flex min-h-72 flex-col items-center justify-center text-center">
              <p className="font-heading text-3xl font-bold text-brand-green">You're on the list! 🎉</p>
              <p className="mt-3 text-base text-ink/70">We’ll let you know when AjaTrade is ready.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2 font-heading text-sm font-semibold text-brand-dark">
                  Name <span className="font-normal text-ink/60">(optional)</span>
                  <input
                    name="name"
                    value={form.name}
                    onChange={updateField}
                    autoComplete="name"
                    className="rounded-xl border border-brand-green/20 px-4 py-3 font-body text-base font-normal text-ink focus-visible:border-brand-green"
                  />
                </label>

                <label className="flex flex-col gap-2 font-heading text-sm font-semibold text-brand-dark">
                  Email <span aria-hidden="true" className="text-brand-green">*</span>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={updateField}
                    autoComplete="email"
                    required
                    aria-invalid={status === "error" && !validateEmail(form.email)}
                    aria-describedby={status === "error" ? "waitlist-error" : undefined}
                    className="rounded-xl border border-brand-green/20 px-4 py-3 font-body text-base font-normal text-ink focus-visible:border-brand-green"
                  />
                </label>

                <label className="flex flex-col gap-2 font-heading text-sm font-semibold text-brand-dark">
                  I am a...
                  <select name="role" value={form.role} onChange={updateField} className="rounded-xl border border-brand-green/20 bg-white px-4 py-3 font-body text-base font-normal text-ink focus-visible:border-brand-green">
                    <option value="">Choose one</option>
                    <option>Farmer</option>
                    <option>Trader</option>
                    <option>Small manufacturer</option>
                    <option>Other</option>
                  </select>
                </label>

                <label className="flex flex-col gap-2 font-heading text-sm font-semibold text-brand-dark">
                  Preferred language
                  <select name="language" value={form.language} onChange={updateField} className="rounded-xl border border-brand-green/20 bg-white px-4 py-3 font-body text-base font-normal text-ink focus-visible:border-brand-green">
                    <option value="">Choose one</option>
                    <option>Yoruba</option>
                    <option>Hausa</option>
                    <option>Igbo</option>
                    <option>Pidgin</option>
                    <option>English</option>
                  </select>
                </label>
              </div>

              <label className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                Website
                <input name="website" value={form.website} onChange={updateField} tabIndex="-1" autoComplete="off" />
              </label>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button type="submit" disabled={status === "submitting"}>
                  {status === "submitting" ? "Joining..." : "Join the Waitlist"}
                </Button>
                <Button href={whatsappUrl} variant="outline">
                  Chat on WhatsApp
                </Button>
              </div>

              <p id="waitlist-error" role="alert" aria-live="polite" className={`mt-4 text-sm font-semibold text-red-700 ${status === "error" ? "" : "hidden"}`}>
                {error}
              </p>
            </form>
          )}
        </Card>
      </div>
    </Section>
  );
}
