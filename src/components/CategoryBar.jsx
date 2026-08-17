import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { categories } from "../data/categories";

export default function CategoryBar({ active, onActiveChange = () => {} }) {
  const navigate = useNavigate();
  const activeCat = categories.find((c) => c.slug === active);

  return (
    <div
      className="relative w-full"
      onMouseLeave={() => onActiveChange(null)}
    >
      <AnimatePresence>
        {activeCat && (
          <motion.div
            key={activeCat.slug}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 280, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden relative border-t"
            style={{ borderColor: activeCat.accent + "55" }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${activeCat.image})` }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(90deg, rgba(4,10,20,0.96) 0%, rgba(4,10,20,0.75) 45%, rgba(4,10,20,0.35) 100%)`,
              }}
            />
            <div className="relative h-full flex flex-col justify-center gap-3 px-8 md:px-16 max-w-xl">
              <span
                className="text-xs font-bold tracking-[1.5px] uppercase mb-1"
                style={{ color: activeCat.accent }}
              >
                {activeCat.name}
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white max-w-md">
                {activeCat.tagline}
              </h3>
              <div className="flex flex-col gap-2 mt-2">
                {activeCat.subcategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => navigate(`/solutions/${activeCat.slug}`)}
                    className="text-left text-[15px] text-textDim hover:text-white transition-colors w-fit"
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-bg border-t border-border h-16 flex items-stretch">
        {categories.map((c) => (
          <button
            key={c.slug}
            onMouseEnter={() => onActiveChange(c.slug)}
            onFocus={() => onActiveChange(c.slug)}
            onClick={() => navigate(`/solutions/${c.slug}`)}
            className="flex-1 flex items-center justify-center text-sm md:text-[15px] font-semibold transition-colors border-r border-border last:border-r-0"
            style={{ color: active === c.slug ? c.accent : "#93a7c2" }}
          >
            {c.name}
          </button>
        ))}
      </div>
    </div>
  );
}
