const flowbite = require("flowbite/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js", // Correct Flowbite content path
  ],
  theme: {
    extend: {
      colors: {
        active: "#0aad0a",
        bgg:"#f0f3f2",
      },
    },
  },
  plugins: [flowbite], // Use directly without calling it as a function
};
