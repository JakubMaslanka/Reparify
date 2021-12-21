const colors = require('tailwindcss/colors');

module.exports = {
  important: true,
  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    safelist: [
      'text-center',
      'flex-row',
      'flex-col'
    ]
  },
  darkMode: false,
  theme: {
    colors: {
      transparent: 'transparent',
      'white': {
        500: '#FFFFFF',
        600: '#F2F3F5',
        700: '#E3E5E8',
        ...colors.white
      },
      'gray': {
        400: '#72767D',
        500: '#696D73',
        600: '#444850',
        700: '#36393F',
        800: '#2F3136',
        900: '#202225',
        ...colors.trueGray
      },
      'greenish': {
        'light': '#4FDC7C',
        'dark': '#3BA55D'
      },
      'berry': {
        'light': '#949CF7',
        'darker': '#5865F2',
        'dark': '#444DBB'
      },
      'sky': {
        'light': '#00D8F9',
        'dark': '#11A4C5'
      },
      'orange': '#FAA81A',
      'danger': {
        'light': '#ED4245',
        'dark': '#B20000'
      },
      black: colors.black,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      'facebook': {
        'main': '#395693',
        'light': '#4A70C1'
      },
      'google': {
        'main': '#D24736',
        'light': '#F8533F'
      },
    },
    container: {
      center: true,
    },
    fontFamily: {
      Rubik: ['Rubik', 'sans-serif'],
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      backgroundColor: ['disabled', 'checked'],
      cursor: ['disabled'],
      borderColor: ['checked'],
      inset: ['checked'],
      zIndex: ['hover', 'active'],
    },
  },
  plugins: [],
  future: {
    purgeLayersByDefault: true,
  },
};