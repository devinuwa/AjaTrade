/**
 * Soft, warm surface used for features, personas and stats.
 * Set `as="li"` / `as="article"` to keep the markup semantic.
 */
export default function Card({ as: Tag = "div", interactive = false, className = "", children, ...props }) {
  return (
    <Tag
      className={`rounded-card border border-brand-green/10 bg-white p-6 shadow-soft sm:p-8 ${
        interactive ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
