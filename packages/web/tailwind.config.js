const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./public/*.html"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'grdark': `
          linear-gradient(
            to right bottom,
            #722872,
            #5c2f6c,
            #493163,
            #3a3157,
            #2f2f48,
            #2b2c3f,
            #272835,
            #24252c,
            #212228,
            #1e1e24,
            #1b1b20,
            #18181c
          )
        `,
        'grlight': `
          linear-gradient(
            to right bottom,
            #722872,
            #7c4c8c,
            #876ca3,
            #968bb7,
            #aaa9c7,
            #b8b8cf,
            #c7c8d7,
            #d6d7df,
            #dcdde4,
            #e1e2e8,
            #e7e8ed,
            #edeef2
          )
        `,
      },
      colors: {
        primary: {
          light: colors.purple[400],
          DEFAULT: colors.purple[600],
          dark: colors.purple[800]
        },
        secondary: {
          light: colors.gray[100],
          DEFAULT: colors.gray[300],
          dark: colors.gray[500]
        },
        success: {
          light: colors.green[300],
          DEFAULT: colors.green[500],
          dark: colors.green[700]
        },
        danger: {
          light: colors.red[300],
          DEFAULT: colors.red[500],
          dark: colors.red[700]
        },
        warning: {
          light: colors.yellow[300],
          DEFAULT: colors.yellow[500],
          dark: colors.yellow[700]
        },
        info: {
          light: colors.blue[300],
          DEFAULT: colors.blue[500],
          dark: colors.blue[700]
        }
      }
    }
  },
  plugins: [],
}
