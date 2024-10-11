/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    {
      pattern: /col-span-(\d+)/,
    },
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(255, 255, 255, 1)',
        logo: [
          '0 0 35px -15px rgba(255, 255, 255, 1)',
          '0 0 70px -15px rgba(255, 255, 255, 1)',
          '0 0 150px -15px rgba(255, 255, 255, 1)',
          '0 0 300px -15px rgba(255, 255, 255, 1)',
        ],
      },
      colors: {
        background: '#000000', // black background
        primary: '#00FF00', // green as the primary text color

        'red-title': '#FF0000', // red as an alternative text color
        transparent: 'transparent',
        'bj-white': '#faf7ff',
        'bj-blue': '#1c3ba9',
        'bj-blue-dark': '#000564',
        'bj-blue-light': '#cec9ff',
        'bj-blue-mid': '#7b7ef8',
        'bj-green-light': '#6cbaa2',
        'bj-green-mid': '#068488',
        'bj-green-dark': '#324b4c',
        'bj-red': '#9c001b',
        'bj-red-dark': '#743700',
      },
      dropShadow: {
        logo: [
          '0 0 35px rgba(255, 255, 255, 1)',
          '0 0 70px rgba(255, 255, 255, 1)',
          '0 0 150px rgba(255, 255, 255, 1)',
        ],
      },
      fontFamily: {
        fredericka: ['fredericka', 'sans-serif'],
      },
      fontSize: {
        lyric: '4rem',
        countin: '10rem',
      },
    },
  },
  plugins: [],
};
