import { useEffect, useRef, useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";

import logo from "../assets/logo.png";
import { navbarCopy, navCta, navLinks } from "../data/navbar.js";
import { SITE } from "../data/site.js";
import { useScrolled } from "../hooks/useScrolled.js";
import Button from "./Button.jsx";

const FOCUSABLE = 'a[href], button:not([disabled])';

/**
 * Sticky top navigation.
 *
 * White with a backdrop blur; a bottom border and soft shadow fade in once
 * the page has scrolled. Below `lg` the links collapse into a hamburger that
 * opens a full-width menu — the menu traps Tab, closes on Escape, and hands
 * focus back to the toggle.
 */
export default function Navbar() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  const toggleRef = useRef(null);
  const panelRef = useRef(null);
  const firstLinkRef = useRef(null);

  // Move focus into the menu when it opens.
  useEffect(() => {
    if (open) firstLinkRef.current?.focus();
  }, [open]);

  // Escape to close, Tab keeps cycling inside the panel.
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(panelRef.current.querySelectorAll(FOCUSABLE));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // If the viewport grows to desktop, drop the mobile menu state.
  useEffect(() => {
    if (!open) return undefined;

    const query = window.matchMedia("(min-width: 1024px)");
    const onChange = (event) => {
      if (event.matches) setOpen(false);
    };

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/85 backdrop-blur-md transition-colors duration-300 ${
        scrolled ? "border-brand-green/15 shadow-soft" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-5 py-3 sm:px-8 lg:px-12">
        <a href="/#hero" className="flex shrink-0 items-center" aria-label={navbarCopy.homeLabel}>
          <img
            src={logo}
            alt={navbarCopy.logoAlt}
            width={120}
            height={40}
            className="h-10 w-auto sm:h-11"
          />
        </a>

        <nav aria-label={navbarCopy.navLabel} className="flex items-center gap-8">
          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-medium text-ink/80 transition-colors hover:text-brand-green"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <Button href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" icon={MessageCircle} size="sm" className="hidden lg:inline-flex">
            {navCta.label}
          </Button>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? navbarCopy.closeMenuLabel : navbarCopy.openMenuLabel}
            className="inline-flex size-11 items-center justify-center rounded-pill border border-brand-green/20 text-brand-green lg:hidden"
          >
            {open ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
            <span className="sr-only">{navbarCopy.menuLabel}</span>
          </button>
        </nav>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          ref={panelRef}
          className="max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-brand-green/10 bg-white px-5 pb-8 sm:px-8 lg:hidden"
        >
          <nav aria-label={navbarCopy.navLabel}>
            <ul className="flex flex-col">
              {navLinks.map((link, index) => (
                <li key={link.href}>
                  <a
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={link.href}
                    onClick={closeMenu}
                    className="block border-b border-brand-green/10 py-4 font-medium text-ink/85 transition-colors hover:text-brand-green"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <Button href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" icon={MessageCircle} onClick={closeMenu} className="mt-6 w-full">
            {navCta.label}
          </Button>
        </div>
      ) : null}
    </header>
  );
}
