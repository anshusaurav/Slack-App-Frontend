module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],

  plugins: [],
  theme: {


    extend: {
      maxWidth: {
        '3/4': '75%',
      },
      inset: {
        '0': '0',
        auto: 'auto',
        '1/2': '50%',
        '44': '44px',
        '1': '1rem',
        '2': '2rem',
        '6': '6rem',
        '7': '7rem',
        '8': '8rem',
        '12': '12rem',
        '-192': '-192px'
      },
      flex: {
        '2': '1 0 auto',
        '3': '0 0 auto'
      },
      borderRadius: {
        'circle': '50%',
        '1': '1rem'
      },
      boxShadow: {
        newtype: '0 0 8px 0 rgba(0,0,0,.16)'
      },
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
        },
        fadesunnyin: {
          "0%": {
            opacity: "0"
          },
          // "50%": {
          //   opacity: "0.5"
          // },
          "100%": {
            opacity: "1"
          }
        }
      },
      animation: {
        fadesunnyin: "fadesunnyin 0.75s ease-in-out",
        wiggle: "wiggle 1s ease-in-out infinite",
        rotate: "rotate 2s linear infinite",
        dash: "dash 1.5s ease-in-out infinite, colorwhite 6s ease-in-out infinite"
      }
    },
    fontFamily: {
      'body': ['Lato']
    },


  },
  variants: {
    backgroundColor: ['responsive', 'first', 'last', 'even', 'odd', 'hover', 'focus']
  },
};
