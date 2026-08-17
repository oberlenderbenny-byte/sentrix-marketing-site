// Category-aware site schematic used as an ambient background on the Home
// page. With nothing hovered it shows a generic building outline; hovering
// a category in the bottom bar morphs it into a layout themed for that
// vertical, in that category's accent color.

const hexToRgb = (hex) => {
  const h = hex.replace("#", "");
  const n = parseInt(h, 16);
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
};

const pin = (cx, cy, C, delay, drift, kind) => {
  const cls = drift ? "sensor-pin drift" : "sensor-pin";
  const inner =
    kind === "cam"
      ? `<path d='M ${cx - 8} ${cy + 2.3} A 3.6 3.6 0 0 1 ${cx + 8} ${cy + 2.3}' fill='none' stroke='rgba(255,255,255,0.9)' stroke-width='1.6'/><path d='M ${cx - 12} ${cy + 4.5} A 7.2 7.2 0 0 1 ${cx + 12} ${cy + 4.5}' fill='none' stroke='rgba(255,255,255,0.9)' stroke-width='1.6'/>`
      : kind === "door"
      ? `<rect x='${cx - 7}' y='${cy - 5}' width='14' height='10' rx='2' fill='none' stroke='rgba(255,255,255,0.9)' stroke-width='1.8'/><circle cx='${cx}' cy='${cy}' r='3' fill='none' stroke='rgba(255,255,255,0.9)' stroke-width='1.8'/>`
      : `<circle cx='${cx}' cy='${cy}' r='1.8' fill='rgba(255,255,255,0.9)'/>`;
  return `<g class='${cls}' style='transform-box:fill-box;transform-origin:center;animation-delay:${delay}'>
    <circle cx='${cx}' cy='${cy}' r='15' fill='rgba(${C},0.9)'/>
    <path d='M ${cx - 15} ${cy + 2} L ${cx} ${cy + 28} L ${cx + 15} ${cy + 2} Z' fill='rgba(${C},0.9)'/>
    ${inner}
  </g>`;
};

const outer = (C) => `<rect x='60' y='60' width='1480' height='780' fill='none' stroke='rgba(${C},0.45)' stroke-width='7'/>`;
const spark = (C) => `<rect class='wall-spark' style='stroke-dasharray:40 2960;animation:sparkTravel 22s linear infinite;animation-delay:-1.5s;' x='60' y='60' width='1480' height='780' fill='none' stroke='rgba(${C},0.9)' stroke-width='3' stroke-linecap='round'/>`;

function buildVariant(slug, hex) {
  const C = hexToRgb(hex);
  switch (slug) {
    case "retail": {
      // Open sales floor with shelf aisles + entry/exit points
      const aisles = [280, 420, 560, 700, 840, 980, 1120, 1260]
        .map((x) => `<line x1='${x}' y1='180' x2='${x}' y2='680' stroke='rgba(${C},0.28)' stroke-width='10'/>`)
        .join("");
      return `${outer(C)}${aisles}
        <rect x='60' y='60' width='1480' height='80' fill='rgba(${C},0.12)' stroke='rgba(${C},0.3)' stroke-width='2'/>
        ${spark(C)}
        ${pin(200, 100, C, "4.2s,3.36s", false, "cam")}
        ${pin(1400, 100, C, "4.9s,3.92s", true, "door")}
        ${pin(720, 430, C, "0.6s,0.48s", false, "dot")}`;
    }
    case "banking": {
      // Vault box + cash-handling zone, tighter/more secure feel
      return `${outer(C)}
        <line x1='980' y1='60' x2='980' y2='840' stroke='rgba(${C},0.28)' stroke-width='2'/>
        <rect x='1080' y='300' width='360' height='300' rx='6' fill='rgba(${C},0.16)' stroke='rgba(${C},0.55)' stroke-width='5'/>
        <rect x='1120' y='340' width='280' height='220' rx='4' fill='none' stroke='rgba(${C},0.4)' stroke-width='2'/>
        <rect class='zone-poly drift' style='transform-box:fill-box;transform-origin:center;animation-delay:4.1s,2.46s' x='60' y='60' width='880' height='780' rx='14' fill='rgba(${C},0.08)' stroke='rgba(${C},0.28)' stroke-width='2'/>
        ${spark(C)}
        ${pin(1260, 450, C, "4.2s,3.36s", false, "door")}
        ${pin(400, 200, C, "4.9s,3.92s", true, "cam")}
        ${pin(400, 650, C, "0.6s,0.48s", false, "dot")}`;
    }
    case "warehouse": {
      // Loading dock + sorting/dispatch bands, wide perimeter
      return `${outer(C)}
        <line x1='620' y1='60' x2='620' y2='840' stroke='rgba(${C},0.28)' stroke-width='2'/>
        <rect x='700' y='60' width='840' height='220' fill='none' stroke='rgba(${C},0.5)' stroke-width='5'/>
        <rect x='700' y='320' width='840' height='260' fill='none' stroke='rgba(${C},0.5)' stroke-width='5'/>
        <rect x='700' y='620' width='840' height='220' fill='none' stroke='rgba(${C},0.5)' stroke-width='5'/>
        <rect class='zone-poly' style='transform-box:fill-box;transform-origin:center;animation-delay:4.8s,2.88s' x='60' y='60' width='560' height='780' rx='14' fill='rgba(${C},0.1)' stroke='rgba(${C},0.3)' stroke-width='2'/>
        ${spark(C)}
        ${pin(1120, 190, C, "4.2s,3.36s", false, "cam")}
        ${pin(1120, 460, C, "4.9s,3.92s", true, "dot")}
        ${pin(340, 400, C, "0.6s,0.48s", false, "door")}`;
    }
    case "corporate": {
      // Stacked floors with badge doors
      const floors = [60, 320, 580].map(
        (y) => `<rect x='60' y='${y}' width='1480' height='240' fill='none' stroke='rgba(${C},0.32)' stroke-width='3'/>`
      ).join("");
      return `${floors}
        ${spark(C)}
        ${pin(300, 200, C, "4.2s,3.36s", false, "door")}
        ${pin(1300, 460, C, "4.9s,3.92s", true, "door")}
        ${pin(800, 720, C, "0.6s,0.48s", false, "cam")}`;
    }
    case "technology": {
      // Server-rack grid + a NOC/dashboard zone
      const cols = [140, 220, 300, 380, 460, 540, 620];
      const racks = cols
        .map((x) => `<rect x='${x}' y='140' width='48' height='560' fill='none' stroke='rgba(${C},0.35)' stroke-width='2'/>`)
        .join("");
      return `${outer(C)}${racks}
        <rect x='760' y='140' width='780' height='560' rx='10' fill='rgba(${C},0.1)' stroke='rgba(${C},0.4)' stroke-width='3'/>
        ${spark(C)}
        ${pin(1150, 260, C, "4.2s,3.36s", false, "cam")}
        ${pin(950, 550, C, "4.9s,3.92s", true, "dot")}
        ${pin(300, 150, C, "0.6s,0.48s", false, "dot")}`;
    }
    default: {
      return `${outer(C)}
        <line x1='620' y1='60' x2='620' y2='840' stroke='rgba(${C},0.28)' stroke-width='2'/>
        <line x1='1120' y1='60' x2='1120' y2='840' stroke='rgba(${C},0.28)' stroke-width='2'/>
        <line x1='60' y1='450' x2='1540' y2='450' stroke='rgba(${C},0.2)' stroke-width='2'/>
        <rect class='zone-poly drift' style='transform-box:fill-box;transform-origin:center;animation-delay:4.1s,2.46s' x='60' y='60' width='560' height='390' rx='14' fill='rgba(${C},0.14)' stroke='rgba(${C},0.4)' stroke-width='2'/>
        <rect class='zone-poly' style='transform-box:fill-box;transform-origin:center;animation-delay:4.8s,2.88s' x='1120' y='450' width='420' height='390' rx='14' fill='rgba(${C},0.1)' stroke='rgba(${C},0.32)' stroke-width='2'/>
        ${spark(C)}
        ${pin(340, 255, C, "4.2s,3.36s", false, "cam")}
        ${pin(1330, 260, C, "4.9s,3.92s", true, "door")}
        ${pin(1330, 680, C, "0.6s,0.48s", false, "dot")}`;
    }
  }
}

export default function FloorPlanBg({ activeSlug, categories = [] }) {
  const variants = [
    { slug: "default", hex: "#60a5fa" },
    ...categories.map((c) => ({ slug: c.slug, hex: c.accent })),
  ];

  return (
    <div className="absolute inset-0">
      {variants.map((v) => {
        const isActive = (activeSlug || "default") === v.slug;
        return (
          <div
            key={v.slug}
            className="absolute inset-0 transition-opacity duration-700 ease-out"
            style={{ opacity: isActive ? 1 : 0 }}
            dangerouslySetInnerHTML={{
              __html: `<svg viewBox='0 0 1600 900' preserveAspectRatio='xMidYMid slice' style='position:absolute;inset:0;width:100%;height:100%;'>${buildVariant(
                v.slug,
                v.hex
              )}</svg>`,
            }}
          />
        );
      })}
    </div>
  );
}
