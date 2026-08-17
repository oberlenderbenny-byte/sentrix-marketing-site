import { Link } from "react-router-dom";

export default function CTABand({
  title,
  accent = "#60a5fa",
  primaryLabel = "Request a demo",
  primaryHref = "/contact",
  secondaryLabel,
  secondaryHref,
}) {
  return (
    <section
      className="px-6 md:px-16 py-20 text-center"
      style={{ background: `linear-gradient(135deg, ${accent}dd, ${accent}99)` }}
    >
      <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-8 max-w-2xl mx-auto">
        {title}
      </h3>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          to={primaryHref}
          className="inline-flex items-center justify-center px-7 py-3.5 rounded-md font-bold text-[15px] bg-white text-[#04101f] hover:bg-white/90 transition-colors"
        >
          {primaryLabel}
        </Link>
        {secondaryLabel && (
          <Link
            to={secondaryHref}
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-md font-bold text-[15px] border-2 border-white text-white hover:bg-white/10 transition-colors"
          >
            {secondaryLabel}
          </Link>
        )}
      </div>
    </section>
  );
}
