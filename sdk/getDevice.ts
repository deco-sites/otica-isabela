export const getDevice = () =>
  globalThis.matchMedia?.("(min-width: 984px)")?.matches ? "desktop" : "mobile";
