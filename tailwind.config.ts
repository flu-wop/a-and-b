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
        orange:        "#E8900A",
        "orange-bright": "#F5A623",
        "orange-dark": "#B5700A",
        "orange-gold": "#C8960C",
        "bg-deep":     "#111111",
        "bg-dark":     "#1A1A1A",
        "bg-card":     "#1C1C1C",
        "bg-raised":   "#222222",
        "bg-border":   "#2A2A2A",
        charcoal:      "#1C1C1C",
        rivet:         "#3A3A3A",
        "text-primary":"#E8E8E8",
        "text-muted":  "#A0A0A0",
        "text-dim":    "#666666",
      },
      fontFamily: {
        display:    ["'Bebas Neue'", "Impact", "sans-serif"],
        condensed:  ["'Barlow Condensed'", "'Barlow'", "sans-serif"],
        body:       ["'Barlow'", "sans-serif"],
      },
      boxShadow: {
        "orange-glow": "0 0 20px rgba(232,144,10,0.4), 0 0 60px rgba(232,144,10,0.15)",
        "orange-sm":   "0 0 12px rgba(232,144,10,0.25)",
        "card-lift":   "0 4px 24px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.04)",
        "card-hover":  "0 8px 40px rgba(0,0,0,0.7), 0 0 20px rgba(232,144,10,0.12)",
      },
      backgroundImage: {
        "orange-gradient":    "linear-gradient(135deg, #E8900A 0%, #F5A623 50%, #B5700A 100%)",
        "dark-gradient":      "linear-gradient(135deg, #111111 0%, #1A1A1A 50%, #111111 100%)",
        "trust-bar-gradient": "linear-gradient(90deg, #1C1C1C 0%, #2A2A2A 50%, #1C1C1C 100%)",
        "footer-gradient":    "linear-gradient(135deg, #2A2A2A 0%, #1A1A1A 30%, #333333 60%, #1C1C1C 100%)",
        "diag-stripe":        "repeating-linear-gradient(135deg, #E8900A 0px, #E8900A 1px, transparent 1px, transparent 60px)",
      },
      animation: {
        "pulse-orange": "pulse-orange 2s ease-in-out infinite",
      },
      keyframes: {
        "pulse-orange": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(232,144,10,0.4)" },
          "50%":       { boxShadow: "0 0 40px rgba(245,166,35,0.7)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
