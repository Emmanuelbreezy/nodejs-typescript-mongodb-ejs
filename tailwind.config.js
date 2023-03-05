/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ejs}",
    "./src/views/*.ejs",
    "./node_modules/flowbite/**/*.js",
  ],
  prefix: "dt-",
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
