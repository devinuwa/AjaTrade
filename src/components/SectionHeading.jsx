/**
 * Eyebrow + h2 + subtext block used at the top of each section.
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtext,
  align = "center",
  as: Tag = "h2",
  className = "",
}) {
  const alignment =
    align === "left" ? "items-start text-left" : align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col gap-4 ${alignment} ${className}`}>
      {eyebrow ? (
        <span className="rounded-pill bg-mint px-4 py-1.5 font-heading text-sm font-semibold tracking-wide text-brand-green uppercase">
          {eyebrow}
        </span>
      ) : null}

      <Tag className="max-w-3xl text-3xl font-bold sm:text-4xl lg:text-5xl">{title}</Tag>

      {subtext ? (
        <p className="max-w-2xl text-lg leading-relaxed text-ink/80 sm:text-xl">{subtext}</p>
      ) : null}
    </div>
  );
}
