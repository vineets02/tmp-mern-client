/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: { brand: { yellow: "#FFD54A" } },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['Inter','ui-sans-serif','system-ui']
      }
    },
  },
  plugins: [],
}
