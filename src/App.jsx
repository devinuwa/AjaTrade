import Navbar from "./components/Navbar.jsx";
import { accessibilityCopy } from "./data/sections.js";
import BotScreens from "./sections/BotScreens.jsx";
import Features from "./sections/Features.jsx";
import Footer from "./sections/Footer.jsx";
import Hero from "./sections/Hero.jsx";
import HowItWorks from "./sections/HowItWorks.jsx";
import Problem from "./sections/Problem.jsx";
import Traction from "./sections/Traction.jsx";
import Democratize from "./sections/Democratize.jsx";
import Personas from "./sections/Personas.jsx";
import SDGs from "./sections/SDGs.jsx";
import Tutorial from "./sections/Tutorial.jsx";
import Waitlist from "./sections/Waitlist.jsx";

/**
 * AjaTrade marketing site.
 *
 * Sections render in page order and their ids match the navbar anchors
 * (src/data/navbar.js). Copy lives in src/data/; the sections after the hero
 * are still placeholders to be built from the Phase 1 design.
 */
export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-pill focus:bg-brand-dark focus:px-5 focus:py-3 focus:font-heading focus:font-semibold focus:text-cream"
      >
        {accessibilityCopy.skipToContent}
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <Problem />
        <Features />
        <BotScreens />
        <Tutorial />
        <HowItWorks />
        <Traction />
        <Democratize />
        <SDGs />
        <Personas />
        <Waitlist />
      </main>

      <Footer />
    </>
  );
}
