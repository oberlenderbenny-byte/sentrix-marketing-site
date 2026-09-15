import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import CategoryBar from "../components/CategoryBar";
import Footer from "../components/Footer";
import FloorPlanBg from "../components/FloorPlanBg";
import SelfServeC2 from "../components/SelfServeC2";
import { IconBolt } from "../components/icons";
import { categories } from "../data/categories";
import useDocumentMeta from "../hooks/useDocumentMeta";

// Rotating hero differentiator callout. Each slide keeps the same visual
// container (eyebrow tag, bold claim, one-line reason to believe it, CTA)
// so the rotation reads as one consistent feature, not a carousel of ads.
const DIFFERENTIATOR_SLIDES = [
  {
    eyebrow: "Industry first",
    title: "No security expert needed to deploy Sentrix",
    body: "A built-in engine recommends your sensor types, counts, and placement — before you buy anything.",
    cta: "See how it works",
    action: "self-serve",
    theme: "gold",
  },
  {
    eyebrow: "Built for growth markets",
    title: "Purpose-built for Texas & Florida warehouses",
    body: "Matched to the pace of the region's logistics and industrial growth, with deployment that keeps up.",
    cta: "See warehouse & logistics solutions",
    action: "link",
    href: "/solutions/warehouse",
    theme: "orange",
  },
];

// Slower cadence gives each slide's two lines of copy enough time to read
// comfortably before it rotates; hover/manual navigation still pause or
// reset the clock on top of this.
const DIFFERENTIATOR_INTERVAL_MS = 11000;

export default function Home() {
  useDocumentMeta({
    description: "Sentrix is an AI-verified command-and-control platform for physical security. Deploy a full monitoring system yourself — no security expert needed.",
    path: "/",
  });

  const navigate = useNavigate();
  const mainRef = useRef(null);
  const selfServeRef = useRef(null);
  const barWrapperRef = useRef(null);
  const [showBar, setShowBar] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [differentiatorIdx, setDifferentiatorIdx] = useState(0);
  const [differentiatorPaused, setDifferentiatorPaused] = useState(false);
  // Bumped whenever the visitor manually picks a slide, so the auto-rotate
  // timer below restarts from zero instead of cutting a freshly-chosen
  // slide short.
  const [differentiatorManualTick, setDifferentiatorManualTick] = useState(0);

  useEffect(() => {
    if (differentiatorPaused || DIFFERENTIATOR_SLIDES.length < 2) return;
    const id = setInterval(() => {
      setDifferentiatorIdx((i) => (i + 1) % DIFFERENTIATOR_SLIDES.length);
    }, DIFFERENTIATOR_INTERVAL_MS);
    return () => clearInterval(id);
  }, [differentiatorPaused, differentiatorManualTick]);

  useEffect(() => {
    const onScroll = () => {
      setShowBar(window.scrollY > window.innerHeight - 120);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Once the bottom bar is visible, track the cursor across a band just
  // above it (not the whole page — that would fire while reading page
  // copy up top) so hovering anywhere near a category's column, not only
  // its 64px button, lights it up.
  // Deliberately smaller than the curtain's own height: this only needs to
  // cover the small gap right above the 64px bar so the target doesn't feel
  // pixel-precise. Making it as tall as the curtain itself (280px+) reaches
  // up into unrelated page content (e.g. the self-serve CTA) — the curtain
  // would then pop open and physically cover that button before the cursor
  // ever gets there, since once it's open the pointer lands on the curtain
  // instead, and the button becomes unreachable.
  const HOVER_ZONE_HEIGHT = 110;

  useEffect(() => {
    if (!showBar) {
      setActiveCategory(null);
      return;
    }
    const count = categories.length;
    const onMove = (e) => {
      // Once the pointer is actually over the real bar/curtain element, let
      // it manage its own state (button hover, links inside the curtain,
      // etc.) — don't fight it by recomputing the category from raw x, or
      // moving toward a link on the left edge would flip you to a different
      // category before you ever reach it.
      if (barWrapperRef.current && barWrapperRef.current.contains(e.target)) {
        return;
      }
      // Don't let the curtain pop open over a real button/link elsewhere on
      // the page (e.g. the self-serve CTA) just because it happens to sit
      // within the hover band — that would cover it and swallow the click.
      const overOtherControl = e.target.closest && e.target.closest("a, button");
      if (overOtherControl || e.clientY < window.innerHeight - HOVER_ZONE_HEIGHT) {
        setActiveCategory(null);
        return;
      }
      const idx = Math.min(
        count - 1,
        Math.max(0, Math.floor((e.clientX / window.innerWidth) * count))
      );
      setActiveCategory(categories[idx].slug);
    };
    const onLeave = () => setActiveCategory(null);
    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [showBar]);

  const scrollToMain = () => {
    mainRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToSelfServe = () => {
    selfServeRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const activeDifferentiator = DIFFERENTIATOR_SLIDES[differentiatorIdx];
  const onDifferentiatorClick = () => {
    if (activeDifferentiator.action === "link" && activeDifferentiator.href) {
      navigate(activeDifferentiator.href);
    } else {
      scrollToSelfServe();
    }
  };
  const goToDifferentiator = (e, i) => {
    // Dots live inside the clickable card; stop the click from also
    // triggering the card's own onDifferentiatorClick navigation.
    e.stopPropagation();
    setDifferentiatorIdx(i);
    setDifferentiatorManualTick((t) => t + 1);
  };
  const onDifferentiatorKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onDifferentiatorClick();
    }
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

          {/* Mobile version of the differentiator callout below — same content,
              but laid out in-flow under the hero text instead of absolutely
              positioned, since there's no room to float a card beside the
              headline on a narrow screen. */}
          <div
            role="button"
            tabIndex={0}
            onClick={onDifferentiatorClick}
            onKeyDown={onDifferentiatorKeyDown}
            onMouseEnter={() => setDifferentiatorPaused(true)}
            onMouseLeave={() => setDifferentiatorPaused(false)}
            className={`group sm:hidden mt-5 block w-full max-w-sm text-left cursor-pointer bg-panel/95 backdrop-blur border rounded-lg px-4 py-3.5 shadow-[0_16px_40px_rgba(0,0,0,0.5)] transition-colors ${
              activeDifferentiator.theme === "gold" ? "border-[#fac775]/55" : "border-[#d47820]/55"
            }`}
          >
            <div key={differentiatorIdx} className="banner-fade">
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  activeDifferentiator.theme === "gold" ? "bg-[#fac775]/15 text-[#fac775]" : "bg-[#d47820]/15 text-[#d47820]"
                }`}>
                  <IconBolt size={11} />
                </span>
                <span className={`text-[9px] font-bold tracking-[1.5px] uppercase ${
                  activeDifferentiator.theme === "gold" ? "text-[#fac775]" : "text-[#d47820]"
                }`}>
                  {activeDifferentiator.eyebrow}
                </span>
              </div>
              <p className="text-[14px] font-bold text-white leading-snug mb-1">
                {activeDifferentiator.title}
              </p>
              <p className="text-[12px] text-textDim leading-relaxed mb-2">
                {activeDifferentiator.body}
              </p>
              <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${
                activeDifferentiator.theme === "gold" ? "text-[#fac775]" : "text-[#d47820]"
              }`}>
                {activeDifferentiator.cta}
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-0.5">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </span>
            </div>
            {DIFFERENTIATOR_SLIDES.length > 1 && (
              <div className="flex items-center gap-3 mt-3">
                {DIFFERENTIATOR_SLIDES.map((slide, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={(e) => goToDifferentiator(e, i)}
                    aria-label={`Show slide ${i + 1}: ${slide.eyebrow}`}
                    aria-current={i === differentiatorIdx}
                    className="p-1.5 -m-1.5"
                  >
                    <span
                      className={`block h-1 rounded-full transition-all ${
                        i === differentiatorIdx
                          ? slide.theme === "gold" ? "w-4 bg-[#fac775]" : "w-4 bg-[#d47820]"
                          : slide.theme === "gold" ? "w-1 bg-[#fac775]/30" : "w-1 bg-[#d47820]/30"
                      }`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop version — a credible "this is what sets us apart" claim,
            floated beside the headline. Framed as a feature flag: eyebrow
            tag, a concrete claim, and a one-line reason to believe it. */}
        <div
          role="button"
          tabIndex={0}
          onClick={onDifferentiatorClick}
          onKeyDown={onDifferentiatorKeyDown}
          onMouseEnter={() => setDifferentiatorPaused(true)}
          onMouseLeave={() => setDifferentiatorPaused(false)}
          className={`group hidden sm:block absolute top-28 right-6 md:right-16 z-20 w-[280px] text-left cursor-pointer bg-panel/95 backdrop-blur border rounded-lg px-5 py-4 shadow-[0_16px_40px_rgba(0,0,0,0.5)] transition-colors ${
            activeDifferentiator.theme === "gold" ? "border-[#fac775]/55 hover:border-[#fac775]" : "border-[#d47820]/55 hover:border-[#d47820]"
          }`}
        >
          <div key={differentiatorIdx} className="banner-fade">
            <div className="flex items-center gap-2 mb-2.5">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center ${
                activeDifferentiator.theme === "gold" ? "bg-[#fac775]/15 text-[#fac775]" : "bg-[#d47820]/15 text-[#d47820]"
              }`}>
                <IconBolt size={13} />
              </span>
              <span className={`text-[10px] font-bold tracking-[1.5px] uppercase ${
                activeDifferentiator.theme === "gold" ? "text-[#fac775]" : "text-[#d47820]"
              }`}>
                {activeDifferentiator.eyebrow}
              </span>
            </div>
            <p className="text-[15px] font-bold text-white leading-snug mb-1.5">
              {activeDifferentiator.title}
            </p>
            <p className="text-[12.5px] text-textDim leading-relaxed mb-2.5">
              {activeDifferentiator.body}
            </p>
            <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${
              activeDifferentiator.theme === "gold" ? "text-[#fac775]" : "text-[#d47820]"
            }`}>
              {activeDifferentiator.cta}
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-0.5">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </span>
          </div>
          {DIFFERENTIATOR_SLIDES.length > 1 && (
            <div className="flex items-center gap-3 mt-3">
              {DIFFERENTIATOR_SLIDES.map((slide, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => goToDifferentiator(e, i)}
                  aria-label={`Show slide ${i + 1}: ${slide.eyebrow}`}
                  aria-current={i === differentiatorIdx}
                  className="p-1.5 -m-1.5"
                >
                  <span
                    className={`block h-1 rounded-full transition-all ${
                      i === differentiatorIdx
                        ? slide.theme === "gold" ? "w-4 bg-[#fac775]" : "w-4 bg-[#d47820]"
                        : slide.theme === "gold" ? "w-1 bg-[#fac775]/30" : "w-1 bg-[#d47820]/30"
                    }`}
                  />
                </button>
              ))}
            </div>
          )}
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

      <SelfServeC2 ref={selfServeRef} />

      <Footer />

      {/* Full-height hover column — signals that each bottom-bar item opens a
          full menu below it, not just a category label. Position is derived
          from the item's index so it lines up exactly with its button. */}
      {(() => {
        const activeIdx = categories.findIndex((c) => c.slug === activeCategory);
        const count = categories.length;
        const idx = activeIdx === -1 ? 0 : activeIdx;
        return (
          <div
            className="fixed inset-y-0 z-[75] pointer-events-none transition-all duration-300 ease-out"
            style={{
              left: `${(idx / count) * 100}%`,
              width: `${(1 / count) * 100}%`,
              opacity: activeIdx === -1 ? 0 : 1,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.05) 55%, rgba(255,255,255,0.16) 100%)",
            }}
          />
        );
      })()}

      <div
        ref={barWrapperRef}
        className={`fixed left-0 right-0 bottom-0 z-[80] transition-transform duration-500 ease-out ${
          showBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <CategoryBar active={activeCategory} onActiveChange={setActiveCategory} />
      </div>
    </div>
  );
}
