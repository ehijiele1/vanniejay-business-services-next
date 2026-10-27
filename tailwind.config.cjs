/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#111111',
        white: '#FFFFFF',
        graphite: '#333333',
        gray: '#777777',
        lightGray: '#F4F4F4',
        gold: '#C8A24A', // 10% accent per 60-30-10 rule
      },
      spacing: {
        // 8‑point grid (multiples of 8px). Tailwind’s default spacing is 0.25rem (4px); we add explicit 8‑pixel steps.
        '2': '8px',   // 8
        '4': '16px',  // 16
        '6': '24px',  // 24
        '8': '32px',  // 32
        '10': '40px', // 40
        '12': '48px', // 48
        '16': '64px', // 64
        '20': '80px', // 80
        '24': '96px', // 96
        '32': '128px', // 128
      },
      fontFamily: {
        display: ['"Söhne"', 'Inter', 'Arial', 'sans-serif'],
        body: ['Inter', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        // radius bounds per brand
        DEFAULT: '8px',
        lg: '16px',
      },
    },
  },
  plugins: [],
};
