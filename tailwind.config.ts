import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: "#e6e6e6",
        darkGray: "#c0c0c0",
        red: "#fa3f49",
        textGray: "#888888",
        grayInput: "#d7d7d7",
        grayBg: "#eeeeee",
        black: "#15161a",
      },
    },
  },
  plugins: [],
};
export default config;
