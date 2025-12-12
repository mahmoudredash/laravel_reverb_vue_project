/** @type {import('tailwindcss').Config} */
export default {
  // Update 'purge' to 'content' and define your source files
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  // Change 'darkMode' to 'media'
  darkMode: 'media', // or remove this line entirely if 'media' is your default
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}