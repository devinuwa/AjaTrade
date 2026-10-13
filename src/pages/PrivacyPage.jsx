import LegalLayout from "../components/LegalLayout.jsx";
import { privacyData } from "../data/legal/privacy.js";

export default function PrivacyPage() {
  return (
    <LegalLayout
      title={privacyData.title}
      lastUpdated={privacyData.lastUpdated}
      simpleSummary={privacyData.simpleSummary}
      sections={privacyData.sections}
    />
  );
}
