/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'pretendard': ['Pretendard', 'sans-serif'],
        'nanum-square': ['NanumSquareRound', 'sans-serif'],
      },
      colors: {
        background: '#F8F9FC',
        text: '#333333',
        primary: '#4A90E2',
        secondary: '#F5F9FF',
        accent: '#FFD43B',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
} 