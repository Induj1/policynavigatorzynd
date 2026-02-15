/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'Noto Sans Devanagari', 'system-ui', 'sans-serif'],
        devanagari: ['Noto Sans Devanagari', 'Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        saffron: { DEFAULT: '#F59E0B', light: '#FCD34D', dark: '#D97706' },
        india: {
          saffron: '#FF9933',
          white: '#FFFFFF',
          green: '#138808',
          blue: '#000080',
        },
        warm: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
        },
        earth: { 50: '#F0FDF4', 100: '#DCFCE7', 200: '#BBF7D0', 400: '#4ADE80', 600: '#16A34A', 700: '#15803D' },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'float': 'float 4s ease-in-out infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
      },
      backgroundImage: {
        'hero-pattern': 'radial-gradient(circle at 20% 80%, rgba(251, 191, 36, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.06) 0%, transparent 50%)',
        'warm-gradient': 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 30%, #F0FDF4 70%, #ECFDF5 100%)',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.06), 0 2px 8px -2px rgba(0, 0, 0, 0.04)',
        'warm': '0 10px 40px -10px rgba(245, 158, 11, 0.15)',
        'card-hover': '0 20px 40px -15px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}
