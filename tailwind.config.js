/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F6F1FF',
        surface: '#FFFFFF',
        ink: '#2E2350',
        pink: '#FF8FC2',
        blue: '#7FD3FF',
        mint: '#A8EFC7',
        yellow: '#FFDA6E',
        lilac: '#CBB8FF',
      },
      fontFamily: {
        display: ['"Baloo 2"', 'cursive'],
        body: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
