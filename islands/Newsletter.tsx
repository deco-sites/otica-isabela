import Icon from "$store/components/ui/Icon.tsx";
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
  const useMail = useSignal("");

  const phoneMask = (phoneValue: string) => {
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

    console.log("ola mundo")

  };

  const headerLayout = (
    <div class="w-full flex flex-col justify-center items-center  mt-12 mb-12 p-3">
      <div class="text-start">
        <span class="flex items-center text-lg  lg:text-[26px] font-semibold gap-x-1 text-[#a8e3ff]">
          Seja avisado das <Icon width={65} height={34} id="MenGlassesLg" />
        </span>
        <span class="text-white uppercase font-bebas font-bold text-2xl lg:text-4xl scale-y-150">
          Ofertas e descontos
        </span>
      </div>
    </div>
  );

  const formLayout = (
    <form
      action="#"
      class="flex flex-col gap-3 w-full max-w-lg p-3 gap-y-7 mb-12"
      onSubmit={handleSubmit}
    >
      <input
        class="outline-none rounded-none pl-4 h-14 border border-slate-300 focus:border-black placeholder:text-[#757575] placeholder:font-normal "
        type="text"
        placeholder={placeholder?.nameInput ?? ""}
        value={String(userName)}
        onInput={(event) => {
          userName.value = event.currentTarget.value;
        }}
      />
      <input
        class="outline-none rounded-none pl-4 h-14 border border-slate-300 focus:border-black placeholder:text-[#757575] placeholder:font-normal "
        type="text"
        placeholder={placeholder?.mailInput ?? ""}
        value={String(useMail)}
        onInput={(event) => {
          useMail.value = event.currentTarget.value;
        }}
      />
      <input
        class="outline-none rounded-none pl-4 h-14 border border-slate-300 focus:border-black placeholder:text-[#757575] placeholder:font-normal "
        type="tel"
        value={phoneMask(String(userPhoneNumber))}
        maxLength={15}
        placeholder={placeholder?.foneInput ?? ""}
        onInput={(event) => {
          userPhoneNumber.value = event.currentTarget.value;
        }}
      />
      <button
        class="bg-black text-white text-base uppercase font-bold rounded-xl w-full h-14 mb-3"
        type="submit"
      >
        {buttonText}
      </button>

      {helpText && (
        <p class="text-[10px] text-white  font-normal text-center">
          {helpText}
        </p>
      )}
    </form>
  );

  return (
    <div class=" flex flex-col justify-center items-center w-full bg-blue-200  ">
      {headerLayout}
      {formLayout}
    </div>
  );
}
