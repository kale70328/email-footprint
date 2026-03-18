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
          indigo: "#4F46E5",
          cyan: "#06B6D4",
          green: "#22C55E",
          bg: "#F0F4FF",
          card: "#FFFFFF",
          text: "#111827",
          sub: "#6B7280",
          border: "#E0E7FF",
          dark: "#1E1B4B",
        },
      },
      fontFamily: {
        display: ["'Bricolage Grotesque'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'DM Mono'", "monospace"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        card: "0 4px 24px -4px rgba(79,70,229,0.10), 0 1px 4px rgba(0,0,0,0.04)",
        "card-hover": "0 8px 32px -4px rgba(79,70,229,0.18), 0 2px 8px rgba(0,0,0,0.06)",
        glow: "0 0 0 3px rgba(79,70,229,0.18)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
export default config;
