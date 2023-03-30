/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ['class'],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'lgx': '1151px',
      'sxl' : '1200px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
         colors: {
        'darkBg' :'#111827',
        'lightBg' : '#f5f5f5',
        'ctaHoverDark' : '#1A56DB',
        'ctaButtonDark' : '#2962FF',
        'ctaButtonLight' : '#121212',
        'ctaHoverLight' : '#2f3135',
        'lightPurpleGradiant' : '#B949F5',
        'lightBlueGradiant' : '#3A9FF0',
        'darkBlueGradiant' : '#78CFF6',
        'darkPurpleGradinat' : '#C389FA',
        'darkCard' : '#121212'
      }
    },
  },
  plugins: [],
};

module.exports = config;
