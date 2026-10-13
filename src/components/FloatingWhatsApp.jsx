import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { SITE } from "../data/site.js";

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const footer = document.querySelector("footer");
    if (!hero || !footer || typeof IntersectionObserver === "undefined") return undefined;

    let heroVisible = true;
    let footerVisible = false;
    const update = () => setVisible(!heroVisible && !footerVisible);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === hero) heroVisible = entry.isIntersecting;
        if (entry.target === footer) footerVisible = entry.isIntersecting;
      });
      update();
    });

    observer.observe(hero);
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <a
      href={SITE.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with AjaTrade on WhatsApp"
      className="fixed right-4 bottom-5 z-40 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-soft-lg transition-transform hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <MessageCircle aria-hidden="true" className="size-7" />
    </a>
  );
}
