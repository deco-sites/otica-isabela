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
      xxxs: "375px",
      xxs: "481px",
      xs: "577px",
      sm: "600px",
      md: "728px",
      lg: "993px",
      xl: "1180px",
      "2xl": "1200px",
    },
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.2s ease-in-out",
      },
      fontSize: {
        xxs: "0.5rem",
      },

      fontFamily: {
        "bebas-neue": ["Bebas Neue"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        "red-500": "#d92027",
        danger: "#f3ae3f",
        "gray-scale-100": "#f8f8f8",
        "base-200": "#a6a6a6",
        "base-300": "#757575",
        "base-400": "#626262",
        "base-500": "#171717",
        "blue-100": "#a8e3ff",
        "blue-200": "#42c3ff",
        "blue-300": "#00a7f5",
        success: " #00ff2a",
        "success-content": "#9ec54d",
        "orange-600": "#eb7f24",

        "grayscale-0": "rgba(255, 255, 255, 1)",
        "grayscale-50": "rgba(242, 242, 242, 1)",
        "grayscale-100": "rgba(217, 217, 217, 1)",
        "grayscale-200": "rgba(191, 191, 191, 1)",
        "grayscale-300": "rgba(166, 166, 166, 1)",
        "grayscale-400": "rgba(140, 140, 140, 1)",
        "grayscale-500": "rgba(115, 115, 115, 1)",
        "grayscale-600": "rgba(66, 66, 66, 1)",
        "grayscale-700": "rgba(38, 38, 38, 1)",
        "grayscale-800": "rgba(13, 13, 13, 1)",
        "grayscale-900": "rgba(0, 0, 0, 1)",

        "slot-primary-50": "rgba(229, 247, 255, 1)",
        "slot-primary-100": "rgba(179, 231, 255, 1)",
        "slot-primary-200": "rgba(128, 214, 255, 1)",
        "slot-primary-300": "rgba(77, 198, 255, 1)",
        "slot-primary-400": "rgba(26, 182, 255, 1)",
        "slot-primary-500": "rgba(0, 167, 245, 1)",
        "slot-primary-600": "rgba(0, 122, 179, 1)",
        "slot-primary-700": "rgba(0, 87, 128, 1)",
        "slot-primary-800": "rgba(0, 52, 77, 1)",
        "slot-primary-900": "rgba(0, 17, 26, 1)",
      },
    },
  },
};
