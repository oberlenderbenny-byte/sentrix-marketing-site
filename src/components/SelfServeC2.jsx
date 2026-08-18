import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { IconTarget, IconSensor, IconLayers } from "./icons";

const STEPS = [
  {
    Icon: IconLayers,
    title: "Tell us about the site",
    body: "Address, floor plan or rough layout, and what you're protecting — no security background needed.",
  },
  {
    Icon: IconTarget,
    title: "Sentrix scores the risk",
    body: "The same AI that scans perimeters and zones for enterprise deployments analyzes your location and its surroundings.",
  },
  {
    Icon: IconSensor,
    title: "Get your sensor plan",
    body: "A concrete recommendation: which sensor types, how many, and exactly where to place them — before you buy anything.",
  },
];

const SelfServeC2 = forwardRef(function SelfServeC2({ accent = "#60a5fa" }, ref) {
  return (
    <section ref={ref} className="relative border-t border-border px-6 md:px-16 py-24 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/product-dashboard.jpg)" }}
      />
      {/* Gradient rather than a flat wash — keeps the dashboard photo visibly
          alive at the edges while still giving the centered text a readable
          band, so the section doesn't read as flat/dark like a plain overlay would. */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/90 via-bg/80 to-bg/90" />
      <div
        className="absolute inset-0 opacity-[0.18] pointer-events-none"
        style={{ background: `radial-gradient(circle at 20% 20%, ${accent}, transparent 55%)` }}
      />
      <div className="relative max-w-5xl mx-auto text-center mb-16">
        <span
          className="inline-block text-xs font-bold tracking-[1.5px] uppercase mb-4"
          style={{ color: accent }}
        >
          A first for the industry
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-6 max-w-3xl mx-auto">
          You don't need a security team to stand up a full command &amp; control system
        </h2>
        <p className="text-textDim text-[16px] md:text-[17px] leading-relaxed max-w-2xl mx-auto">
          Sentrix is the first platform that lets anyone — not just trained security professionals —
          go from an empty site to a fully configured monitoring system. A built-in recommendation
          engine takes your site's details and tells you exactly what to buy and where to put it,
          before day one of deployment.
        </p>
      </div>

      <div className="relative grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto mb-14">
        {STEPS.map(({ Icon, title, body }, i) => (
          <div
            key={title}
            className="bg-panel border border-border rounded-xl p-7 relative"
            style={{ borderColor: accent + "33" }}
          >
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center border mb-5"
              style={{ borderColor: accent + "55", color: accent }}
            >
              <Icon size={20} />
            </div>
            <div className="text-xs font-bold tracking-[1.5px] uppercase mb-2" style={{ color: accent }}>
              Step {i + 1}
            </div>
            <h3 className="text-[16px] font-bold text-white mb-2">{title}</h3>
            <p className="text-[13.5px] text-textDim leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      <div className="relative flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/contact"
          className="inline-flex items-center justify-center px-7 py-3.5 rounded-md bg-accent text-[#04101f] text-sm font-bold hover:bg-[#7db4fb] transition-colors"
        >
          See the sensor recommendation engine
        </Link>
      </div>
    </section>
  );
});

export default SelfServeC2;
