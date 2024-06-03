/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#2c455a',
        customRed:'#b50f0f',
        'brown': {
          200: '#4d4038',
          300: '#2a221e',
          400: '#1a150f',
        },
      },
    },
  },
  plugins: [],
}