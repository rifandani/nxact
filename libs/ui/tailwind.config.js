const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');
const { fontFamily } = require('tailwindcss/defaultTheme');
const { blue, pink, red, yellow, green } = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: blue[500],
          light: blue[300],
          lighter: blue[100],
          dark: blue[700],
          darker: blue[900],
        },
        secondary: {
          DEFAULT: pink[500],
          light: pink[300],
          lighter: pink[100],
          dark: pink[700],
          darker: pink[900],
        },
        error: {
          DEFAULT: red[500],
          light: red[300],
          lighter: red[100],
          dark: red[700],
          darker: red[900],
        },
        warning: {
          DEFAULT: yellow[500],
          light: yellow[300],
          lighter: yellow[100],
          dark: yellow[700],
          darker: yellow[900],
        },
        info: {
          DEFAULT: blue[500],
          light: blue[300],
          lighter: blue[100],
          dark: blue[700],
          darker: blue[900],
        },
        success: {
          DEFAULT: green[500],
          light: green[300],
          lighter: green[100],
          dark: green[700],
          darker: green[900],
        },
      },
      fontFamily: {
        sans: ['Noto Sans JP', ...fontFamily.sans],
        montserrat: ['Montserrat'],
      },
      screens: {
        xl: '1280px',
        '2xl': '2560px',
        '3xl': '4500px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [],
};
