const CAPABILITIES = [
  {
    eyebrow: "Response, not just detection",
    title: "Every alert ships with its own response plan",
    description:
      "Sentrix doesn't just flag an event — it generates the specific response steps for that alert (activate the fire system, call the right number, start evacuation, notify the manager) and starts an SLA clock the moment the sensor fires. Operators dismiss, close with a reason, or escalate, and the clock tracks it the whole way.",
    image: "/images/cap-sop.jpg",
  },
  {
    eyebrow: "Know the location before day one",
    title: "Threat intelligence for the ground around your location",
    description:
      "Before a single sensor goes up, Sentrix scans the perimeter itself: nearby roads and access routes, buildings, vegetation, and blind spots, scored for access risk and concealment. That analysis feeds directly into where sensors get placed and which reference scenarios apply — checked against external data sources, not just a template.",
    image: "/images/cap-perimeter-fence.jpg",
  },
  {
    eyebrow: "Investigate like you were there",
    title: "A full timeline, not a list of logs",
    description:
      "Every incident gets a real investigation view: the location schematic with every sensor plotted, a scrubbable timeline of every related alert, the camera feed at that moment, and a place for investigator notes — exportable straight to a report.",
    image: "/images/cap-investigate.jpg",
  },
];

export default function PlatformCapabilities({ accent = "#06b6d4" }) {
  return (
    <section className="px-6 md:px-16 py-20 border-t border-border">
      <span
        className="inline-block text-xs font-bold tracking-[1.5px] uppercase mb-3"
        style={{ color: accent }}
      >
        Under the hood
      </span>
      <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-16 max-w-2xl">
        What actually makes Sentrix different
      </h2>

      <div className="flex flex-col gap-20 max-w-6xl mx-auto">
        {CAPABILITIES.map((cap, i) => (
          <div
            key={cap.title}
            className={`grid md:grid-cols-2 gap-10 items-center ${
              i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div>
              <span
                className="inline-block text-xs font-bold tracking-[1.5px] uppercase mb-4"
                style={{ color: accent }}
              >
                {cap.eyebrow}
              </span>
              <h3 className="text-xl md:text-2xl font-extrabold text-white mb-4 leading-snug">
                {cap.title}
              </h3>
              <p className="text-textDim text-[15px] leading-relaxed">{cap.description}</p>
            </div>
            <div
              className="rounded-xl overflow-hidden border shadow-2xl max-h-[420px]"
              style={{ borderColor: accent + "40" }}
            >
              <img
                src={cap.image}
                alt={cap.title}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 mt-16 max-w-4xl mx-auto justify-center">
        {[
          "Correlation rules merge related sensors into one incident",
          "Reference scenarios refined against external data sources",
          "Sensor placement & type recommended before purchase",
          "Cross-location AI summaries for security managers",
        ].map((item) => (
          <span
            key={item}
            className="px-4 py-2 rounded-full border text-xs font-semibold text-textDim"
            style={{ borderColor: accent + "40" }}
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
