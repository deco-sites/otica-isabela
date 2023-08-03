import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: {
      center: true,
    },
    screens: {
      sm: "600px",
      md: "728px",
      lg: "984px",
      xl: "1140px",
      "2xl": "1140px",
    },
    extend: {
      fontFamily: {
        "bebas-neue": ["Bebas Neue"],
      },
      colors: {
        "base-500": "#171717",
        "blue-100": "#a8e3ff",
        "blue-200": "#42c3ff",
        "blue-300": "#00a7f5",
        "success": " #00ff2a",
      },
    },
  },
};
