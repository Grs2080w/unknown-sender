/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  // Preflight desligado de propósito: o visual retrô foi desenhado com box-sizing/line-height padrão do navegador.
  corePlugins: { preflight: false },
  theme: {
    extend: {
      fontFamily: {
        pixel: ["VT323", "monospace"],
        silk: ["Silkscreen", "monospace"],
      },
      colors: {
        ink: "#1b1b2a", // texto / contornos
        bark: "#3a3626", // marrom escuro (bordas, texto secundário)
        stone: "#6b6552", // cinza-marrom
        paper: "#f4efdc",
        cream: "#fffdf5",
        beige: "#e8e2cf",
        sand: "#cfc7ae",
        teal: "#1f6f6b",
        abyss: "#0b1f1e",
        amber: "#ffb000",
        sun: "#ffd34d",
        mint: "#7fd8c8",
        okbg: "#bfe3c4",
        badbg: "#f2a9a2",
        link: "#1d4fb8",
      },
      keyframes: {
        ring: {
          "0%,100%": { transform: "rotate(0)" },
          "20%": { transform: "rotate(-7deg) translateY(-3px)" },
          "40%": { transform: "rotate(7deg) translateY(-3px)" },
          "60%": { transform: "rotate(-5deg)" },
          "80%": { transform: "rotate(5deg)" },
        },
        blink: { "0%,100%": { opacity: "1" }, "50%": { opacity: ".2" } },
        pop: { "0%": { transform: "scale(.6)" }, "60%": { transform: "scale(1.15)" }, "100%": { transform: "scale(1)" } },
      },
      animation: {
        ring: "ring .5s infinite",
        blink: "blink 1s infinite",
        pop: "pop .4s",
        "pop-fast": "pop .35s",
      },
    },
  },
  plugins: [],
};
