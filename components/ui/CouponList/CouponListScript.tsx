import { IS_BROWSER } from "$fresh/runtime.ts";

export default function CouponListScript() {
  if (!IS_BROWSER) {
    return null;
  }

  const couponButtons = document.querySelectorAll("[data-copy]");
  couponButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const code = button.getAttribute("data-copy");
      if (!code) {
        return;
      }

      const tooltip = button.querySelector("[data-tooltip]");
      if (tooltip) {
        tooltip.animate(
          [
            { offset: 0, opacity: 0 },
            { offset: 0.02, opacity: 1 },
            { offset: 0.98, opacity: 1 },
            { offset: 1, opacity: 0 },
          ],
          {
            duration: 3000,
            easing: "ease-in-out",
          },
        );
      }
      navigator.clipboard.writeText(code);
    });
  });

  const modalButtons = document.querySelectorAll("[data-open-modal]");
  modalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modalId = button.getAttribute("data-open-modal");
      if (!modalId) {
        return;
      }

      const dialog = document.getElementById(
        modalId,
      ) as HTMLDialogElement | null;
      if (!dialog) {
        return;
      }

      dialog.show();
    });
  });

  return <></>;
}
