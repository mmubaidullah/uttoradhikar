/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'bengali': ['"Hind Siliguri"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}