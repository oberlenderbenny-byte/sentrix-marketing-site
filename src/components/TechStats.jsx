import { IconSensor, IconLink, IconClock, IconShield } from "./icons";

const STATS = [
  {
    Icon: IconSensor,
    title: "Any sensor network",
    desc: "Cameras, access control, motion, LPR, panic buttons — one platform, no rip-and-replace.",
  },
  {
    Icon: IconLink,
    title: "Real-time correlation",
    desc: "Related triggers across sensors and locations merge into a single incident automatically.",
  },
  {
    Icon: IconClock,
    title: "Sub-second AI verification",
    desc: "Vision and reasoning models score each alert before it ever reaches an operator.",
  },
  {
    Icon: IconShield,
    title: "SLA-backed response",
    desc: "Every incident is tracked against your response targets, automatically, from trigger to close.",
  },
];

export default function TechStats({ accent = "#06b6d4" }) {
  return (
    <section className="px-6 md:px-16 py-16 border-t border-border">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {STATS.map(({ Icon, title, desc }) => (
          <div key={title} className="flex flex-col gap-3">
            <span style={{ color: accent }}>
              <Icon size={28} />
            </span>
            <h4 className="text-white font-bold text-[15px]">{title}</h4>
            <p className="text-textDim text-[13.5px] leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
