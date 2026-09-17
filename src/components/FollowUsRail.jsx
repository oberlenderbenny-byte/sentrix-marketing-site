import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function FollowUsRail() {
  const [visible, setVisible] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    const check = () => {
      const footer = document.querySelector("footer");
      if (!footer) {
        setVisible(true);
        return;
      }
      const rect = footer.getBoundingClientRect();
      // Hide once the footer starts entering the viewport.
      setVisible(rect.top > window.innerHeight - 40);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [pathname]);

  // Shared look for the rail's icon buttons: a dark, brand-outlined circle
  // that fills solid on hover, rather than the plain white-circle treatment
  // this was originally adapted from — keeps the same slot/convention while
  // reading as distinctly ours.
  const iconButtonClass =
    "relative w-9 h-9 rounded-full border border-accent/50 bg-panel/80 backdrop-blur-sm flex items-center justify-center text-accent transition-all duration-200 hover:bg-accent hover:text-bg hover:border-accent hover:shadow-[0_0_18px_rgba(96,165,250,0.55)]";

  const tooltipClass =
    "pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-md border border-border bg-panel2 px-2.5 py-1 text-[11px] font-medium text-text opacity-0 shadow-lg transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100";

  return (
    <div
      className={`hidden md:flex fixed right-5 top-1/2 -translate-y-1/2 z-[70] flex-col items-center gap-4 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <span
        className="text-xs font-semibold tracking-[2px] uppercase text-text/80"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        Follow Us
      </span>
      <span className="w-px h-14 bg-accent/30" />
      <div className="group relative">
        <button
          type="button"
          aria-label="YouTube — coming soon"
          className={`${iconButtonClass} cursor-default`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.5 6.2a2.8 2.8 0 0 0-2-2C18.7 3.7 12 3.7 12 3.7s-6.7 0-8.5.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1 12a29 29 0 0 0 .5 5.8 2.8 2.8 0 0 0 2 2c1.8.5 8.5.5 8.5.5s6.7 0 8.5-.5a2.8 2.8 0 0 0 2-2A29 29 0 0 0 23 12a29 29 0 0 0-.5-5.8ZM9.8 15.5v-7l6 3.5-6 3.5Z" />
          </svg>
        </button>
        <span className={tooltipClass}>Coming soon</span>
      </div>
      
        href="https://www.linkedin.com/company/sentrix-labs-com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className={iconButtonClass}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2 3.77-2 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.02-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97V21h-4V9Z" />
        </svg>
      </a>
    </div>
  );
}
