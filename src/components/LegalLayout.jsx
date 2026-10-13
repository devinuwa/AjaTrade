import Navbar from "./Navbar.jsx";
import Footer from "../sections/Footer.jsx";
import FloatingWhatsApp from "./FloatingWhatsApp.jsx";

export default function LegalLayout({
  title,
  lastUpdated,
  simpleSummary,
  sections,
}) {
  return (
    <>
      <Navbar />

      <main id="main" className="bg-[#FAF7F2] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="border-b border-brand-green/15 pb-8 sm:pb-12">
            <span className="rounded-pill bg-brand-green/10 px-4 py-1.5 font-heading text-sm font-semibold text-brand-green">
              Legal Information
            </span>
            <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mt-3 text-sm font-medium text-ink/65 sm:text-base">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Simple Words Card */}
          {simpleSummary && simpleSummary.length > 0 ? (
            <div className="mt-8 rounded-card border border-brand-green/20 bg-mint p-6 shadow-soft sm:p-8">
              <h2 className="font-heading text-xl font-bold text-brand-dark sm:text-2xl">
                In simple words
              </h2>
              <p className="mt-1 text-sm text-ink/75">
                Here is a plain-language summary of what you are agreeing to:
              </p>
              <ul className="mt-4 space-y-2.5 text-base text-ink/85">
                {simpleSummary.map((item, index) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <span className="mt-1.5 size-2 shrink-0 rounded-full bg-brand-green" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* Body with Desktop Sticky TOC */}
          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_18rem] lg:gap-16">
            {/* Main Content Column */}
            <article className="max-w-3xl space-y-12">
              {sections.map((sec) => (
                <section
                  key={sec.id}
                  id={sec.id}
                  className="scroll-mt-28 rounded-card bg-white p-6 shadow-soft sm:p-8"
                >
                  <h2 className="font-heading text-xl font-bold text-brand-dark sm:text-2xl">
                    {sec.title}
                  </h2>
                  <div className="prose prose-brand mt-4 max-w-none text-base leading-relaxed text-ink/80 whitespace-pre-line">
                    {sec.content.trim()}
                  </div>
                </section>
              ))}
            </article>

            {/* Desktop Sticky Table of Contents */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 rounded-card border border-brand-green/10 bg-white p-6 shadow-soft">
                <h3 className="font-heading text-base font-bold text-brand-dark">
                  On this page
                </h3>
                <nav className="mt-4 max-h-[calc(100vh-12rem)] overflow-y-auto pr-1">
                  <ul className="space-y-2.5 text-sm">
                    {sections.map((sec) => (
                      <li key={sec.id}>
                        <a
                          href={`#${sec.id}`}
                          className="block text-ink/70 transition-colors hover:text-brand-green"
                        >
                          {sec.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
