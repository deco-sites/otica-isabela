import Button from "$store/components/ui/Button.tsx";
import { useEffect, useRef } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";

import Icon from "./Icon.tsx";

// Lazy load a <dialog> polyfill.
// if (IS_BROWSER && typeof window.HTMLDialogElement === "undefined") {
//   await import(
//     "https://raw.githubusercontent.com/GoogleChrome/dialog-polyfill/5033aac1b74c44f36cde47be3d11f4756f3f8fda/dist/dialog-polyfill.esm.js"
//   );
// }

export type Props = JSX.IntrinsicElements["dialog"] & {
  title?: string;
  mode?: "sidebar-right" | "sidebar-left" | "center" | "danger" | "success";
  onClose?: () => Promise<void> | void;
  loading?: "lazy" | "eager";
  successRedirectLink?: string;
};

const dialogStyles = {
  "sidebar-right": "animate-slide-left",
  "sidebar-left": "animate-slide-right",
  center: "animate-fade-in",
  danger: "animate-fade-in",
  success: "animate-fade-in",
};

const sectionStyles = {
  "sidebar-right": "justify-end",
  "sidebar-left": "justify-start",
  center: "justify-center items-center",
  danger: "justify-center items-center",
  success: "justify-center items-center",
};

const containerStyles = {
  "sidebar-right": "h-full w-full sm:max-w-lg bg-base-100",
  "sidebar-left": "h-full w-full sm:max-w-lg bg-base-100",
  center: "bg-base-100",
  danger: " w-full max-w-lg  ",
  success: " w-full max-w-lg  ",
};

const headerStyle = {
  "sidebar-right": "px-4 py-6 border-b border-base-200 bg-white",
  "sidebar-left": "px-4 py-6 border-b border-base-200 bg-white",
  center: "px-4 py-6 border-b border-base-200  bg-white  ",
  danger: " w-full max-w-lg bg-danger py-2 px-9 rounded-t-md  ",
  success: " w-full max-w-lg bg-success-content  py-2 px-9 rounded-t-md  ",
};

const titleStyle = {
  "sidebar-right": "text-black",
  "sidebar-left": "text-black",
  center: "text-black  ",
  danger: "text-white uppercase font-bold",
  success: "text-white uppercase font-bold",
};

const Modal = ({
  open,
  title,
  mode = "danger",
  onClose,
  successRedirectLink,
  children,
  loading,
  ...props
}: Props) => {
  const lazy = useSignal(false);
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!IS_BROWSER) {
      return;
    }
    if (open === false) {
      document.getElementsByTagName("body").item(0)?.classList.remove(
        "no-scroll",
      );
      ref.current?.open === true && ref.current.close();
    } else if (open === true) {
      document.getElementsByTagName("body").item(0)?.classList.add(
        "no-scroll",
      );
      ref.current?.open === false && ref.current.showModal();
      lazy.value = true;
    }
  }, [open]);

  useEffect(() => {
    if (!successRedirectLink || mode !== "success" || !IS_BROWSER) {
      return;
    }

    const timer = setTimeout(() => {
      window.location.href = successRedirectLink;
    }, 3000);
    return () => clearTimeout(timer);
  }, [mode, successRedirectLink]);

  return (
    <dialog
      {...props}
      ref={ref}
      class={`bg-transparent  p-0 m-0 max-w-full w-full max-h-full h-full backdrop-opacity-50 ${
        dialogStyles[mode]
      } ${props.class ?? ""}`}
      onClick={(e) =>
        (e.target as HTMLDialogElement).tagName === "SECTION" && onClose?.()}
      onClose={onClose}
    >
      <section
        class={`w-full   h-full flex bg-transparent  ${sectionStyles[mode]}`}
      >
        <div
          class={`bg-transparent shadow-2xl m-3 flex flex-col${
            containerStyles[mode]
          }`}
        >
          <header
            class={`flex justify-between items-center  ${headerStyle[mode]}`}
          >
            {title && (
              <div class="flex gap-5 items-center">
                {mode === "success" && (
                  <Icon
                    id="CheckMarkCircle"
                    width={36}
                    height={36}
                    strokeWidth={1}
                    style={{ color: "white" }}
                  />
                )}
                <span class={`text-2xl ${titleStyle[mode]}`}>{title}</span>
              </div>
            )}
            <Button class="btn btn-ghost" onClick={onClose}>
              <Icon
                id="XMark"
                width={25}
                height={25}
                strokeWidth={1}
                fill="white"
              />
            </Button>
          </header>
          <div class="overflow-y-auto flex-grow flex flex-col rounded-b-lg">
            {loading === "lazy" ? lazy.value && children : children}
          </div>
        </div>
      </section>
    </dialog>
  );
};

export default Modal;
