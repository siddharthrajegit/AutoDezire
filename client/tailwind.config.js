/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        dark: {
          bg: '#0b0f19',
          card: '#111827',
          cardBorder: '#1f2937',
          cardHover: '#1e293b',
          subtext: '#9ca3af'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-orange': '0 0 25px -5px rgba(249, 115, 22, 0.3)',
        'glow-green': '0 0 25px -5px rgba(34, 197, 94, 0.3)',
        'card-subtle': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'card-dark': '0 4px 25px -2px rgba(0, 0, 0, 0.4)'
      }
    },
  },
  plugins: [],
}
