import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0A1628",
        "navy-light": "#142240",
        "navy-mid": "#1B2D4A",
        gold: "#D4A843",
        "gold-light": "#F0D78C",
        "gold-dark": "#B8922E",
        ivory: "#FFFDF5",
        slate: "#94A3B8",
      },
      fontFamily: {
        display: ["Georgia", "Cambria", "serif"],
        body: ["system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
