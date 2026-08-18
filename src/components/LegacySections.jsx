import { useState } from "react";
import { categories } from "../data/categories";
import { submitToInbox } from "../utils/submitForm";

const PLATFORM_FEATURES = [
  { num: "01", title: "Rapid deployment", body: "Significantly faster to implement and roll out than legacy command-and-control systems — at a fraction of the cost." },
  { num: "02", title: "AI-verified alerts", body: "Vision and reasoning models triage each event before it reaches a human, cutting operator and analyst response time." },
  { num: "03", title: "Incident correlation & SLA", body: "Related sensor triggers merge into one incident, tracked end to end against detection and response SLAs." },
  { num: "04", title: "AI-driven management insights", body: "Real-time patterns and recommendations for decision-makers — decisions, not just dashboards." },
  { num: "05", title: "Role-tailored experience", body: "A different view of the same data for operators, commanders, and analysts — each gets what they need." },
  { num: "06", title: "Multi-location, multi-tenant", body: "Every location, sensor, and camera on one map, with organizations and role-based access built in from day one." },
];

const STEPS = [
  { num: "1", title: "Sensor fires", body: "A camera, motion sensor, door, or LPR reader reports an event to Sentrix." },
  { num: "2", title: "AI verifies", body: "Vision AI checks the live frame and reasoning models score the likely severity." },
  { num: "3", title: "Operator responds", body: "A verified incident reaches your team with live video and a suggested response." },
  { num: "4", title: "SLA closes the loop", body: "Response time is tracked automatically against the location's SLA targets." },
];

function SectionHead({ eyebrow, title, body }) {
  return (
    <div className="text-center max-w-xl mx-auto mb-12">
      <span className="inline-block text-xs font-bold tracking-[1.5px] uppercase text-accent mb-3.5">
        {eyebrow}
      </span>
      <h2 className="text-3xl font-extrabold text-white mb-3.5">{title}</h2>
      {body && <p className="text-textDim text-[15px]">{body}</p>}
    </div>
  );
}

export default function LegacySections() {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (form.botcheck.checked) return; // honeypot
    setStatus("loading");
    try {
      const data = Object.fromEntries(new FormData(form).entries());
      await submitToInbox(data, { subject: "New demo request — Sentrix", formName: "Request a demo" });
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="bg-bg">
      {/* Solutions */}
      <section id="solutions" className="border-t border-border px-6 md:px-16 py-20">
        <SectionHead
          eyebrow="Solutions"
          title="Built for the locations you actually run"
          body="Sentrix adapts its detection logic, correlation rules, and SLAs to the profile of each location."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {categories.map((c) => (
            <div key={c.slug} className="bg-panel border border-border rounded-lg p-6">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center font-extrabold text-lg mb-4"
                style={{ background: c.accent + "1f", color: c.accent }}
              >
                {c.name[0]}
              </div>
              <h3 className="text-[16px] font-bold text-white mb-2">{c.name}</h3>
              <p className="text-[13.5px] text-textDim">{c.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Platform */}
      <section id="platform" className="border-t border-border px-6 md:px-16 py-20">
        <SectionHead
          eyebrow="Platform"
          title="One system, from sensor to resolution"
          body="Every alert is correlated, AI-verified, and tracked against SLA — before it reaches an operator."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {PLATFORM_FEATURES.map((f) => (
            <div key={f.num} className="bg-panel border border-border rounded-lg p-6">
              <div className="text-accent font-extrabold text-sm mb-3">{f.num}</div>
              <h3 className="text-[16px] font-bold text-white mb-2">{f.title}</h3>
              <p className="text-[13.5px] text-textDim">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-t border-border px-6 md:px-16 py-20">
        <SectionHead eyebrow="How it works" title="From sensor trigger to closed incident" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {STEPS.map((s) => (
            <div key={s.num}>
              <div className="w-8 h-8 rounded-full bg-panel border border-borderStrong flex items-center justify-center text-accent font-bold text-sm mb-4">
                {s.num}
              </div>
              <h4 className="text-[15px] font-bold text-white mb-2">{s.title}</h4>
              <p className="text-[13.5px] text-textDim">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Demo / CTA */}
      <section id="demo" className="border-t border-border px-6 md:px-16 py-20">
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-start">
          <div>
            <span className="inline-block text-xs font-bold tracking-[1.5px] uppercase text-accent mb-3.5">
              Request a demo
            </span>
            <h2 className="text-3xl font-extrabold text-white mb-4">See Sentrix on your own locations</h2>
            <p className="text-textDim text-[15px] mb-6">
              Tell us a bit about your setup and we'll walk you through a live demo, tailored to your locations and sensors.
            </p>
            <ul className="space-y-2.5 text-[14px] text-textDim">
              <li>30-minute walkthrough with a live map and real incidents</li>
              <li>Guidance on sensor and camera compatibility</li>
              <li>Pilot pricing for your first location</li>
            </ul>
          </div>
          <div>
            {status === "success" ? (
              <div className="bg-panel border border-border rounded-lg p-8 text-center">
                <div className="w-10 h-10 rounded-full bg-accent/20 text-accent flex items-center justify-center mx-auto mb-4 font-bold">
                  ✓
                </div>
                <h4 className="text-white font-bold mb-2">Request received</h4>
                <p className="text-textDim text-[14px]">We'll be in touch shortly to schedule your demo.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-3">
                <input type="checkbox" name="botcheck" className="hidden" tabIndex="-1" autoComplete="off" />
                <div className="grid sm:grid-cols-2 gap-3">
                  <input required name="name" placeholder="Full name" className="bg-panel border border-border rounded-md px-4 py-3 text-sm text-white placeholder:text-textMuted outline-none focus:border-accent" />
                  <input required name="company" placeholder="Company" className="bg-panel border border-border rounded-md px-4 py-3 text-sm text-white placeholder:text-textMuted outline-none focus:border-accent" />
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <input required type="email" name="email" placeholder="Work email" className="bg-panel border border-border rounded-md px-4 py-3 text-sm text-white placeholder:text-textMuted outline-none focus:border-accent" />
                  <input type="tel" name="phone" placeholder="Phone" className="bg-panel border border-border rounded-md px-4 py-3 text-sm text-white placeholder:text-textMuted outline-none focus:border-accent" />
                </div>
                <textarea rows={3} name="locations" placeholder="How many locations are you looking to cover?" className="bg-panel border border-border rounded-md px-4 py-3 text-sm text-white placeholder:text-textMuted outline-none focus:border-accent resize-none" />
                <button type="submit" disabled={status === "loading"} className="bg-accent text-[#04101f] font-bold rounded-md py-3.5 text-sm hover:bg-[#7db4fb] transition-colors disabled:opacity-60">
                  {status === "loading" ? "Sending…" : "Request a demo"}
                </button>
                {status === "error" && (
                  <p className="text-xs text-red-400 text-center">Something went wrong — please try again, or email us directly.</p>
                )}
                <p className="text-xs text-textMuted text-center">We'll reply within one business day.</p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
