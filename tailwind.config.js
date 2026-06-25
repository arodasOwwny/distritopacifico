const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors:{
        primary:"#ffffff",
        secondary:"#000000",
        third:"#dddddd",
        four:"#eeeeee",
        azul: "#214f81",
        celeste: "#8ccfd8",
        verdeazul: "#59bdb5",
        gris: "#bebcbd",
      },
      fontFamily: {
        sans: ['"Inter var"', ...defaultTheme.fontFamily.sans],
        raleway: ['"Raleway"', ...defaultTheme.fontFamily.sans],
        abrilFat: ['"Abril Fat"', ...defaultTheme.fontFamily.sans],
        sage: ['"Sage"', 'serif'],
        montserrat: ['"Montserrat"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
