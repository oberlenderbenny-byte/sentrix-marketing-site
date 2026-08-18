import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import CategoryBar from "../components/CategoryBar";
import Footer from "../components/Footer";
import FloorPlanBg from "../components/FloorPlanBg";
import { categories } from "../data/categories";

export default function Home() {
  const mainRef = useRef(null);
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

  return (
    <div>
      <Header onHamburger={scrollToMain} dark={showBar} />

      {/* Hero screen */}
      <section className="relative h-screen w-full overflow-hidden flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/hero-fence-sunset.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-bg/10" />
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
