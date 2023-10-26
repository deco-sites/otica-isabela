import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: {
      center: true,
      screens: {
        sm: "540px",
        md: "720px",
        lg: "960px",
        xl: "1140px",
      },
    },
    screens: {
      xxs: "481px",
      xs: "577px",
      sm: "600px",
      md: "728px",
      lg: "993px",
      xl: "1140px",
      "2xl": "1200px",
    },
    extend: {
      fontSize: {
        "xxs": "0.5rem",
      },

      fontFamily: {
        "bebas-neue": ["Bebas Neue"],
        "roboto": ["Roboto", "sans-serif"],
      },
      colors: {
        "red-500": "#d92027",
        "danger": "#f3ae3f",
        "gray-scale-100": "#f8f8f8",
        "base-200": "#a6a6a6",
        "base-300": "#757575",
        "base-400": "#626262",
        "base-500": "#171717",
        "blue-100": "#a8e3ff",
        "blue-200": "#42c3ff",
        "blue-300": "#00a7f5",
        "success": " #00ff2a",
        "success-content": "#9ec54d",
        "orange-600": "#eb7f24",
      },
    },
  },
};
