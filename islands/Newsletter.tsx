import Icon from "$store/components/ui/Icon.tsx";
import Modal from "$store/components/ui/Modal.tsx";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";
export interface Form {
  placeholder?: {
    nameInput?: string;
    mailInput?: string;
    foneInput?: string;
  };
  buttonText?: string;
  /** @format textarea */
  helpText?: string;
}

export interface Props {
  title?: string;
  form?: Form;
}

export default function Newsletter({ form }: Props) {
  const { buttonText, helpText, placeholder } = form ?? {};

  const userPhoneNumber = useSignal("");
  const userName = useSignal("");
  const userMail = useSignal("");
  const showModal = useSignal(false);

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

    if (userPhoneNumber.value) {
      showModal.value = true;
    }
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
        class=" w-full outline-none rounded-none pl-4 h-14 border border-slate-300 focus:border-black placeholder:text-base-300 placeholder:font-normal "
        type="text"
        placeholder={placeholder?.nameInput ?? ""}
        value={String(userName)}
        onInput={(event) => {
          userName.value = event.currentTarget.value;
        }}
      />
      <input
        class=" w-full outline-none rounded-none pl-4 h-14 border border-slate-300 focus:border-black placeholder:text-base-300 placeholder:font-normal "
        type="text"
        placeholder={placeholder?.mailInput ?? ""}
        value={String(userMail)}
        onInput={(event) => {
          userMail.value = event.currentTarget.value;
        }}
      />
      <input
        class="w-full outline-none rounded-none pl-4 h-14 border border-slate-300 focus:border-black placeholder:text-[#757575] placeholder:font-normal "
        type="tel"
        value={phoneMask(String(userPhoneNumber))}
        maxLength={15}
        placeholder={placeholder?.foneInput ?? ""}
        onInput={(event) => {
          userPhoneNumber.value = event.currentTarget.value;
        }}
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
        title="Sucesso"
        mode="sucess"
        loading="lazy"
        open={showModal.value}
        onClose={() => {
          showModal.value = false;
        }}
      >
        <div class="bg-white w-full flex justify-center items-center pt-4 pb-5">
          <p>Favor Informar um email válido!</p>
        </div>
      </Modal>
    </>
  );
}
