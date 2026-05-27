import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './contexts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#FAFAF8',
        beige: '#F2EDE4',
        sand: '#E5DDD3',
        'warm-gray': {
          100: '#F5F0EB',
          200: '#E8E2D9',
          300: '#D4CBC0',
          400: '#B8ADA5',
          500: '#9A8E87',
          600: '#7A706A',
          700: '#5C534E',
          800: '#3D3733',
          900: '#1C1C1A',
        },
        gold: {
          light: '#E8D5A8',
          DEFAULT: '#C9A870',
          dark: '#A8874E',
        },
        'soft-black': '#1C1C1A',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'DM Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.7s ease-out forwards',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'fade-in-slow': 'fadeIn 1.4s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      aspectRatio: {
        artwork: '3/4',
      },
    },
  },
  plugins: [],
}

export default config
