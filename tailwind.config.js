import scrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors:{
        primaria: '#22c55e',
        secundaria: '#16a34a',
      },
    },
  },
  plugins: [
    scrollbar,
  ],
}

