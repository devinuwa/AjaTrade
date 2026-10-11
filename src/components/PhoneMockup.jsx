import { ArrowLeft, Battery, Mic, MoreVertical, Smile, Wifi } from "lucide-react";

import logoMark from "../assets/logo-mark.png";
import ChatBubble from "./ChatBubble.jsx";

const SCREEN_WIDTH = 402;
const SCREEN_HEIGHT = 874;
const BEZEL = 14;
const DEVICE_WIDTH = SCREEN_WIDTH + BEZEL * 2;
const DEVICE_HEIGHT = SCREEN_HEIGHT + BEZEL * 2;

export const PHONE_DIMENSIONS = {
  width: DEVICE_WIDTH,
  height: DEVICE_HEIGHT,
};

function StatusBar() {
  return (
    <div className="relative flex h-12 shrink-0 items-center justify-between px-7 font-heading text-[15px] font-semibold text-ink">
      <span>9:41</span>
      <span className="absolute top-2 left-1/2 h-8 w-32 -translate-x-1/2 rounded-full bg-black" aria-hidden="true" />
      <span className="flex items-center gap-2" aria-label="Full signal, Wi-Fi and battery">
        <span className="flex items-end gap-0.5" aria-hidden="true">
          <span className="h-1.5 w-1 rounded-sm bg-ink" />
          <span className="h-2.5 w-1 rounded-sm bg-ink" />
          <span className="h-3.5 w-1 rounded-sm bg-ink" />
          <span className="h-4 w-1 rounded-sm bg-ink" />
        </span>
        <Wifi aria-hidden="true" className="size-4" />
        <Battery aria-hidden="true" className="size-5" />
      </span>
    </div>
  );
}

function WhatsAppHeader() {
  return (
    <div className="flex h-[74px] shrink-0 items-center gap-3 bg-brand-green px-5 text-cream">
      <ArrowLeft aria-hidden="true" className="size-6 shrink-0" />
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-cream">
        <img src={logoMark} alt="" loading="lazy" className="size-8" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-heading text-[17px] font-bold leading-tight">AjaTrade</span>
        <span className="mt-1 block text-[13px] leading-none text-cream/80">online</span>
      </span>
      <MoreVertical aria-hidden="true" className="size-5 shrink-0" />
    </div>
  );
}

function InputBar() {
  return (
    <div className="flex h-[58px] shrink-0 items-center gap-3 bg-[#efe7dc] px-4">
      <div className="flex min-w-0 flex-1 items-center gap-3 rounded-full bg-white px-4 py-2.5 text-ink/45">
        <Smile aria-hidden="true" className="size-5 shrink-0" />
        <span className="text-[15px]">Message</span>
      </div>
      <Mic aria-hidden="true" className="size-6 shrink-0 text-brand-green" />
    </div>
  );
}

export default function PhoneMockup({ screen, scale = 0.8, active = false, scrollable = true }) {
  const scaledWidth = DEVICE_WIDTH * scale;
  const scaledHeight = DEVICE_HEIGHT * scale;

  return (
    <div className={`mx-auto shrink-0 ${active ? "opacity-100" : "opacity-60"} transition-opacity duration-300`}>
      <div style={{ width: scaledWidth, height: scaledHeight }}>
        <div
          className="relative rounded-[55px] bg-[#1c1f1d] p-[14px] shadow-[0_24px_60px_-22px_rgb(0_0_0_/_0.65)]"
          style={{
            width: DEVICE_WIDTH,
            height: DEVICE_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <div className="pointer-events-none absolute top-[190px] -left-[3px] h-20 w-[3px] rounded-l-full bg-[#303431]" aria-hidden="true" />
          <div className="pointer-events-none absolute top-[245px] -right-[3px] h-14 w-[3px] rounded-r-full bg-[#303431]" aria-hidden="true" />
          <div className="pointer-events-none absolute top-[315px] -right-[3px] h-24 w-[3px] rounded-r-full bg-[#303431]" aria-hidden="true" />

          <div className="flex h-full w-full flex-col overflow-hidden rounded-[44px] bg-[#efe7dc]">
            <StatusBar />
            <WhatsAppHeader />
            <div
              className={`relative flex min-h-0 flex-1 flex-col gap-3 bg-[#efe7dc] bg-[radial-gradient(#d6cabe_0.7px,transparent_0.7px)] bg-[size:12px_12px] p-4 ${
                scrollable ? "overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#0b6b3a_transparent]" : "overflow-hidden"
              }`}
            >
              {screen.messages.map((message, index) => (
                <ChatBubble key={`${message.type}-${index}`} message={message} />
              ))}
              <div className="pointer-events-none sticky bottom-[-16px] -mx-4 -mb-4 h-10 shrink-0 bg-gradient-to-t from-[#efe7dc] to-transparent" aria-hidden="true" />
            </div>
            <InputBar />
            <div className="flex h-8 shrink-0 items-center justify-center bg-[#efe7dc]" aria-hidden="true">
              <span className="h-1.5 w-32 rounded-full bg-ink/80" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 min-h-[4.5rem] text-center">
        <p className="font-heading text-lg font-bold text-cream">{screen.title}</p>
        <p className="mt-1 text-sm leading-relaxed text-cream/75">{screen.caption}</p>
      </div>
    </div>
  );
}
