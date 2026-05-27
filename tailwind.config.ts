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
        // Cream / Background tones
        cream: '#FAF5EE',
        'cream-light': '#FDFAF4',
        'cream-dark': '#F5EDE0',

        // Rose / Pink tones
        rose: {
          50: '#FDF4F2',
          100: '#FBE9E5',
          200: '#F5D5CD',
          300: '#EDB8AC',
          400: '#E0978A',
          500: '#D4A5A5',
          600: '#C08585',
        },

        // Burgundy / Wine (footer & accents)
        wine: {
          DEFAULT: '#7D4858',
          light: '#9E5E70',
          dark: '#5D3340',
          deep: '#4A2935',
        },

        // Text
        ink: {
          DEFAULT: '#5D3A45',
          light: '#8B6B73',
          soft: '#B89BA3',
        },

        // Legacy aliases (per compatibilità con codice esistente)
        ivory: '#FAF5EE',
        beige: '#FBE9E5',
        sand: '#F5D5CD',
        'warm-gray': {
          100: '#FBE9E5',
          200: '#F5D5CD',
          300: '#EDB8AC',
          400: '#B89BA3',
          500: '#8B6B73',
          600: '#7D4858',
          700: '#5D3340',
          800: '#5D3A45',
          900: '#4A2935',
        },
        gold: {
          light: '#F5D5CD',
          DEFAULT: '#D4A5A5',
          dark: '#7D4858',
        },
        'soft-black': '#5D3A45',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'DM Sans', 'system-ui', 'sans-serif'],
        script: ['"Dancing Script"', 'cursive'],
      },
      animation: {
        'fade-in': 'fadeIn 0.7s ease-out forwards',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'fade-in-slow': 'fadeIn 1.4s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
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
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
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
