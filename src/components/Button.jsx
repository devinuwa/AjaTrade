const VARIANTS = {
  primary: "bg-brand-yellow text-brand-dark hover:brightness-95",
  outline: "border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-cream",
};

// `text-lg` is 18px — the body size — so buttons never feel smaller than body copy.
const SIZES = {
  sm: "px-4 py-2 text-base",
  md: "px-6 py-3 text-lg",
  lg: "px-8 py-4 text-xl",
};

/**
 * Pill button.
 *
 * Renders an `<a>` when `href` is given, otherwise a `<button>`.
 * `icon` takes a lucide-react icon component rendered before the label.
 */
export default function Button({
  variant = "primary",
  size = "md",
  href,
  icon: Icon,
  className = "",
  children,
  ...props
}) {
  const Tag = href ? "a" : "button";

  const classes = [
    "inline-flex items-center justify-center gap-2 rounded-pill font-heading font-semibold",
    "transition-all duration-200 shadow-soft hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60",
    VARIANTS[variant] ?? VARIANTS.primary,
    SIZES[size] ?? SIZES.md,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const iconProps = href ? { href } : { type: props.type ?? "button" };

  return (
    <Tag className={classes} {...iconProps} {...props}>
      {Icon ? <Icon aria-hidden="true" className="size-5 shrink-0" /> : null}
      {children}
    </Tag>
  );
}
