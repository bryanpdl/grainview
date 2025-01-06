import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light: {
          bg: "#FAFAFA",
          text: "#121212",
          accent: "#2D2D2D",
        },
        dark: {
          bg: "#121212",
          text: "#FAFAFA",
          accent: "#E0E0E0",
        }
      },
      fontFamily: {
        sans: ["var(--font-didact-gothic)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display": ["clamp(2.5rem, 8vw, 5rem)", { lineHeight: "1.1" }],
        "title": ["clamp(1.5rem, 4vw, 2.5rem)", { lineHeight: "1.2" }],
      },
    },
  },
  plugins: [],
} satisfies Config;
