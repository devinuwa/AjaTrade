import { useEffect, useRef, useState } from "react";

/**
 * Observe an element and report when it enters the viewport.
 *
 * Returns a `ref` to attach and a boolean `inView`. With `once: true`
 * (the default) the observer disconnects after the first entry, so
 * scroll-reveal animations only play a single time.
 *
 * @param {{ threshold?: number, rootMargin?: string, once?: boolean }} options
 */
export function useInView({ threshold = 0.15, rootMargin = "0px 0px -80px 0px", once = true } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return undefined;

    // Older browsers (and non-DOM environments) simply show the content.
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}

export default useInView;
