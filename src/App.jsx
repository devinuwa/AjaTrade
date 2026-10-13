import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";
import HomePage from "./pages/HomePage.jsx";
import TermsPage from "./pages/TermsPage.jsx";
import PrivacyPage from "./pages/PrivacyPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

/**
 * AjaTrade Application Root.
 *
 * Configures client-side routing:
 * - "/" -> Landing page
 * - "/terms" -> Terms of Use
 * - "/privacy" -> Privacy Policy
 * - "*" -> 404 Not Found
 */
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
