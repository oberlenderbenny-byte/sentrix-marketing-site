import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const FACTORS = [
  { label: "Number of locations", body: "One HQ or a hundred branches — the platform scales the same way." },
  { label: "Sensors per location", body: "Cameras, access control, motion, LPR, and panic buttons already deployed or new." },
  { label: "SLA & correlation depth", body: "How tightly detection logic, correlation rules, and response SLAs are tuned to each location." },
  { label: "Integrations", body: "Existing hardware and software you want Sentrix to plug into, rather than replace." },
];

const TIERS = [
  {
    name: "Single location",
    blurb: "One site, fully covered",
  },
  {
    name: "Multi-location",
    blurb: "A branch network or campus",
  },
  {
    name: "Enterprise",
    blurb: "Large or complex portfolios",
  },
];

const ROWS = [
  {
    label: "Locations",
    values: ["1 location", "Up to ~20 locations", "20+ locations, phased rollout"],
  },
  {
    label: "Sensors per location",
    values: ["Up to ~50 sensors", "Up to ~250 sensors", "Unlimited, volume-scoped"],
  },
  {
    label: "Video storage & retention",
    values: [
      "Standard rolling retention included",
      "Extended retention, tiered by location",
      "Custom retention & archive policy",
    ],
  },
  {
    label: "AI / reasoning usage",
    values: [
      "Pooled AI usage included",
      "Usage-based, scoped to alert volume",
      "Committed throughput, custom rate",
    ],
  },
];

export default function Pricing() {
  const navigate = useNavigate();

  const close = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  };

  return (
    <div>
      <Header dark onHamburger={() => {}} />

      <section className="relative px-6 md:px-16 pt-32 pb-16 max-w-2xl mx-auto text-center">
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-24 right-6 md:right-0 w-9 h-9 rounded-full border border-border flex items-center justify-center text-textDim hover:text-white hover:border-accent transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <span className="inline-block text-xs font-bold tracking-[1.5px] uppercase text-accent mb-4">
          Pricing
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-6">
          Scoped to your locations, not a seat count
        </h1>
        <p className="text-textDim text-[16px] leading-relaxed">
          Sentrix is priced per deployment, based on the number of locations, sensors, and how deep the correlation
          and SLA setup needs to go. There's no public price list because no two locations look the same — instead,
          we scope it with you on a short call.
        </p>
      </section>

      <section className="px-6 md:px-16 py-16 border-t border-border">
        <h2 className="text-xl md:text-2xl font-extrabold text-white text-center mb-2">
          What changes by organization size
        </h2>
        <p className="text-textDim text-[14.5px] text-center max-w-xl mx-auto mb-10">
          A rough shape of how deployments differ — your actual quote is scoped to your real numbers, not a tier.
        </p>

        <div className="max-w-5xl mx-auto overflow-x-auto">
          <table className="w-full border-collapse min-w-[720px]">
            <thead>
              <tr>
                <th className="text-left text-xs font-bold tracking-[1px] uppercase text-textMuted pb-4 pr-4 w-[180px]">
                  &nbsp;
                </th>
                {TIERS.map((t) => (
                  <th key={t.name} className="text-left pb-4 px-4 border-b border-border">
                    <div className="text-white font-extrabold text-[16px]">{t.name}</div>
                    <div className="text-textDim text-[12.5px] font-normal mt-1">{t.blurb}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.label} className="border-b border-border">
                  <td className="text-[13.5px] font-bold text-white py-4 pr-4 align-top">{row.label}</td>
                  {row.values.map((v, i) => (
                    <td key={i} className="text-[13.5px] text-textDim py-4 px-4 align-top">
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="py-5" />
                {TIERS.map((t) => (
                  <td key={t.name} className="py-5 px-4">
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-accent/50 text-accent text-xs font-bold hover:bg-accent hover:text-[#04101f] transition-colors"
                    >
                      Get a quote
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="px-6 md:px-16 py-16 border-t border-border">
        <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {FACTORS.map((f) => (
            <div key={f.label} className="bg-panel border border-border rounded-lg p-6">
              <h3 className="text-[15px] font-bold text-white mb-2">{f.label}</h3>
              <p className="text-textDim text-[13.5px]">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-16 py-20 border-t border-border text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-5">Get a quote for your locations</h2>
        <p className="text-textDim max-w-xl mx-auto mb-8">
          Tell us a bit about your setup and we'll come back with pricing scoped to it, along with a live demo.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center px-7 py-3.5 rounded-md bg-accent text-[#04101f] font-bold text-sm hover:bg-[#7db4fb] transition-colors"
        >
          Request pricing
        </Link>
      </section>

      <Footer />
    </div>
  );
}
