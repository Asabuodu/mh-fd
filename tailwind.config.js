/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}

// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',  // Include all JS, JSX, TS, TSX files inside the 'src' folder
    './public/index.html',         // Include the HTML file if it's in the public folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
