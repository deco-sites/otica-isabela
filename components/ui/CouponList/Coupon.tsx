import { useId } from "preact/hooks";
import Icon from "site/components/ui/Icon.tsx";

interface IButton {
  href: string;
  label: string;
}

interface IModal {
  /**
   * @default Terms & Conditions
   * @description The label of the button that opens the modal, e.g: Terms & Conditions
   */
  label: string;
  /**
   * @format html
   * @default <p>Modal content</p>
   */
  content: string;
}

/**
 * @title {{header}} - {{code}}
 */
export interface Props {
  header: string;
  code: string;
  modal: IModal;
  button: IButton;
}

export default function Coupon({ header, code, modal, button }: Props) {
  const modalId = `modal-${useId()}`;

  return (
    <li class="py-10 flex flex-col md:flex-row gap-3 justify-between">
      <div>
        <h2 class="font-semibold text-2xl">{header}</h2>
        <button
          data-open-modal={modalId}
          aria-haspopup="dialog"
          class="text-zinc-900 mt-4 underline"
        >
          {modal.label}
        </button>
        <label
          htmlFor={`close-${modalId}`}
          class="fixed inset-0 bg-black/50 [&:has(~dialog[open])]:opacity-100 opacity-0 transition-all pointer-events-none [&:has(~dialog[open])]:pointer-events-auto z-20"
          aria-label="Fechar Menu"
        />
        <dialog
          id={modalId}
          class="p-5 fixed max-w-[90%] w-max top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent z-30 m-0 scale-90 opacity-0 open:opacity-100 open:scale-100 transition-all"
        >
          <form method="dialog" class="absolute top-0 right-0">
            <button
              id={`close-${modalId}`}
              data-close
              class="text-white bg-black rounded-full p-1 w-10 h-10 flex justify-center items-center shadow-xl"
            >
              <Icon id="XMark" size={24} />
            </button>
          </form>
          <div
            class="bg-white px-7 py-14"
            dangerouslySetInnerHTML={{ __html: modal.content }}
          />
        </dialog>
      </div>
      <div class="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-10">
        <div class="md:overflow-x-clip">
          <div class="min-w-[170px] min-h-[70px] flex justify-start md:justify-center items-center gap-10 md:py-2 md:px-5 md:border md:border-zinc-500 md:relative md:after:z-10 md:after:rounded-full md:after:bg-white md:after:border md:after:border-zinc-500 md:after:absolute md:after:-left-2.5 md:after:w-5 md:after:h-5 md:after:top-1/2 md:after:-translate-y-1/2 md:before:z-10 md:before:rounded-full md:before:bg-white md:before:border md:before:border-zinc-500 md:before:absolute md:before:-right-2.5 md:before:w-5 md:before:h-5 md:before:top-1/2 md:before:-translate-y-1/2">
            <div class="flex md:flex-col gap-3 md:gap-0 items-center text-center">
              <p class="text-zinc-500 md:text-zinc-400 md:text-xs font-medium md:font-bold">
                Usar Cupom<span class="md:hidden">:</span>
              </p>
              <button
                data-copy={code}
                class="text-lg font-bold flex justify-center gap-2 md:gap-3 relative"
              >
                {code}{" "}
                <span class="relative">
                  <span
                    data-tooltip
                    class="absolute h-fit bg-zinc-800 rounded text-white font-medium text-sm left-1/2 -translate-x-1/2 -top-6 opacity-0 py-0.5 px-3"
                  >
                    Copiado
                  </span>
                  <Icon id="Copy" size={24} />
                </span>
              </button>
            </div>
            <div class="h-px border-b border-dashed border-zinc-400 absolute bottom-1 left-1 right-1 hidden md:block" />
          </div>
        </div>
        <a
          href={button.href}
          class="flex items-center justify-center rounded h-fit px-5 py-3 min-w-[192px] bg-black text-white w-full md:w-fit"
        >
          {button.label}
        </a>
      </div>
    </li>
  );
}
