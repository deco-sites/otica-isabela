import Modal, { Props as ModalProps } from "$store/components/ui/Modal.tsx";
import { HeaderTitle } from "./HeaderTitle.tsx";
import type { Props as HeaderProps } from "./HeaderTitle.tsx";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";
import { withManifest } from "$live/clients/withManifest.ts";
import type { Manifest } from "../../manifest.gen.ts";

//@ts-ignore Um erro bizarro acontecendo quando remove o ts-ignore
const Runtime = withManifest<Manifest>();

const subscribe = Runtime.create(
  "deco-sites/otica-isabela/loaders/store/newsletter.ts",
);

export interface Props {
  /** @title Esconder Newsletter? */
  hideNewsletter?: boolean;
  header?: HeaderProps;
  /** @title Placeholder dos Campos de Texto */
  placeholder?: {
    /** @title Campo de Nome */
    nameInput?: string;
    /** @title Campo de Email */
    mailInput?: string;
    /** @title Campo de Telefone */
    foneInput?: string;
  };
  /** @title Texto do botão */
  buttonText?: string;
  /** @title Link do WhatsApp */
  successRedirectLink?: string;
  /**
   * @format textarea
   * @title Texto de ajuda
   */
  helpText?: string;
}

export default function Newsletter({
  buttonText,
  helpText,
  placeholder,
  hideNewsletter,
  successRedirectLink,
  header,
}: Props) {
  if (hideNewsletter) {
    return null;
  }

  const modalAlert = useSignal({ message: "", mode: "" });
  const loading = useSignal(false);

  const phoneMask = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  };
  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
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
      modalAlert.value = {
        message:
          "Por favor, insira um telefone válido no formato (xx)xxxxx-xxxx.",
        mode: "danger",
      };
      return;
    }

    if (!emailRegex.test(email)) {
      modalAlert.value = {
        message: "Favor informar um email válido.",
        mode: "danger",
      };
      return;
    }

    try {
      loading.value = true;
      await subscribe({ email, nome: name, celular: phone });
      modalAlert.value = {
        message: "Obrigado por se inscrever!",
        mode: "success",
      };
    } catch (e) {
      modalAlert.value = {
        message: "Houve um erro interno. Por favor, tente novamente.",
        mode: "danger",
      };
    } finally {
      loading.value = false;
    }
  };

  return (
    <>
      <section class="w-full bg-blue-200  ">
        <div class="flex flex-col justify-center items-center w-full ">
          {header ? <HeaderTitle {...header} /> : null}
          <form
            action="#"
            class="flex flex-col gap-3 w-full md:max-w-[600px] p-3 mt-0 md:mt-8 gap-y-7 mb-12  items-center"
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
              disabled={loading}
            >
              {buttonText}
            </button>

            {helpText && (
              <p class="text-[10px] text-white  font-normal text-xs md:text-base text-center  md:max-w-[70%]">
                {helpText}
              </p>
            )}
          </form>
        </div>
      </section>
      <Modal
        title={modalAlert.value.mode === "sucess" ? "Successo" : "Atenção"}
        mode={modalAlert.value.mode as ModalProps["mode"]}
        loading="lazy"
        successRedirectLink={successRedirectLink}
        open={modalAlert.value.message !== ""}
        onClose={() => {
          modalAlert.value = {
            message: "",
            mode: "",
          };
        }}
      >
        <div class="bg-white w-full flex justify-center items-center pt-4 pb-5">
          <p>{modalAlert.value.message}</p>
        </div>
      </Modal>
    </>
  );
}
