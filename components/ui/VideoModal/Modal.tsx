import Icon from "site/components/ui/Icon.tsx";
import { useUI } from "site/sdk/useUI.ts";
import { useSignal } from "@preact/signals";
import type { ComponentChildren } from "preact";
import { Suspense } from "preact/compat";
import { useEffect, useId } from "preact/hooks";

function Lazy({ children }: { children: ComponentChildren }) {
  return (
    <Suspense
      fallback={
        <div class="w-screen flex items-center justify-center">
          <span class="loading loading-spinner bg-white text-white" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

export type Props = {
  url: string;
  modalId: string;
};

export default function VideoModal({ url, modalId }: Props) {
  const { displayVideoModal } = useUI();
  const isOpen = displayVideoModal.value === modalId;
  const close = () => {
    displayVideoModal.value = null;
  };

  return (
    <Modal open={isOpen} onClose={close}>
      <Lazy>
        {isOpen && (
          <div class="w-full flex relative pt-5 pr-5">
            <button
              onClick={close}
              class="text-white bg-black rounded-full p-1 w-10 h-10 flex justify-center items-center shadow-xl absolute top-0 right-0"
            >
              <Icon id="XMark" size={24} />
            </button>
            <iframe
              loading="lazy"
              width="100%"
              class="aspect-video"
              src={url}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            >
            </iframe>
          </div>
        )}
      </Lazy>
    </Modal>
  );
}

interface ModalProps {
  onClose?: () => void;
  open?: boolean;
  class?: string;
  children?: ComponentChildren;
  loading?: "eager" | "lazy";
}

function Modal(props: ModalProps) {
  const {
    children,
    open,
    onClose,
    class: _class = "",
    loading = "lazy",
  } = props;
  const lazy = useSignal(loading === "lazy" && !open);
  const id = useId();

  useEffect(() => {
    const handler = (e: KeyboardEvent) =>
      (e.key === "Escape" || e.keyCode === 27) && open && onClose?.();

    addEventListener("keydown", handler);

    return () => {
      removeEventListener("keydown", handler);
    };
  }, [open]);

  useEffect(() => {
    lazy.value = false;
  }, []);

  return (
    <>
      <input
        id={id}
        checked={open}
        type="checkbox"
        class="modal-toggle"
        onChange={(e) => e.currentTarget.checked === false && onClose?.()}
      />
      <div class="modal">
        <div class="modal-box rounded-none !shadow-none !p-0 max-w-[90%] md:max-w-[70%] w-full bg-transparent !max-h-none">
          {!lazy.value && children}
        </div>
        <label class="modal-backdrop" for={id}>
          Close
        </label>
      </div>
    </>
  );
}
