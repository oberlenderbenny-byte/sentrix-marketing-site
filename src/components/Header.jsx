import { Link, useLocation } from "react-router-dom";

export default function Header({ onHamburger, dark = false }) {
  const { pathname } = useLocation();

  // If we're already on the home page, a normal <Link to="/"> is a no-op —
  // React Router won't remount or scroll. Force it to behave like a fresh
  // visit: jump straight back to the top of the hero.
  const handleLogoClick = (e) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-10 h-[76px] ${
        dark ? "bg-bg/90 backdrop-blur border-b border-border" : "bg-transparent"
      }`}
    >
      <Link to="/" onClick={handleLogoClick} className="flex items-center gap-2.5">
        <img src="/images/logo-mark.png" alt="Sentrix" className="w-9 h-9 object-contain" />
        <span className="font-extrabold tracking-wider text-[15px] text-white">SENTRIX</span>
      </Link>

      <div className="flex items-center gap-3 md:gap-4">
        <Link
          to="/pricing"
          className="hidden lg:inline-flex items-center text-white/85 text-[13px] font-semibold hover:text-accent transition-colors mr-1"
        >
          Pricing
        </Link>
        <Link
          to="/contact"
          className="hidden md:inline-flex items-center justify-center px-5 py-2.5 rounded-md border border-white/35 text-white text-[13px] font-semibold hover:border-accent hover:text-accent transition-colors"
        >
          Collaborate with us now
        </Link>
        <Link
          to="/contact"
          className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-accent text-[#04101f] text-[13px] font-bold hover:bg-[#7db4fb] transition-colors"
        >
          Request a Demo
        </Link>
        <button className="hidden sm:flex items-center gap-1 text-white text-[13px] font-semibold border border-white/35 rounded-md px-3 py-2.5 hover:border-accent transition-colors">
          EN
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        <button
          onClick={onHamburger}
          aria-label="Open menu"
          className="flex flex-col gap-[5px] w-8 h-8 items-end justify-center group"
        >
          <span className="block w-7 h-[2px] bg-white transition-transform group-hover:w-8" />
          <span className="block w-5 h-[2px] bg-white transition-transform group-hover:w-8" />
          <span className="block w-7 h-[2px] bg-white transition-transform group-hover:w-8" />
        </button>
      </div>
    </header>
  );
}
