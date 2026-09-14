import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ground: "#1E2420",
        paper: "#EFE6D8",
        ink: "#22261F",
        mist: "#B9C2B7",
        brass: "#B98B3E",
        brassDark: "#8F6B2E",
        brick: "#B5493D",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      maxWidth: {
        prose: "38rem",
      },
    },
  },
  plugins: [],
};

export default config;
