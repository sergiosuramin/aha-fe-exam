import type { Config } from 'tailwindcss'

const config: Config = {
  prefix: 'tw-',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'b16-light': '0px 0px 16px rgba(0, 0, 0, 0.1);', // gray border
        'b16-dark': '0px 0px 16px rgba(255, 255, 255, 0.1);', // white border
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '16/9': '16 / 9',
      },
      fontSize: {
        sm: '0.8rem',
        base: '1rem',
      },
      colors: {
        primary: {
          100: '#fdd0a1',
          200: '#fdc890', // hover (lighter)
          300: '#fdbb75', // hover
          400: '#ffad57', // pressed
          500: '#FF9B33', // default state
        },
        light: {
          500: '#F3F8FB',
        },
        secondary: {
          500: '#FFD05D',
        },
        success: {
          500: '#23AA01',
        },
        warning: {
          500: '#EBCC61',
        },
        danger: {
          300: '#FA7F7F',
          500: '#EB5757',
        },
        info: {
          500: '#23AA01',
        },
        gray: {
          100: '#D9D9D9',
          200: '#F3F6F9', // disabled button
          300: '#B5B5C4', // disabled text
          400: '#9FA1A7', // placeholder text
          500: '#7D7D83', // table header
        },
        black: {
          300: '#494E53',
          400: '#393939', // page title
          500: '#000000', // siedebar text
        },
        lightgreen: {
          500: '#A4A537',
        },
        white: '#fff',
        default: '#3F4355', // default color text
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
      '2xl': '1536px',
    },
  },
  plugins: [],
}
export default config
