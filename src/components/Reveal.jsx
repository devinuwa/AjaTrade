import { useState } from "react";

import { useInView } from "../hooks/useInView.js";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Fade-up wrapper for scroll reveals.
 *
 * Motion is skipped entirely when the user prefers reduced motion —
 * the content renders in place instead of animating in.
 */
export default function Reveal({ children, delay = 0, className = "", as: Tag = "div", ...props }) {
  const [reducedMotion] = useState(prefersReducedMotion);
  const { ref, inView } = useInView();
  const isVisible = reducedMotion || inView;

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...props}
    >
      {children}
    </Tag>
  );
}
