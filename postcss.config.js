module.exports = {
  plugins: [require("tailwindcss"), require("autoprefixer")],
  theme: {
    boxShadow: {
      outline: '0 0 8px 0 rgba(0,0,0,.16)'
    },
    inset: {
      '0': 0,
      auto: 'auto',
      '1/2': '50%',
      '44': '44px'
    },
    extend: {
      strokeWidth: {
        '3': '3',
        '4': '4',
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" }
        },
        rotate: {
          "100%": { transform: "rotate(360deg)" }
        },
        dash: {
          "0%": {
            strokeDasharray: "1, 200",
            strokeDashoffset: 0
          },
          "50%": {
            strokeDasharray: "89, 200",
            strokeDashoffset: 0
          },
          "100%": {
            strokeDasharray: "89, 200",
            strokeDashoffset: 124
          }
        },
        colorwhite: {
          "100%, 0%": {
            stroke: "#fff"
          },
          "40%": {
            stroke: "#fff"
          },
          "66%": {
            stroke: "#fff"
          },
          "80%, 90%": {
            stroke: "#fff"
          },
        }
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        rotate: "rotate 2s linear infinite",
        dash: "dash 1.5s ease-in-out infinite, colorwhite 6s ease-in-out infinite"
      }
    }
  },
  variants: {
    backgroundColor: ['responsive', 'first', 'last', 'even', 'odd', 'hover', 'focus']
  },
};
