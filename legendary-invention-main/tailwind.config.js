/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "red-magic": "#F1324D",
        "blue-magic": "#2414E3",
        "dark-kiss": "#E50498",
        "sharp-black": "#070005",
        "sharp-purple": "#D72E60",
        "dark-pink": "#13020E",
        "purple-magic": "#1F0317",
        "dark-purple": "#090107",
      },
      fontFamily: {
        display: ["ClashDisplay-Variable"],
        sans: ["PlusJakartaSans-Variable"],
      },
    },
  },
  plugins: [],
};
