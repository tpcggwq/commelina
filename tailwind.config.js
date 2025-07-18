/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        coral: {
          500: '#ff6b6b',
        },
        sky: {
          25: '#f8fafc',
        },
        teal: {
          25: '#f0fdfa',
          50: '#f0fdfa',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-enhanced': 'float-enhanced 6s ease-in-out infinite',
        'wave': 'wave 4s ease-in-out infinite',
        'wave-enhanced': 'wave-enhanced 4s ease-in-out infinite',
        'fadeIn': 'fadeIn 0.5s ease-out',
        'fadeInUp': 'fadeInUp 0.8s ease-out',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'text-glow': 'text-glow 4s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        'float-enhanced': {
          '0%, 100%': {
            transform: 'translateY(0px) rotate(0deg)',
          },
          '33%': {
            transform: 'translateY(-15px) rotate(2deg)',
          },
          '66%': {
            transform: 'translateY(-25px) rotate(-2deg)',
          },
        },
        'wave-enhanced': {
          '0%, 100%': {
            transform: 'translateX(0) scaleY(1)',
          },
          '25%': {
            transform: 'translateX(-15px) scaleY(1.1)',
          },
          '50%': {
            transform: 'translateX(-30px) scaleY(0.9)',
          },
          '75%': {
            transform: 'translateX(-15px) scaleY(1.1)',
          },
        },
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(20, 184, 166, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(20, 184, 166, 0.6)',
          },
        },
        'text-glow': {
          '0%, 100%': {
            textShadow: '0 0 20px rgba(20, 184, 166, 0.3)',
          },
          '50%': {
            textShadow: '0 0 40px rgba(20, 184, 166, 0.6)',
          },
        },
        'shimmer': {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
      },
      perspective: {
        '1000': '1000px',
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
    },
  },
  plugins: [],
};