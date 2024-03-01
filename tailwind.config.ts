import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'primary': '#1976d2',
        'primary-hover': '#2953c1',
        'primary-active': '#2449aa',
        'secondary': '#FFFFFF'
      }
      },
      screens: {
          '2lg': '1100px',
          ...defaultTheme.screens
      }
  },
  plugins: [],
};
export default config;
