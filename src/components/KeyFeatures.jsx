import { IconBolt, IconLayers, IconLink, IconClock, IconTarget } from "./icons";

const FEATURES = [
  { Icon: IconBolt, label: "Fast deployment per location" },
  { Icon: IconLayers, label: "Works with your existing sensors" },
  { Icon: IconLink, label: "Built-in correlation rules & SOPs" },
  { Icon: IconClock, label: "SLA tracked from trigger to close" },
  { Icon: IconTarget, label: "AI-verified alerts" },
];

export default function KeyFeatures({ accent = "#60a5fa" }) {
  return (
    <section className="px-6 md:px-16 py-16 border-t border-border">
      <h3 className="text-center text-xs font-bold tracking-[1.5px] uppercase text-textDim mb-10">
        Key features
      </h3>
      <div className="flex flex-wrap justify-center gap-x-12 gap-y-10 max-w-4xl mx-auto">
        {FEATURES.map(({ Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-3 w-32 text-center">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center border"
              style={{ borderColor: accent + "55", color: accent }}
            >
              <Icon />
            </div>
            <span className="text-sm font-semibold text-text">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
