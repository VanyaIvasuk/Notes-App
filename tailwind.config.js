/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      'sm': {'min': '424px', 'max': '768px'},
      'md': {'min': '768px', 'max': '1024px'},
      'lg': {'min': '1024px'},
      'xl': {'min': '1440px'}, 

    },
  },
  plugins: [],
}

