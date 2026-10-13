/**
 * Traction data — verified facts only.
 *
 * Field test numbers: 20 farmers total (13 Minna + 7 Shiroro).
 * Never invent statistics or testimonials.
 */

export const tractionStats = [
  { value: "20", label: "Farmers tested" },
  { value: "2", label: "Locations: Minna & Shiroro, Niger State" },
  { value: "5", label: "Languages & accents" },
  { value: "✓", label: "Live on WhatsApp" },
];

/**
 * Field-test locations with farmer counts.
 * Set `ward` to show "[ward] ward, Shiroro LGA" instead of just "Shiroro LGA".
 */
export const fieldTests = [
  { location: "Minna, Niger State", farmers: 13 },
  { location: "Shiroro LGA, Niger State", farmers: 7, ward: null },
];

export const milestones = [
  { label: "Idea", status: "done" },
  { label: "Prototype", status: "done" },
  { label: "Website live", status: "done" },
  { label: "Bot live on WhatsApp", status: "done" },
  { label: "Field tests in Minna & Shiroro", status: "done" },
  { label: "Expand to more farming communities", status: "upcoming" },
  { label: "Public launch", status: "upcoming" },
];

export const builtWith = ["N-ATLAS", "NCAIR", "Awarri", "WhatsApp"];

/**
 * Testimonials — render only when this array is non-empty.
 * Add real, approved testimonials here when available.
 */
export const testimonials = [];
