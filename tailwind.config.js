/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-yellow": "#DDCCAA",
        "primary-red": "#E31221",
        "primary-grey": "#D9D9D9",
      },
      backgroundImage: {
        "primary-home":
          "linear-gradient(180deg, #11101A 0%, #08080D 65.52%, rgba(0, 0, 0, 0) 100%)",
        interstellar:
          "linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 55.21%, rgba(0, 0, 0, 0) 100%)",
        inter: "url('@/assets/images/interstellar.png')",
      },
    },
  },
  plugins: [],
};
