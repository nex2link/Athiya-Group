/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
      
    },
  },
  plugins: [],
}