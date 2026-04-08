/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gycora: '#059669', // Emerald 600
        'gycora-dark': '#047857',
        'gycora-light': '#D1FAE5',
      }
    },
  },
  plugins: [],
}