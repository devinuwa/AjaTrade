const TONES = {
  cream: "bg-cream",
  mint: "bg-mint",
  white: "bg-white",
  dark: "bg-brand-dark text-cream",
  green: "bg-brand-green text-cream",
};

/**
 * Page section wrapper: centered `max-w-7xl` column with generous
 * vertical rhythm. `tone` picks the background colour band.
 */
export default function Section({
  as: Tag = "section",
  id,
  tone = "cream",
  className = "",
  innerClassName = "",
  children,
  ...props
}) {
  return (
    <Tag
      id={id}
      className={`${TONES[tone] ?? TONES.cream} scroll-mt-24 py-16 sm:py-20 lg:py-28 ${className}`}
      {...props}
    >
      <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 ${innerClassName}`}>{children}</div>
    </Tag>
  );
}
