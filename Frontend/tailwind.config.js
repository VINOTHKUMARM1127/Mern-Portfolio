/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { colors: { ink: "rgb(var(--theme-ink) / <alpha-value>)", surface: "rgb(var(--theme-surface) / <alpha-value>)", panel: "rgb(var(--theme-panel) / <alpha-value>)" } },
  },
  plugins: [],
}