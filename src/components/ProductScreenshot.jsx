export default function ProductScreenshot({ accent = "#06b6d4" }) {
  return (
    <section className="px-6 md:px-16 py-16 border-t border-border text-center">
      <span
        className="inline-block text-xs font-bold tracking-[1.5px] uppercase mb-3"
        style={{ color: accent }}
      >
        The platform
      </span>
      <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3 max-w-xl mx-auto">
        Smart and intuitive interface
      </h3>
      <p className="text-textDim max-w-lg mx-auto mb-10 text-[15px]">
        Every location, sensor, and camera connects to one command view. Alert stats, sensor health, and
        response patterns update in real time — no separate dashboards to check.
      </p>
      <div
        className="rounded-xl overflow-hidden border max-w-4xl mx-auto shadow-2xl"
        style={{ borderColor: accent + "55" }}
      >
        <div className="bg-panel2 border-b border-border px-4 py-2.5 flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <img
          src="/images/product-dashboard.jpg"
          alt="Sentrix live dashboard: alert stats, sensor health, and alert trends"
          className="w-full block"
        />
      </div>
    </section>
  );
}
