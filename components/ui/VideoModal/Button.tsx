import { useUI } from "$store/sdk/useUI.ts";
import type { JSX } from "preact";

export type Props = Omit<JSX.IntrinsicElements["button"], "onClick"> & {
  modalId: string;
};

export default function VideoButton({ children, modalId, ...props }: Props) {
  const { displayVideoModal } = useUI();

  return (
    <button {...props} onClick={() => (displayVideoModal.value = modalId)}>
      {children}
    </button>
  );
}
