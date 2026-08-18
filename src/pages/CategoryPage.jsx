import { useParams, Link, Navigate } from "react-router-dom";
import Header from "../components/Header";
import { categories, getCategory } from "../data/categories";
import Footer from "../components/Footer";
import LegacySections from "../components/LegacySections";
import UseCases from "../components/UseCases";
import KeyFeatures from "../components/KeyFeatures";
import CTABand from "../components/CTABand";
import TechStats from "../components/TechStats";
import ProductScreenshot from "../components/ProductScreenshot";
import PlatformCapabilities from "../components/PlatformCapabilities";
import CapabilityHighlight from "../components/CapabilityHighlight";

const CAPABILITY_BY_SLUG = {
  retail: {
    eyebrow: "Investigate like you were there",
    title: "Every loss event gets a full investigation trail",
    description:
      "When shrink or a suspicious return needs a real answer, Sentrix gives you the location schematic with every sensor plotted, a scrubbable timeline of the related alerts, the camera feed at that exact moment, and a place for your notes — exportable straight into a loss-prevention report.",
    image: "/images/cap-investigate.jpg",
    imageAlt: "Investigation view with schematic, timeline, and camera feed",
  },
  banking: {
    eyebrow: "Response, not just detection",
    title: "Every vault alert ships with its own response plan",
    description:
      "Sentrix doesn't just flag a vault or cash-zone event — it generates the specific response steps for that alert (lock down the zone, call the right number, notify the branch manager) and starts an SLA clock the moment the sensor fires, so escalation is timed and auditable, not informal.",
    image: "/images/cap-sop.jpg",
    imageAlt: "AI-generated SOP and SLA tracking on a live alert",
  },
  warehouse: {
    eyebrow: "Know the location before day one",
    title: "Threat intelligence for the ground around your facility",
    description:
      "Before a single sensor goes up, Sentrix scans the perimeter itself: access roads, gates, fence lines, and blind spots, scored for access risk and concealment. That analysis is what decides where cameras and LPR actually go — not a generic template.",
    image: "/images/cap-perimeter-fence.jpg",
    imageAlt: "Location perimeter and access-route threat analysis",
  },
  corporate: {
    eyebrow: "Built on years of command-and-control experience",
    title: "AI reads the floor plan and scores every zone for you",
    description:
      "Upload a schematic and Sentrix's AI lays out the zones automatically and scores each one for sensitivity — a server room and a lobby don't get treated the same. That per-zone scoring is what decides sensor placement, access-control integration, and correlation rules on every floor, drawing on the same command-and-control logic behind Sentrix's tactical roots.",
    image: "/images/cap-investigate.jpg",
    imageAlt: "AI-zoned floor schematic with sensors and access points plotted",
  },
};


export default function CategoryPage() {
  const { slug } = useParams();
  const cat = getCategory(slug);

  if (!cat) return <Navigate to="/" replace />;

  return (
    <div>
      <Header dark onHamburger={() => {}} />

      <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${cat.image})` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(4,10,20,0.35) 0%, rgba(4,10,20,0.55) 50%, #040a14 100%)",
          }}
        />
        <Link
          to="/"
          aria-label="Back to solutions"
          className="absolute top-[96px] left-6 md:left-16 z-20 inline-flex items-center gap-2 text-white/85 text-sm font-semibold hover:text-white transition-colors group"
        >
          <span className="w-9 h-9 rounded-full border border-white/35 flex items-center justify-center group-hover:border-white transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </span>
          <span className="hidden sm:inline">Back to solutions</span>
        </Link>
        <div className="relative z-10 w-full px-6 md:px-16 pb-16">
          <span
            className="inline-block text-xs font-bold tracking-[2px] uppercase mb-5"
            style={{ color: cat.accent }}
          >
            Industry solution
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white max-w-3xl leading-tight mb-5">
            {cat.name}
          </h1>
          <p className="text-lg text-textDim max-w-xl">{cat.tagline}</p>
        </div>
      </section>

      {cat.slug === "technology" ? (
        <>
          <LegacySections />
          <PlatformCapabilities accent={cat.accent} />
          <TechStats accent={cat.accent} />
          <ProductScreenshot accent={cat.accent} />
          <KeyFeatures accent={cat.accent} />
          <CTABand
            title="One system, from sensor to resolution. See it on your own locations."
            accent={cat.accent}
            primaryLabel="Request a demo"
            primaryHref="/contact"
            secondaryLabel="Collaborate with us"
            secondaryHref="/contact"
          />
        </>
      ) : (
        <>
          <div className="bg-white">
            <section className="px-6 md:px-16 py-20 max-w-3xl mx-auto">
              <p className="text-[17px] text-gray-700 leading-relaxed mb-10">{cat.description}</p>

              <div className="grid sm:grid-cols-3 gap-4">
                {cat.subcategories.map((sub) => (
                  <div
                    key={sub}
                    className="bg-white border border-gray-200 rounded-lg px-5 py-6 text-[15px] font-semibold text-[#0a1420] shadow-sm"
                    style={{ borderColor: cat.accent + "40" }}
                  >
                    {sub}
                  </div>
                ))}
              </div>
            </section>

            <UseCases items={cat.useCases} accent={cat.accent} light />
            <CapabilityHighlight accent={cat.accent} light {...CAPABILITY_BY_SLUG[cat.slug]} />
            <KeyFeatures accent={cat.accent} light />
          </div>
          <CTABand
            title={`See how Sentrix adapts to ${cat.name.toLowerCase()}.`}
            accent={cat.accent}
            primaryLabel="Request a demo"
            primaryHref="/contact"
          />
        </>
      )}

      <section className="border-t border-border px-6 md:px-16 py-16">
        <h3 className="text-xs font-bold tracking-[1.5px] uppercase text-textMuted mb-6">
          Other solutions
        </h3>
        <div className="flex flex-wrap gap-3">
          {categories
            .filter((c) => c.slug !== cat.slug)
            .map((c) => (
              <Link
                key={c.slug}
                to={`/solutions/${c.slug}`}
                className="px-5 py-2.5 rounded-full border border-borderStrong text-sm text-textDim hover:text-white hover:border-accent transition-colors"
              >
                {c.name}
              </Link>
            ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
