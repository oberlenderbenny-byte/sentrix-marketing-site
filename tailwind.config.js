/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#040a14",
        panel: "#060f1c",
        panel2: "#0a1626",
        border: "#1e3048",
        borderStrong: "#2a4460",
        text: "#c8d8e8",
        textDim: "#7690b3",
        textMuted: "#4a5f7a",
        accent: "#60a5fa",
        accentDim: "#2a8fd4",
      },
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
