import { createPortal } from "preact/compat";
import { IS_BROWSER } from "$fresh/runtime.ts";
interface Props {
  backDropAction?: () => void;
  ariaLabel?: string;
}

export const ModalOverlay = (
  { backDropAction, ariaLabel = "Modal Overlay" }: Props,
) => {
  if (!IS_BROWSER) {
    return null;
  }
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      onClick={() => backDropAction?.()}
      class="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 transition duration-500 z-30"
    >
    </div>,
    document.body,
  );
};
