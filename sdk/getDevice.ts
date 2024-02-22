export const getDevice = () =>
  globalThis.window?.matchMedia?.("(min-width: 984px)")?.matches
    ? "desktop"
    : "mobile";
