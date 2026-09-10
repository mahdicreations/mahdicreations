/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './dist/**/*.html',
    './src/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#c9960c',
          light: '#f0d080',
          mid: '#b8860b',
          deep: '#8b6914',
          accent: '#d4a017',
        },
        dark: {
          DEFAULT: '#0a0a0a',
          section: '#111111',
          card: '#181818',
        },
        cream: '#f8f6f1',
        'border-gold': 'rgba(201, 150, 12, 0.2)',
        'border-dark': 'rgba(255, 255, 255, 0.06)',
        text: {
          white: '#f5f4f0',
          muted: '#a09880',
          dark: '#1a1a1a',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #f0d080 0%, #c9960c 35%, #b8860b 65%, #8b6914 100%)',
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
