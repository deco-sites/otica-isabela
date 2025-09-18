import { IS_BROWSER } from "$fresh/runtime.ts";
import type { ComponentChildren } from "preact";

const FaqContainer = (
  { backgroundColor, children }: {
    backgroundColor?: string;
    children?: ComponentChildren;
  },
) => {
  const isDesktop = globalThis.matchMedia?.("(min-width: 984px)")?.matches;

  return (
    <div
      style={{ backgroundColor: isDesktop ? backgroundColor : "#ffffff" }}
      class="w-full flex items-center justify-center px-4 lg:px-0"
    >
      {children}
    </div>
  );
};

export default FaqContainer;
