import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useDocumentMeta from "../hooks/useDocumentMeta";

const PILLARS = [
  {
    title: "Detection, correlated",
    body: "Cameras, access control, motion, LPR, and panic buttons feed one platform. Related triggers across sensors and locations merge into a single incident automatically — instead of a wall of disconnected alerts.",
  },
  {
    title: "Response, built in",
    body: "Every alert generates its own response steps and starts an SLA clock the moment the sensor fires. Operators dismiss, close with a reason, or escalate — and the clock tracks it the whole way.",
  },
  {
    title: "Threat intelligence, before day one",
    body: "Before a single sensor goes up, Sentrix scans the perimeter itself — access roads, structures, vegetation, and blind spots — to inform where sensors get placed and which reference scenarios apply.",
  },
  {
    title: "Investigation, not just logs",
    body: "Every incident gets a real investigation view: the location schematic with every sensor plotted, a scrubbable timeline, the camera feed at that moment, and a place for investigator notes.",
  },
];

export default function About() {
  useDocumentMeta({
    title: "About",
    description: "Sentrix brings two decades of tactical command-and-control experience into an AI-verified physical security platform built for fast deployment.",
    path: "/about",
  });

  return (
    <div>
      <Header dark onHamburger={() => {}} />

      <section className="px-6 md:px-16 pt-32 pb-16 max-w-3xl mx-auto">
        <span className="inline-block text-xs font-bold tracking-[1.5px] uppercase text-accent mb-4">
          About Sentrix
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-6">
          Enterprise-grade command and control, without the enterprise overhead
        </h1>
        <p className="text-[17px] text-textDim leading-relaxed">
          Sentrix brings two decades of tactical command-and-control experience into a platform built for fast
          deployment, AI-driven decisions, and every role on a security team — from the operator watching a live
          feed to the manager reviewing what happened last week.
        </p>
      </section>

      <section className="px-6 md:px-16 py-16 border-t border-border">
        <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {PILLARS.map((p) => (
            <div key={p.title} className="bg-panel border border-border rounded-lg p-7">
              <h3 className="text-[17px] font-bold text-white mb-3">{p.title}</h3>
              <p className="text-textDim text-[14.5px] leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-16 py-20 border-t border-border text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-5">See it on your own locations</h2>
        <p className="text-textDim max-w-xl mx-auto mb-8">
          Tell us a bit about your setup and we'll walk you through a live demo, tailored to your locations and sensors.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center px-7 py-3.5 rounded-md bg-accent text-[#04101f] font-bold text-sm hover:bg-[#7db4fb] transition-colors"
        >
          Get in touch
        </Link>
      </section>

      <Footer />
    </div>
  );
}
