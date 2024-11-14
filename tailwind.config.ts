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
            screens: {
                '3xl': '1650px',
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                'primary': '#1A1A1A',
                'primary-hover': '#333333',
                'primary-active': '#444444',
                'secondary': '#FFFFFF',
                'back-color': '#C4C4C480',
                'back-color-1': '#F0EFEF',
                'back-color-1-transparent': '#F0EFEF80',
                'back-color-1-header': '#F0EFEFF6',
                'light-01': '#F8F7F7',
                'light-03': '#DFDFDF',
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
