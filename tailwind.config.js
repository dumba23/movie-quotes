/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "primary-yellow": "#DDCCAA",
        "primary-red": "#E31221",
        "primary-grey": "#D9D9D9",
        "primary-success": "#198754",
        "primary-blue": "#0D6EFD",
        "secondary-grey": "#6C757D",
        gray: "#9C9A9A",
        "grey-dim": "#222030",
        "secondary-red": "#DC3545",
        "light-grey": "#CED4DA",
        "light-red": "#E31221",
        "primary-black": "#11101A",
        "primary-purple": "#612FFF66",
        "medium-gray": "#EFEFEF33",
        white: "#FFF",
        "secondary-black": "#24222F",
        "primary-white": "#fff",
      },
      backgroundImage: {
        "primary-home":
          "linear-gradient(180deg, #11101A 0%, #08080D 100%, rgba(0, 0, 0, 0) 100%)",
        "primary-profile":
          "linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0D0B14 98.75%)",
        interstellar:
          "linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 55.21%, rgba(0, 0, 0, 0) 100%)",
        header:
          "linear-gradient(0deg, rgba(34, 32, 48, 0.2), rgba(34, 32, 48, 0.2))",
        "half-transparent":
          "linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0D0B14 98.75%)",
      },
      boxShadow: {
        input: "0px 0px 0px 4px rgba(13, 110, 253, 0.25)",
      },
    },
  },
  plugins: [],
};
