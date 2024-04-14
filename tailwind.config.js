const colors = require('tailwindcss/colors');
colors['rose']['500'] = '#e53834';
colors['rose']['700'] = '#ce231d';

module.exports = {
  purge: [
    './*.html',
    './*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'sm': '340px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1024px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1024px',
      // => @media (min-width: 1536px) { ... }
    },
    colors: {
      gray: colors.coolGray,
      blue: colors.lightBlue,
      red: colors.rose,
      pink: colors.fuchsia,
      white: colors.white,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
