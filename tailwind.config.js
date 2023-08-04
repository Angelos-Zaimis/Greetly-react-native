/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./"

  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      backgroundColor: {
        orangeCustom: '#F06748',
        lightBlueCustom: '#E7F0FD',
        blackCustom: '#3F465C',
        greyCustom: '#72788D',
        openblueCustom: '#719FFF',
        whiteCustom: '#F8F9FC',
        secondaryGrey: '#ADB9DB',
        secondaryOpenBlue: '#A5BFE6',
        secondaryLightGrey: '#DADADC',
        secondaryBlue: '#3E6DCF',
        secondaryLightBlue: '#F4F5F8'
      },
      colors: {
        orangeCustom: '#F06748',
        lightBlueCustom: '#E7F0FD',
        blackCustom: '#3F465C',
        greyCustom: '#72788D',
        openblueCustom: '#719FFF',
        whiteCustom: '#F8F9FC',
        secondaryGrey: '#ADB9DB',
        secondaryOpenBlue: '#A5BFE6',
        secondaryLightGrey: '#DADADC',
        secondaryBlue: '#3E6DCF',
        secondaryLightBlue: '#F4F5F8'
      },
      width: {
        w130: '130px',
        w209: '209px'
      },
      borderRadius: {
        round18: '18px'
      },
      fontSize: {
        headline: '44px',
        font17: '17px'
      },
      margin: {
        left26: '26px'
      },
      height: {
        h327: '327.34px',
      },
      fontSize: {
        small: '12px',
        medium: '16px',
        large: '20px',
      }
      

    },
  },
  plugins: [],
}

