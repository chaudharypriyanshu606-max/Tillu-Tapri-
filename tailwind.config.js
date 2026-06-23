/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FF6B00',
          'orange-light': '#FF8C38',
          'orange-dark': '#E05A00',
          bg: '#0D0D0D',
          card: '#1A1A1A',
          'card-hover': '#222222',
          border: '#2A2A2A',
          text: '#F5F5F5',
          muted: '#9CA3AF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'orange-gradient': 'linear-gradient(135deg, #FF6B00 0%, #FF8C38 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0D0D0D 0%, #1A1A1A 100%)',
        'hero-gradient': 'linear-gradient(135deg, rgba(13,13,13,0.95) 0%, rgba(26,26,26,0.8) 50%, rgba(255,107,0,0.15) 100%)',
      },
      boxShadow: {
        'orange': '0 0 20px rgba(255, 107, 0, 0.3)',
        'orange-lg': '0 0 40px rgba(255, 107, 0, 0.4)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.6)',
      },
    },
  },
  plugins: [],
}
