import Icon from "$store/components/ui/Icon.tsx";
import Modal from "$store/components/ui/Modal.tsx";

import { useSignal } from "@preact/signals";
import type { JSX } from "preact";

export interface Props {
  hideNewsletter?: boolean;
  placeholder?: {
    nameInput?: string;
    mailInput?: string;
    foneInput?: string;
  };
  buttonText?: string;

  /**
   * @title  WhatsApp redirect link
   */

  sucessRedirectLink?: string;

  /** @format textarea */
  helpText?: string;
}

export default function Newsletter(
  { buttonText, helpText, placeholder, hideNewsletter, sucessRedirectLink }:
    Props,
) {
  if (hideNewsletter) {
    return null;
  }

  const modalMode = useSignal("");
  const modalAlertMensage = useSignal("");

  const phoneMask = (phoneValue?: string) => {
    if (!phoneValue) return "";

    phoneValue = phoneValue.replace(/\D/g, "");

    if (phoneValue.length <= 2) {
      phoneValue = phoneValue.replace(/(\d{0,2})/, "($1");
    } else if (phoneValue.length <= 7) {
      phoneValue = phoneValue.replace(/(\d{2})(\d{0,5})/, "($1) $2");
    } else {
      phoneValue = phoneValue.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    }

    return phoneValue;
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
    modalMode.value = "sucess";
  };

  const headerLayout = (
    <div class="w-full flex flex-col justify-center items-center mt-12 mb-6 md:mb-16   ">
      <div class="text-start">
        <span class="flex items-center font-semibold text-xl  md:text-3xl  gap-x-1 text-blue-100">
          Seja avisado das <Icon width={65} height={34} id="MenGlassesLg" />
        </span>
        <span class="text-white uppercase font-bebas-neue font-normal  text-5xl md:text-[64px] ">
          Ofertas e descontos
        </span>
      </div>
    </div>
  );

  const formLayout = (
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
        onKeyUp={(e) => {
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
  );

  return (
    <>
      <section class="w-full bg-blue-200  ">
        <div class="flex flex-col justify-center items-center container w-full ">
          {headerLayout}
          {formLayout}
        </div>
      </section>
      <Modal
        title={String(modalMode) !== "" ? "Sucesso" : "Atenção"}
        mode={String(modalMode) !== "" ? "sucess" : "danger"}
        loading="lazy"
        sucessRedirectLink={sucessRedirectLink}
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
