export const getDevice = () =>
  window?.matchMedia?.("(min-width: 984px)")?.matches ? "desktop" : "mobile";
