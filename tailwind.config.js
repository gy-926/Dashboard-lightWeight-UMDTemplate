/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  important: '.kivii-demo-lib-wrapper',
  corePlugins: {
    preflight: false,
  },
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}
