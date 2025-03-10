

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // fontFamily: {
      //   poppins: ['Poppins', 'sans-serif']
      // },
      colors: {
        // primary: "#0F1F14",
        accent: "#F9B42A",
        primary: '#0A2919',
        black: '#111111',
        gray: {
          400: '#9CA3AF',
          800: '#1F2937',
          200: '#e5e7eb',
          600: '#4b5563',
          900: '#111827'
        }
        
      },
      screens: {
<<<<<<< HEAD
        '3xl': '1680px',
=======
        '3xl': '1600px', // Custom extra small breakpoint
>>>>>>> 38d575703a79cd3991bfba295b6ce1dde1370560
      },
      
    },
  },
  plugins: [],
}
