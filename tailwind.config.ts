import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#0B0E14",
        slateDeep: "#131722",
        neonCyan: "#00F0FF",
        electricViolet: "#7000FF",
        crimson: "#FF0055",
        gold: "#FFD700",
      },
      fontFamily: {
        display: ["Rajdhani", "Orbitron", "sans-serif"],
        body: ["Inter", "Plus Jakarta Sans", "sans-serif"],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      boxShadow: {
        glowCyan: "0 0 20px rgba(0,240,255,0.35)",
        glowViolet: "0 0 20px rgba(112,0,255,0.35)",
        glowGold: "0 0 20px rgba(255,215,0,0.35)",
        glowCrimson: "0 0 20px rgba(255,0,85,0.35)",
      },
      keyframes: {
        glow: {
          "0%, 100%": { boxShadow: "0 0 8px rgba(0,240,255,0.25)" },
          "50%": { boxShadow: "0 0 24px rgba(0,240,255,0.6)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-500px 0" },
          "100%": { backgroundPosition: "500px 0" },
        },
        floatUp: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
          "100%": { transform: "translateY(0)" },
        },
        countUp: {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        glow: "glow 2.4s ease-in-out infinite",
        shimmer: "shimmer 1.6s linear infinite",
        floatUp: "floatUp 3s ease-in-out infinite",
        countUp: "countUp 0.4s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
