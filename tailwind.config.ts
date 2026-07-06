import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1240px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // ── Debt Angel brand palette ──────────────────────────────
        // Gold — accents, CTAs, highlights
        gold: {
          DEFAULT: "#D4AF37",
          deep: "#C9A227",
          soft: "#F3E7BE",
          muted: "#8A7220",
        },
        // Money Green — positive numbers, progress, success
        money: {
          DEFAULT: "#00A86B",
          deep: "#0D8A5C",
          soft: "#D6F3E6",
          muted: "#0A6B47",
        },
        // Black / Deep Charcoal — backgrounds, text
        ink: {
          DEFAULT: "#0A0A0A",
          900: "#0A0A0A",
          800: "#111111",
          700: "#1A1A1A",
          600: "#242424",
        },
        // Supporting neutrals
        cloud: {
          DEFAULT: "#FAFAF7",
          100: "#F4F3EE",
          200: "#E9E7DF",
        },
        slate: {
          ink: "#2B2B2E",
        },
      },
      borderRadius: {
        xl: "calc(var(--radius) + 6px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "serif"],
      },
      backgroundImage: {
        "gold-sheen":
          "linear-gradient(135deg, #F3E7BE 0%, #D4AF37 45%, #C9A227 100%)",
        "money-sheen":
          "linear-gradient(135deg, #00A86B 0%, #0D8A5C 100%)",
        "ink-fade":
          "linear-gradient(180deg, #0A0A0A 0%, #111111 60%, #1A1A1A 100%)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "grow-bar": {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "grow-bar": "grow-bar 0.9s cubic-bezier(0.16,1,0.3,1) forwards",
        shimmer: "shimmer 6s linear infinite",
      },
      boxShadow: {
        soft: "0 2px 8px -2px rgba(10,10,10,0.06), 0 12px 32px -8px rgba(10,10,10,0.10)",
        lift: "0 8px 24px -6px rgba(10,10,10,0.12), 0 24px 48px -12px rgba(10,10,10,0.16)",
        gold: "0 8px 30px -6px rgba(212,175,55,0.35)",
        money: "0 8px 30px -6px rgba(0,168,107,0.30)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
