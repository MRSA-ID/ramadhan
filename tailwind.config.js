/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        WorkSans: ['"Work Sans"', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        blob: "blob 7s infinite",
        floats: "float 4s linear infinite",
        borderAnim: "border_anim 4s linear infinite",
        leftToRight: "rightAnimate 2.5s cubic-bezier(0.42,0,0.58,1) ",
        irishTracking: "irishMove 4s linear infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.7)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
        float: {
          "50%": {
            transform: "translateY(5px)",
          },
        },
        rightAnimate: {
          "0%": {
            transform: "translateX(-3.5rem)",
            opacity: 0,
          },
          "100%": {
            transform: "translateX(0)",
            opacity: 1,
          },
        },
        irishMove: {
          "0%": {
            transform: "rotate(360deg)",
          },
          "25%": {
            transform: "rotate(268deg)",
          },
          "50%": {
            transform: "rotate(185deg)",
          },
          "75%": {
            transform: "rotate(268deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
      },
    },
  },
  plugins: [],
};
