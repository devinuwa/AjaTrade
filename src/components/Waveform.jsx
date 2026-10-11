/** Bar heights (px) for the mockup voice-note waveform — presentational only. */
const BARS = [8, 14, 20, 12, 24, 16, 9, 18, 22, 11, 15, 7];

/**
 * Voice-note waveform built from divs. Colours come from the parent via
 * `currentColor`; `active` bars use the brand green like a played-back note.
 */
export default function Waveform({ activeFrom = 5, className = "" }) {
  return (
    <span aria-hidden="true" className={`flex items-center gap-[3px] ${className}`}>
      {BARS.map((height, index) => (
        <span
          key={`${height}-${index}`}
          className={`w-[3px] rounded-pill ${index <= activeFrom ? "bg-current" : "bg-current/35"}`}
          style={{ height: `${height}px` }}
        />
      ))}
    </span>
  );
}
