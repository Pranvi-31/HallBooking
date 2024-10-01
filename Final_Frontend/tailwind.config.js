export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#1a1a1a',
        secondary: '#2e2e60',
        accent: '#8e44ad',
        neutral: '#3d4451',
        info: '#2094f3', 
        success: '#009485', 
        warning: '#ff9900',
        error: '#ff5724', 
      },
      gradientColorStops: theme => ({
        'primary-gradient': [theme('colors.primary'), theme('colors.secondary')],
      }),
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#1a1a1a",
          "secondary": "#2e2e60",
          "accent": "#8e44ad",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
          "info": "#2094f3",
          "success": "#009485",
          "warning": "#ff9900",
          "error": "#ff5724",
        },
      },
    ],
  },
};
