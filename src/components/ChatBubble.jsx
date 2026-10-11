import { CheckCheck, Image as ImageIcon, Play } from "lucide-react";

import Waveform from "./Waveform.jsx";

function BubbleMeta({ timestamp, side, status = "read" }) {
  return (
    <span className="mt-1 flex items-center justify-end gap-1 whitespace-nowrap text-[11px] leading-none text-ink/50">
      {timestamp}
      {side === "user" && status === "read" ? <CheckCheck aria-label="Read" className="size-3 text-brand-green" /> : null}
    </span>
  );
}

function VoiceNote({ message }) {
  return (
    <div className="flex w-[230px] min-w-0 items-center gap-3 text-brand-green">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-green text-cream">
        <Play aria-hidden="true" className="ml-0.5 size-4 fill-current" />
      </span>
      <Waveform activeFrom={message.side === "bot" ? 7 : 4} className="min-w-0 flex-1" />
      <span className="shrink-0 whitespace-nowrap text-[15px] font-semibold text-ink/65">{message.duration}</span>
    </div>
  );
}

function ImageBubble({ message }) {
  return (
    <div>
      <div role="img" aria-label={message.caption} className="flex h-28 items-center justify-center rounded-xl bg-brand-green/15 text-brand-green">
        <ImageIcon aria-hidden="true" className="size-9" />
      </div>
      <p className="mt-2 break-words text-[15px] leading-snug text-ink/80">{message.caption}</p>
    </div>
  );
}

function ResultCard({ message }) {
  return (
    <div className="rounded-xl bg-mint/70 p-3">
      <p className="font-heading text-[15px] font-bold text-brand-dark">{message.title}</p>
      <dl className="mt-2 grid grid-cols-[96px_1fr] gap-x-3 gap-y-2 text-[14px]">
        {message.rows.map(([label, value]) => (
          <div key={label} className="contents">
            <dt className="whitespace-nowrap font-semibold text-brand-green">{label}</dt>
            <dd className="min-w-0 break-words text-ink/75">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function ChatBubble({ message }) {
  const isUser = message.side === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`w-fit min-w-[96px] max-w-[82%] break-words rounded-2xl px-3 py-2 shadow-sm ${
          isUser ? "rounded-br-md bg-[#dcf8c6]" : "rounded-bl-md bg-white"
        }`}
      >
        {message.type === "voice" ? <VoiceNote message={message} /> : null}
        {message.type === "image" ? <ImageBubble message={message} /> : null}
        {message.type === "result" ? <ResultCard message={message} /> : null}
        {message.type === "text" ? <p className="break-words text-[15px] leading-snug text-ink">{message.text}</p> : null}
        <BubbleMeta timestamp={message.timestamp} side={message.side} status={message.status} />
      </div>
    </div>
  );
}
