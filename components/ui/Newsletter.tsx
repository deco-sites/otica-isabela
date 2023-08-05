import Modal from "$store/components/ui/Modal.tsx";
import { IconTitle } from "$store/components/ui/IconTitle.tsx";
import type { IconTitleProps } from "$store/components/ui/IconTitle.tsx";
import { useRef } from "preact/hooks";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";

export interface Props {
  hideNewsletter?: boolean;
  titleConfig?: IconTitleProps;
  placeholder?: {
    nameInput?: string;
    mailInput?: string;
    foneInput?: string;
  };
  buttonText?: string;

  /**
   * @title  WhatsApp redirect link
   */

  successRedirectLink?: string;

  /** @format textarea */
  helpText?: string;
}

export default function Newsletter(
  {
    buttonText,
    helpText,
    placeholder,
    hideNewsletter,
    successRedirectLink,
    titleConfig,
  }: Props,
) {
  if (hideNewsletter) {
    return null;
  }

  const modalMode = useSignal("");
  const modalAlertMensage = useSignal("");
  const profilePhone = useSignal("");

  const phoneMask = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  };
  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const phoneRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const name = (e.currentTarget.elements.namedItem("name") as RadioNodeList)
      ?.value;
    const email = (e.currentTarget.elements.namedItem("email") as RadioNodeList)
      ?.value;
    const phone = (e.currentTarget.elements.namedItem("phone") as RadioNodeList)
      ?.value;

    if (!phoneRegex.test(phone)) {
      modalAlertMensage.value =
        "Por favor, insira um telefone válido no formato (xx)xxxxx-xxxx.";
      return;
    }

    if (!emailRegex.test(email)) {
      modalAlertMensage.value = "Favor Informar um email válido!";
      return;
    }

    modalAlertMensage.value = "Obrigado por se inscrever!";
    modalMode.value = "success";
  };

  return (
    <>
      <section class="w-full bg-blue-200  ">
        <div class="flex flex-col justify-center items-center container w-full ">
          <IconTitle
            {...titleConfig}
          />
          <form
            action="#"
            class="flex flex-col gap-3 w-full md:max-w-[70%] p-3 mt-0 md:mt-8 gap-y-7 mb-12  items-center"
            onSubmit={handleSubmit}
          >
            <input
              name="name"
              class=" w-full outline-none rounded-none pl-4 h-14 border border-slate-300 focus:border-black placeholder:text-base-300 placeholder:font-normal "
              type="text"
              placeholder={placeholder?.nameInput ?? ""}
            />
            <input
              name="email"
              class=" w-full outline-none rounded-none pl-4 h-14 border border-slate-300 focus:border-black placeholder:text-base-300 placeholder:font-normal "
              type="text"
              placeholder={placeholder?.mailInput ?? ""}
            />
            <input
              name="phone"
              ref={phoneNumberRef}
              onChange={(e) => {
                e.currentTarget.value = phoneMask(e.currentTarget.value);
              }}
              class="w-full outline-none rounded-none pl-4 h-14 border border-slate-300 focus:border-black placeholder:text-[#757575] placeholder:font-normal "
              type="tel"
              maxLength={15}
              placeholder={placeholder?.foneInput ?? ""}
            />
            <button
              class="bg-black text-white text-base uppercase font-bold rounded-xl w-full md:max-w-sm h-14 md:h-20 mb-3 mt-0 md:mt-12"
              type="submit"
            >
              {buttonText}
            </button>

            {helpText && (
              <p class="text-[10px] text-white  font-normal text-xs md:text-base text-center  md:max-w-[60%]">
                {helpText}
              </p>
            )}
          </form>
        </div>
      </section>
      <Modal
        title={String(modalMode) !== "" ? "successo" : "Atenção"}
        mode={String(modalMode) !== "" ? "success" : "danger"}
        loading="lazy"
        successRedirectLink={successRedirectLink}
        open={modalAlertMensage.value !== ""}
        onClose={() => {
          modalAlertMensage.value = "";
          modalMode.value = "";
        }}
      >
        <div class="bg-white w-full flex justify-center items-center pt-4 pb-5">
          <p>{modalAlertMensage}</p>
        </div>
      </Modal>
    </>
  );
}
