/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B2635',
          dark: '#6B1D29',
          light: '#A63848',
        },
        secondary: '#D4A574',
        accent: '#2C5F2D',
        cream: '#FDF8F3',
        'warm-white': '#FFFCF9',
        charcoal: '#2D2D2D',
        'warm-gray': '#6B6B6B',
        'light-gray': '#E8E4E0',
      },
      fontFamily: {
        'serif-tc': ['Noto Serif TC', 'serif'],
        'sans-tc': ['Noto Sans TC', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-meat': 'linear-gradient(135deg, #8B2635 0%, #A63848 50%, #8B2635 100%)',
        'gradient-gold': 'linear-gradient(135deg, #D4A574 0%, #E8C99B 50%, #D4A574 100%)',
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0,0,0,0.06)',
        'card-hover': '0 20px 50px rgba(0,0,0,0.12)',
        'header': '0 4px 30px rgba(139, 38, 53, 0.3)',
      },
      animation: {
        'pulse-dot': 'pulse-dot 2s infinite',
      },
      keyframes: {
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
}
