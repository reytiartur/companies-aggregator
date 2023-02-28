/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#28a175',
        secondary: '#175e44',
        hover: '#118057',
        inactive: '#81b5a2',
        background: '#f2f5f3'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/line-clamp')
  ],
  safelist: [
    {
      pattern: /(bg|text|border)-./,
      variants: ['hover', 'focus',],
    }
  ]
}
