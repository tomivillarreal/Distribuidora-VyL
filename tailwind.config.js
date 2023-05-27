/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}",
  "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
    },
    backgroundColor: theme => ({
      ...theme('colors'),
      'color1': '#D5522F',
     })
  },
  plugins: [],
}
