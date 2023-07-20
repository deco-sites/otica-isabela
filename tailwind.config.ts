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
      sm: "576px",
      md: "728px",
      lg: "992px",
      xl: "1140px"
    },
    extend: {
      colors: {
        "blue-200": "#42c3ff",
        "success": " #00ff2a",
      },
    },
  },
};
