import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#040a14] border-t border-border px-6 md:px-16 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-5 max-w-6xl mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <img src="/images/logo-mark.png" alt="Sentrix" className="w-7 h-7 object-contain" />
          <span className="text-[13px] font-extrabold tracking-wider text-white">SENTRIX</span>
        </Link>
        <div className="flex items-center gap-7 text-[13px]" style={{ color: "#7690b3" }}>
          <Link to="/about" className="hover:text-white transition-colors">About us</Link>
          <Link to="/contact" className="hover:text-white transition-colors">Contact us</Link>
          <Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link>
        </div>
        <span className="text-[12px]" style={{ color: "#4a5f7a" }}>© 2026 Sentrix. All rights reserved.</span>
      </div>
    </footer>
  );
}
