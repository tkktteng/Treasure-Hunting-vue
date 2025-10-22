/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        treasure: {
          gold: '#D4AF37',
          brown: '#8B4513',
          sand: '#F4A460',
          sea: '#1E90FF',
          dark: '#2C3E50'
        }
      },
      fontFamily: {
        adventure: ['"Pirata One"', 'cursive', 'sans-serif']
      }
    },
  },
  plugins: [],
}