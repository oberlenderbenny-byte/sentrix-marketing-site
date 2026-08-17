const ALL_PILLS = [
  "Correlation rules merge related sensors into one incident",
  "AI-generated SOP + SLA clock on every alert",
  "Perimeter threat analysis before a sensor goes up",
  "Full investigation timeline with AI incident summary",
];

export default function CapabilityHighlight({
  accent = "#60a5fa",
  eyebrow,
  title,
  description,
  image,
  imageAlt,
}) {
  return (
    <section className="px-6 md:px-16 py-20 border-t border-border">
      <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
        <div>
          <span
            className="inline-block text-xs font-bold tracking-[1.5px] uppercase mb-4"
            style={{ color: accent }}
          >
            {eyebrow}
          </span>
          <h3 className="text-xl md:text-2xl font-extrabold text-white mb-4 leading-snug">
            {title}
          </h3>
          <p className="text-textDim text-[15px] leading-relaxed">{description}</p>
        </div>
        <div
          className="rounded-xl overflow-hidden border shadow-2xl max-h-[380px]"
          style={{ borderColor: accent + "40" }}
        >
          <img src={image} alt={imageAlt} className="w-full h-full object-cover object-top" />
        </div>
      </div>
      <div className="flex flex-wrap gap-3 mt-16 max-w-4xl mx-auto justify-center">
        {ALL_PILLS.map((item) => (
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
