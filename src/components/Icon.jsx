import {
  Bug,
  Droplets,
  Languages,
  FlaskConical,
  Gauge,
  Leaf,
  MapPin,
  Microscope,
  MessageCircle,
  Mic,
  Orbit,
  Sprout,
  TestTube,
} from "lucide-react";

/**
 * Maps the icon names used in src/data to lucide components, so data files
 * stay plain JavaScript and only this file imports from lucide-react.
 *
 * Add a line here when a data file needs a new icon.
 */
const ICONS = {
  droplets: Droplets,
  crop: Bug,
  fertilizer: FlaskConical,
  "flask-conical": FlaskConical,
  germination: TestTube,
  languages: Languages,
  leaf: Leaf,
  open: Orbit,
  voice: Mic,
  whatsapp: MessageCircle,
  seed: Sprout,
  soil: Microscope,
  sprout: Sprout,
  water: MapPin,
  weed: Gauge,
};

export default function Icon({ name, className = "size-6", ...props }) {
  const Glyph = ICONS[name] ?? Leaf;

  return <Glyph aria-hidden="true" className={className} {...props} />;
}
