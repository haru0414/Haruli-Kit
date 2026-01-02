import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ═══════════════════════════════════════════════════
      // 🎨 Haruli Color System - Ronin Theme
      // ═══════════════════════════════════════════════════
      colors: {
        // Core
        background: "var(--background)",
        surface: {
          DEFAULT: "var(--surface)",
          hover: "var(--surface-hover)",
        },
        border: "var(--border)",

        // Brand
        primary: {
          DEFAULT: "var(--primary)",
          light: "var(--primary-light)",
          glow: "var(--primary-glow)",
        },

        // Accents
        accent: {
          blue: "var(--accent-blue)",
          yellow: "var(--accent-yellow)",
          cyan: "#06B6D4",
          pink: "#F472B6",
          green: "#22C55E",
        },

        // Text
        foreground: "var(--foreground)",
        muted: {
          DEFAULT: "var(--muted)",
          dark: "var(--muted-dark)",
        },
      },

      // ═══════════════════════════════════════════════════
      // 📝 Typography
      // ═══════════════════════════════════════════════════
      fontFamily: {
        sans: ["var(--font-sans)", "Space Grotesk", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },

      // ═══════════════════════════════════════════════════
      // 🎭 Shadows - Katana Hard Shadow Style
      // ═══════════════════════════════════════════════════
      boxShadow: {
        "hard": "4px 4px 0px var(--primary)",
        "hard-sm": "2px 2px 0px var(--primary)",
        "hard-white": "4px 4px 0px #FFFFFF",
        "hard-white-sm": "2px 2px 0px #FFFFFF",
        "glow": "0 0 20px var(--primary-glow)",
        "glow-lg": "0 0 40px var(--primary-glow)",
      },

      // ═══════════════════════════════════════════════════
      // ⚡ Animations
      // ═══════════════════════════════════════════════════
      animation: {
        "fade-up": "fade-up 0.5s ease-out forwards",
        "fade-in": "fade-in 0.3s ease-out forwards",
        "slide-in": "slide-in-right 0.4s ease-out forwards",
        "slide-up": "slide-up 0.4s ease-out forwards",
        "slash-in": "slash-in 0.4s ease-out forwards",
        "blade-flash": "blade-flash 0.3s ease-out",
        "float": "float 6s ease-in-out infinite",
        "marquee": "marquee 30s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "spin-slow": "spin 3s linear infinite",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(100%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slash-in": {
          "0%": { opacity: "0", clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
          "100%": { opacity: "1", clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
        },
        "blade-flash": {
          "0%": { opacity: "0", transform: "translateX(-100%) rotate(-45deg)" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0", transform: "translateX(100%) rotate(-45deg)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "marquee": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px var(--primary-glow)" },
          "50%": { boxShadow: "0 0 40px var(--primary-glow)" },
        },
      },

      // ═══════════════════════════════════════════════════
      // 📐 Spacing & Layout
      // ═══════════════════════════════════════════════════
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },

      // ═══════════════════════════════════════════════════
      // 🔲 Border Radius
      // ═══════════════════════════════════════════════════
      borderRadius: {
        "cut": "0", // For katana-cut style (use clip-path instead)
      },

      // ═══════════════════════════════════════════════════
      // 🖼️ Background
      // ═══════════════════════════════════════════════════
      backgroundImage: {
        "grid-pattern": `linear-gradient(rgba(51, 65, 85, 0.08) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(51, 65, 85, 0.08) 1px, transparent 1px)`,
        "sunset-gradient": `radial-gradient(ellipse at 50% 0%, rgba(251, 146, 60, 0.15) 0%, transparent 50%),
                           radial-gradient(ellipse at 80% 20%, rgba(56, 189, 248, 0.08) 0%, transparent 40%)`,
        "ronin-sun": "linear-gradient(180deg, #FB923C 0%, #F43F5E 100%)",
      },
      backgroundSize: {
        "grid": "40px 40px",
      },
    },
  },
  plugins: [],
};

export default config;
