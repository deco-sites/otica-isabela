import { IS_BROWSER } from "$fresh/runtime.ts";

// Hook to contain interactions function of DOM

export const useDOM = () => {
  if (!IS_BROWSER) {
    return {};
  }

  return {
    isDesktop: window?.matchMedia?.("(min-width: 984px)")?.matches,
  };
};
