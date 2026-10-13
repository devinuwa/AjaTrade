import Button from "../components/Button.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../sections/Footer.jsx";
import FloatingWhatsApp from "../components/FloatingWhatsApp.jsx";

export default function NotFoundPage() {
  return (
    <>
      <Navbar />

      <main id="main" className="flex min-h-[60vh] items-center justify-center bg-[#FAF7F2] px-5 py-20 text-center">
        <div className="mx-auto max-w-md">
          <span className="font-heading text-7xl font-bold text-brand-green sm:text-8xl">
            404
          </span>
          <h1 className="mt-4 font-heading text-2xl font-bold text-brand-dark sm:text-3xl">
            Page not found
          </h1>
          <p className="mt-3 text-base text-ink/75">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/" size="lg">
              Back to Home
            </Button>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
