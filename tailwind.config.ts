import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        manga: ["'Noto Sans JP'", "sans-serif"],
      },
      colors: {
        manga: {
          red: "#E53E3E",
          dark: "#1a1a1a",
          panel: "#FAFAFA",
          border: "#111111",
        },
      },
    },
  },
  plugins: [],
};

export default config;
