import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import CategoryBar from "../components/CategoryBar";
import Footer from "../components/Footer";
import FloorPlanBg from "../components/FloorPlanBg";
import SelfServeC2 from "../components/SelfServeC2";
import { IconBolt } from "../components/icons";
import { categories } from "../data/categories";

export default function Home() {
  const mainRef = useRef(null);
  const selfServeRef = useRef(null);
  const [showBar, setShowBar] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const onScroll = () => {
      setShowBar(window.scrollY > window.innerHeight - 120);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToMain = () => {
    mainRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToSelfServe = () => {
    selfServeRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Header onHamburger={scrollToMain} dark={showBar} />

      {/* Hero screen */}
      <section className="relative h-screen w-full overflow-hidden flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center hero-bg-sun"
          style={{ backgroundImage: "url(/images/hero-fence-sunset.jpg)" }}
        />
        <div className="absolute inset-0 hero-glow-sun pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-bg/10" />
        {/* Top scrim — keeps the header logo/nav legible regardless of how bright
            the hero photo is at the top (e.g. a light sky), independent of the
            bottom gradient above which is tuned for the headline text instead. */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg/80 via-bg/30 to-transparent" />
        <div className="relative z-10 w-full px-6 md:px-16 pb-24">
          <span className="inline-block text-xs font-bold tracking-[1.5px] uppercase text-accent border border-borderStrong rounded-full px-3.5 py-1.5 mb-6">
            AI-verified physical security
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white max-w-3xl leading-tight mb-5">
            Enterprise-grade command and control, without the enterprise overhead
          </h1>
          <p className="text-lg text-textDim max-w-xl mb-2">
            Sentrix brings two decades of tactical C2 experience into a platform built for fast deployment, AI-driven decisions, and every role on your team.
          </p>
        </div>

        {/* Differentiator callout — a credible "this is what sets us apart"
            claim, not a playful aside. Framed as a feature flag: eyebrow tag,
            a concrete claim, and a one-line reason to believe it. */}
        <button
          onClick={scrollToSelfServe}
          className="group hidden sm:block absolute top-28 right-6 md:right-16 z-20 w-[280px] text-left bg-panel/95 backdrop-blur border border-accent/50 rounded-lg px-5 py-4 shadow-[0_16px_40px_rgba(0,0,0,0.5)] hover:border-accent transition-colors"
        >
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-6 h-6 rounded-full bg-accent/15 flex items-center justify-center text-accent">
              <IconBolt size={13} />
            </span>
            <span className="text-[10px] font-bold tracking-[1.5px] uppercase text-accent">
              Industry first
            </span>
          </div>
          <p className="text-[15px] font-bold text-white leading-snug mb-1.5">
            No security expert needed to deploy Sentrix
          </p>
          <p className="text-[12.5px] text-textDim leading-relaxed mb-2.5">
            A built-in engine recommends your sensor types, counts, and placement — before you buy anything.
          </p>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-accent">
            See how it works
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-0.5">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </span>
        </button>

        <button
          onClick={scrollToMain}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <span className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </span>
          <span className="text-xs font-semibold tracking-wide">Scroll down</span>
        </button>
      </section>

      {/* Main / solutions screen */}
      <section ref={mainRef} className="relative h-screen w-full overflow-hidden flex items-center">
        <FloorPlanBg activeSlug={activeCategory} categories={categories} />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/55 via-bg/10 to-bg/65" />
        <div className="relative z-10 w-full px-6 md:px-16">
          <span className="inline-block text-xs font-bold tracking-[1.5px] uppercase text-accent mb-5">
            Solutions by location type
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white max-w-2xl leading-tight mb-6">
            Every profile gets its own detection logic, correlation rules, and SLAs
          </h2>
          <p className="text-textDim max-w-lg">
            Hover a category below to see how Sentrix adapts — or pick one to see it in depth.
          </p>
        </div>
      </section>

      <SelfServeC2 ref={selfServeRef} />

      <Footer />

      <div
        className={`fixed left-0 right-0 bottom-0 z-[80] transition-transform duration-500 ease-out ${
          showBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <CategoryBar active={activeCategory} onActiveChange={setActiveCategory} />
      </div>
    </div>
  );
}
