import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: "#e6e6e6",
        darkGray: "#c0c0c0",
        red: "#fa3f49",
        textGray: "#888888",
        grayInput: "#d7d7d7",
        lightGray: "#2e333d",
        grayBg: "#202329",
        black: "#131313",
        blue: "#6b8afd",
      },
    },
  },
  plugins: [],
};
export default config;
