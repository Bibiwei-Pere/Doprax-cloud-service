// tailwind.config.js
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        lg: "1200px",
        "2xl": "1920px",
      },
      colors: {
        "background-1": "var(--background-1)",
        "background-2": "var(--background-2)",
        "border-gray": "var(--border-gray)",
        foreground: "var(--foreground-reverse)",
        "foreground-reverse": "var(--foreground-reverse)",
        border: "var(--border)",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
