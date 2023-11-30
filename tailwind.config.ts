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
      aspectRatio: {
        '4/3': '4 / 3',
        '16/9': '16 / 9',
      },
      boxShadow: {
        'invert-xl': '0 8px 10px -8px rgb(255 255 255 / 0.1)',
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
          100: '#F3F6F9',
          200: '#D9D9D9', // disabled button
          300: '#B2B2B2', // disabled text
          400: '#9FA1A7', // placeholder text
          500: '#7D7D83',
        },
        black: {
          200: '#494E53',
          300: '#393939',
          400: '#181818',
          500: '#000000',
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
