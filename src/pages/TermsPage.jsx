import LegalLayout from "../components/LegalLayout.jsx";
import { termsData } from "../data/legal/terms.js";

export default function TermsPage() {
  return (
    <LegalLayout
      title={termsData.title}
      lastUpdated={termsData.lastUpdated}
      simpleSummary={termsData.simpleSummary}
      sections={termsData.sections}
    />
  );
}
