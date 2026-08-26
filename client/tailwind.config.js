/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#FAFAF9',
          'bg-secondary': '#F5F5F3',
          card: '#FFFFFF',
          text: '#111111',
          muted: '#5F6368',
          border: '#E7E7E5',
          blue: '#2563EB',
          'blue-hover': '#1D4ED8',
          'dark-bg': '#0A0A0A',
          'dark-card': '#141414',
          'dark-text': '#F5F5F5',
          'dark-muted': '#9E9E9E',
          'dark-border': '#262626',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'Manrope', 'sans-serif'],
        serif: ['var(--font-dm-serif)', 'DM Serif Display', 'serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.03em',
        widest: '0.1em',
      },
      boxShadow: {
        'glow-sm': '0 0 20px -5px rgba(59, 130, 246, 0.3)',
        'glow-md': '0 0 30px -5px rgba(99, 102, 241, 0.35)',
        'glow-lg': '0 0 45px -5px rgba(99, 102, 241, 0.45)',
        'glass-light': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
    },
  },
  plugins: [],
}

