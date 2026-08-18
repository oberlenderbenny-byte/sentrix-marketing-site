export default function UseCases({ items = [], accent = "#60a5fa", light = false }) {
  if (!items.length) return null;
  return (
    <section className={`px-6 md:px-16 py-16 border-t ${light ? "border-gray-200" : "border-border"}`}>
      <span
        className="inline-block text-xs font-bold tracking-[1.5px] uppercase mb-3"
        style={{ color: accent }}
      >
        Use cases
      </span>
      <h3 className={`text-2xl md:text-3xl font-extrabold mb-8 max-w-xl ${light ? "text-[#0a1420]" : "text-white"}`}>
        What Sentrix catches here
      </h3>
      <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-4 max-w-3xl">
        {items.map((item) => (
          <li key={item} className={`flex items-start gap-3 text-[15px] leading-relaxed ${light ? "text-gray-700" : "text-text"}`}>
            <span
              className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: accent }}
            />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
