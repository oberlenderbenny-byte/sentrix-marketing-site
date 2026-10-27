import { useEffect } from "react";

// Renders a visible Q&A list and injects a matching FAQPage JSON-LD block
// into <head> while mounted. The schema is kept in sync with the visible
// text on purpose — Google's structured-data guidelines require FAQPage
// markup to mirror content the visitor can actually see on the page, and
// mismatched schema can get a manual action. This also happens to be
// exactly the shape (a direct question followed by a short, self-contained
// answer) that AI answer engines like Gemini lift most cleanly when citing
// a source.
export default function FAQ({ items, id = "faq-jsonld" }) {
  useEffect(() => {
    const json = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    };

    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = id;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(json);

    return () => {
      el?.remove();
    };
  }, [items, id]);

  return (
    <section className="px-6 md:px-16 py-16 border-t border-border">
      <h2 className="text-xl md:text-2xl font-extrabold text-white text-center mb-10">
        Frequently asked questions
      </h2>
      <div className="max-w-3xl mx-auto divide-y divide-border">
        {items.map((item) => (
          <div key={item.q} className="py-5">
            <h3 className="text-[15px] font-bold text-white mb-2">{item.q}</h3>
            <p className="text-textDim text-[13.5px] leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
