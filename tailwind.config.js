// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-bg': "url('./Assets/image/bg-img.jpg')",
      },
      screens: {
        'sm': '640px',   // Example of a screen size definition
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px', 
      },
    },
  },
  plugins: [],
}
