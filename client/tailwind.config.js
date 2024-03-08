/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}", "node_modules/flowbite-react/lib/esm/**/*.js"],
  theme: {
    extend: {
      backgroundImage: {
        'unfocused-lights': 'url("https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")'
      }
    },
  },
  plugins: [require('flowbite/plugin')],
}

