/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#040711',
          900: '#060913',
          850: '#0a0f1d',
          800: '#10172a',
          700: '#1a233a',
          600: '#253252',
        },
        gold: {
          300: '#fbe8a6',
          400: '#f3c649',
          500: '#d4af37',
          600: '#c59b27',
          700: '#a37e19',
        },
        flame: {
          400: '#ff8555',
          500: '#ff6b35',
          600: '#f95738',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['Syne', 'Plus Jakarta Sans', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'gold-glow': 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, rgba(6, 9, 19, 0) 70%)',
        'flame-glow': 'radial-gradient(circle, rgba(255, 107, 53, 0.12) 0%, rgba(6, 9, 19, 0) 70%)',
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(212, 175, 55, 0.25)',
        'flame-glow': '0 0 25px -5px rgba(255, 107, 53, 0.3)',
        'card-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
