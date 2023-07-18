import daisyui from "daisyui";


export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    extend: {
      colors: {
        "bg-blue-200": "#42c3ff",
        "success":" #00ff2a"
      },
    },
  },
};
