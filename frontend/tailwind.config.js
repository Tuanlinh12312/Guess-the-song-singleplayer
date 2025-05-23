const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '2px 2px 4px var(--tw-shadow-color)',
        lg: '8px 8px 16px var(--tw-shadow-color)',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
}
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        coiny: ['Coiny', 'cursive'],
        Roboto: ['Roboto', 'cursive'],
        EBGaramond: ['EB Garamond', 'cursive'],
        darumadrop: ['Darumadrop One', 'cursive'],
        metal: ['Metal Mania', 'cursive'],
      },
    },
  },
  plugins: [],
}

