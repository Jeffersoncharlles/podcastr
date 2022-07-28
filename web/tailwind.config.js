module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extends: {
      colors: {
        gray: {
          50: '#f7f8fa',
          100: '#E6E8EB',
          200: '#AFB2B1',
          500: '#808080',
          800: '#494D4B'
        },
        green: {
          500: '#04D361'
        },
        purple: {
          300: '#9F75FF',
          400: '#9164FA',
          500: '#8257E5',
          800: '#6F48C9'
        }
      },
    },
    fontFamily: {
      'sans': ['Inter', 'system-ui', 'sans-serif'],
      'display': ['Lexend', 'Oswald', 'sans-serif'],
    },
    plugins: [],
  }
}