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
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        canvas: '#EDEAE3',
        ink: '#1C1917',
        muted: '#78716C',
        border: '#E2DDD6',
        phase1: '#C17F3E',
        phase2: '#B5533C',
        phase3: '#4A5F6E',
      },
    },
  },
  plugins: [],
};
export default config;
