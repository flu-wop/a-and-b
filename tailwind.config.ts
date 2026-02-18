import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#E8900A",
          "orange-bright": "#F5A623",
          "orange-dark": "#B5700A",
          gold: "#C8960C",
          "metal-light": "#B8B8B8",
          "metal-mid": "#888888",
          "metal-dark": "#444444",
          "bg-deep": "#111111",
          "bg-dark": "#1A1A1A",
          "bg-card": "#222222",
          "bg-raised": "#2A2A2A",
          charcoal: "#1C1C1C",
          "rivet-gray": "#3A3A3A",
          "text-primary": "#E8E8E8",
          "text-muted": "#A0A0A0",
        }
      },
      fontFamily: {
        display: ["'Bebas Neue'", "Impact", "sans-serif"],
        heading: ["'Black Han Sans'", "'Anton'", "sans-serif"],
        body: ["'Barlow'", "'Barlow Condensed'", "sans-serif"],
      },
      boxShadow: {
        "orange-glow": "0 0 20px rgba(232,144,10,0.4), 0 0 60px rgba(232,144,10,0.15)",
        "card-lift": "0 4px 24px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.05)",
      },
      animation: {
        "pulse-orange": "pulse-orange 2s ease-in-out infinite",
      },
      keyframes: {
        "pulse-orange": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(232,144,10,0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(245,166,35,0.7)" },
        },
      }
    },
  },
  plugins: [],
};
export default config;
