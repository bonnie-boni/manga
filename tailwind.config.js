/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0A1B33",
          light: "#132A4F",
          dark: "#050D1A",
        },
        graytone: {
          50: "#F5F6F8",
          100: "#E9EBEF",
          200: "#D4D8DF",
          300: "#B0B6C1",
          400: "#8891A0",
          500: "#5C6577",
          600: "#3E4658",
          700: "#2A3142",
        },
      },
    },
  },
  plugins: [],
};
