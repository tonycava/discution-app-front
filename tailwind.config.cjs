/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{svelte,js,ts}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      keyframes: {
        scaleZeroToOne: {
          '0%': {transform: 'scale(0)'},
          '100%': {transform: 'scale(1)'}
        },
        scaleOneToZero: {
          '0%': {transform: 'scale(1)'},
          '100%': {transform: 'scale(0)'}
        },
        dotFadeOut: {
          '0%': {transform: 'translate(0, 0)'},
          '100%': {transform: 'translate(24px, 0)'},
        },
      },
      animation: {
        scaleZeroToOne: 'scaleZeroToOne 0.6s infinite',
        scaleOneToZero: 'scaleOneToZero 0.6s infinite',
        dotFadeOut: 'dotFadeOut 0.6s infinite',
      },
    },
  },
  plugins: [],
};