/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'primary': '#1981ff',
        'secondary': '#ffffff',
        // 'base': '#1e1e1f',
        'base': '#000000',
        'extras': '#2b2b2b',
      }
    },
  },
  plugins: [],
}