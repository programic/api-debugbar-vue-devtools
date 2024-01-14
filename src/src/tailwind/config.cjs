const screens = require('./screens.json');
const svgToDataUri = require('mini-svg-data-uri');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './main.ts',
    './App.vue'
  ],
  theme: {
    fontFamily: {
      sans: 'Inter',
      serif: 'Inter',
      mono: 'Inter',
    },
    colors: {
      current: 'currentColor',
      transparent: 'transparent',
      primary: 'var(--color-primary)',
      'primary-active': 'var(--color-primary-active)',
      secondary: 'var(--color-secondary)',
      'secondary-active': 'var(--color-secondary-active)',
      black: {
        black: '#000000',
        DEFAULT: '#1E1E1E',
        50: '#FCFCFD',
        100: '#202020',
      },
      white: '#FFFFFF',
      error: '#dc2626',
      zinc: {
        50:  '#FAFAFA',
        100: '#F4F4F5',
        200: '#E4E4E7',
        300: '#D4D4D8',
        400: '#A1A1AA',
        500: '#71717A',
        600: '#52525B',
        700: '#3F3F46',
        800: '#27272A',
        900: '#18181B',
      },
      yellow: {
        50:  '#fefce8',
        100: '#fef9c3',
        200: '#fef08a',
        300: '#fde047',
        400: '#facc15',
        500: '#eab308',
        600: '#ca8a04',
        700: '#a16207',
        800: '#854d0e',
        900: '#713f12',
      },
      red: {
        50:  '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d',
      },
      green: {
        50:  '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
        800: '#166534',
        900: '#14532d',
      },
      indigo: {
        200: '#C7D2FE',
        600: '#4F46E5',
        900: '#162C87',
      },
      lime: {
        200: '#D9F99D',
        600: '#65A30D',
      },
      orange: {
        200: '#FED7AA',
        500: '#E25C2A',
      },
      sky: {
        200: '#BAE6FD',
        600: '#0284C7',
      },
      teal: {
        200: '#99F6E4',
        600: '#0D9488',
      },
      violet: {
        200: '#DDD6FE',
        600: '#7C3AED',
      },
      blue: {
        200: '#BFDBFE',
        600: '#2563EB',
      },
      gold: {
        200: '#FDE68A',
        600: '#D97706',
      },
      pink: {
        200: '#FBCFE8',
        600: '#DB2777',
      },
    },
    screens,
    extend: {
      fontSize: {
        'sm': ['0.875rem', {
          lineHeight: '1.375rem',
        }],
      },
      spacing: {
        '4.5': '1.2rem',
        18: '4.5rem',
        110: '27.5rem',
        141: '34.375rem',
      },
      height: {
        18: '4.5rem',
      },
      width: {
        110: '27.5rem',
        141: '34.375rem',
      },
      borderWidth: {
        '4.5': '1.2rem',
        10: '10px',
      },
      scale: {
        flip: '-1',
      },
      strokeWidth: {
        3: '3px',
        4: '4px',
      },
      dropShadow: {
        card: '0px 4px 2px rgba(21, 21, 21, 0.08)',
        cardhighlight: '1px 4px 3px rgba(21, 21, 21, 0.16)',
      },
      transitionProperty: {
        'font': 'font-weight, font-size, line-height',
      },
      zIndex: {
        '100': 100,
      },
      backgroundImage: (theme) => ({
        'multiselect-caret': `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>`,
        )}")`,
        'multiselect-spinner': `url("${svgToDataUri(
          `<svg viewBox="0 0 512 512" fill="${theme('primaryColor')}" xmlns="http://www.w3.org/2000/svg"><path d="M456.433 371.72l-27.79-16.045c-7.192-4.152-10.052-13.136-6.487-20.636 25.82-54.328 23.566-118.602-6.768-171.03-30.265-52.529-84.802-86.621-144.76-91.424C262.35 71.922 256 64.953 256 56.649V24.56c0-9.31 7.916-16.609 17.204-15.96 81.795 5.717 156.412 51.902 197.611 123.408 41.301 71.385 43.99 159.096 8.042 232.792-4.082 8.369-14.361 11.575-22.424 6.92z"></path></svg>`,
        )}")`,
        'multiselect-remove': `url("${svgToDataUri(
          `<svg viewBox="0 0 320 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"></path></svg>`,
        )}")`,
        'nature': "url('/images/nature.svg')",
      }),
    },
  },
  plugins: [],
}
