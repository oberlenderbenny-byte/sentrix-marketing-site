export const categories = [
  {
    slug: "retail",
    name: "Retail",
    accent: "#22c55e",
    image: "/images/retail.jpg",
    tagline: "Loss prevention that actually watches your floor",
    blurb: "Entry/exit monitoring, loss-prevention correlation, and after-hours perimeter watch.",
    subcategories: ["Entry & exit monitoring", "Loss-prevention correlation", "After-hours watch"],
    description:
      "Sentrix fuses point-of-sale signals, entry sensors, and camera feeds so loss-prevention teams see a correlated incident instead of a wall of disconnected alerts. After-hours motion on the sales floor is triaged automatically before anyone gets paged.",
    useCases: [
      "Suspicious dwell time near high-shrink displays",
      "Exit-door propped open outside store hours",
      "POS void/refund spike correlated with a camera feed",
      "After-hours motion in the stockroom or loading bay",
      "Repeat visits from a flagged license plate or face match",
    ],
  },
  {
    slug: "banking",
    name: "Banking & finance",
    accent: "#8b5cf6",
    image: "/images/banking.jpg",
    tagline: "Vault-grade SLAs for every branch",
    blurb: "Vault and cash-handling zones treated as critical, with stricter SLAs and escalation.",
    subcategories: ["Vault & cash zones", "Escalation SLAs", "Branch perimeter"],
    description:
      "Cash-handling and vault areas are flagged as critical zones from day one, with tighter detection thresholds and automatic escalation paths so a branch incident reaches the right person in seconds, not minutes.",
    useCases: [
      "Vault door held open past its authorized window",
      "Off-hours access badge used at a branch entrance",
      "Tailgating into a cash-handling room",
      "ATM tamper or skimmer-installation attempt",
      "Duress/panic signal auto-escalated with live video",
    ],
  },
  {
    slug: "warehouse",
    name: "Warehouse & logistics",
    accent: "#d47820",
    image: "/images/warehouse-facility.jpg",
    tagline: "Every gate, dock, and aisle, correlated",
    blurb: "Wide-perimeter coverage with license-plate recognition at gates and loading docks.",
    subcategories: ["Gate & dock LPR", "Perimeter coverage", "Inventory zones"],
    description:
      "Wide-perimeter fence lines, loading docks, and gate traffic are covered together — license-plate recognition at entry points correlates with motion and door sensors deeper in the facility to cut false alarms.",
    useCases: [
      "Unregistered vehicle at a gate or loading dock",
      "Pedestrian activity in a forklift-only aisle",
      "Fence-line cut or climb-over detection",
      "Dock door open outside a scheduled shipment window",
      "High-value inventory zone accessed off-schedule",
    ],
  },
  {
    slug: "corporate",
    name: "Corporate & offices",
    accent: "#60a5fa",
    image: "/images/corporate-facade.jpg",
    tagline: "Every floor plan, AI-zoned and scored for risk",
    blurb: "Sentrix reads your floor plans, draws the zones, and scores each one for sensitivity — access control and camera coverage follow from there.",
    subcategories: ["AI floor-plan & zone analysis", "Access control integration", "Multi-floor schematics"],
    description:
      "Upload a floor plan and Sentrix's AI lays out the zones automatically — server rooms, executive floors, lobbies, stairwells — and scores each one for sensitivity. That scoring, built on years of command-and-control system design, is what drives sensor placement, access-control integration, and correlation rules for every floor in the building.",
    useCases: [
      "Tailgating detected behind a badged entry",
      "Visitor left unescorted past the reception zone",
      "Server room or IT closet accessed outside working hours",
      "Multiple failed badge attempts at the same door",
      "Stairwell or fire-exit propped open for an extended time",
    ],
  },
  {
    slug: "technology",
    name: "Technology",
    accent: "#06b6d4",
    image: "/images/tech-control-room.jpg",
    tagline: "One system, from sensor to resolution",
    blurb: "AI-verified alerts, incident correlation, SLA tracking, and management insights, in a platform built for rapid deployment.",
    subcategories: ["Rapid deployment", "AI-verified alerts", "Incident correlation & SLA"],
    description:
      "Every alert is correlated, AI-verified, and tracked against SLA before it reaches an operator. Vision and reasoning models triage each event, related sensor triggers merge into one incident, and decision-makers get real-time patterns and recommendations across every location, sensor, and camera on one map.",
    useCases: [
      "Multiple sensor triggers merged into a single incident",
      "Low-confidence alert auto-suppressed before it reaches an operator",
      "Live video attached automatically to a verified alert",
      "SLA countdown started the moment a sensor fires",
      "Cross-location pattern flagged for a security manager to review",
    ],
  },
];

export const getCategory = (slug) => categories.find((c) => c.slug === slug);
