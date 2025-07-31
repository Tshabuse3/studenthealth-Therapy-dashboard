/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',      // for Next.js 13+ app directory
    './components/**/*.{js,ts,jsx,tsx}', // your components folder
    './pages/**/*.{js,ts,jsx,tsx}',     // if you have pages folder
  ],
  darkMode: 'class', // enable dark mode via 'class'
  theme: {
    extend: {},
  },
  plugins: [],
};
