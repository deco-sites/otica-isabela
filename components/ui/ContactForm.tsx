import { useSignal } from "@preact/signals";
import Icon from "site/components/ui/Icon.tsx";
import useModal from "site/components/ui/useModal.tsx";
import { useId } from "site/sdk/useId.ts";
import intlTelInput from "npm:intl-tel-input";
import { useEffect } from "preact/hooks";

/**
 * @titleBy subject
 */
interface Subject {
  subject: string;
}

/**
 * @titleBy availability
 */
interface Availability {
  availability: string;
}

interface Props {
  title: string;
  subjects: Subject[];
  availabilities: Availability[];
}

const subject: Subject = {
  subject: "Subject",
};

const availability: Availability = {
  availability: "Availability",
};

export default function ({
  title = "Title",
  subjects = [subject, subject, subject],
  availabilities = [availability, availability, availability],
}: Props) {
  // deno-lint-ignore no-explicit-any
  const intl = useSignal({} as Record<string, any>);
  const formErrors = useSignal({
    name: "",
    email: "",
    phone: "",
    subject: "",
    availability: "",
    message: "",
    extensions: "",
  });

  const modalId = useId();
  const successModal = useModal(modalId);

  useEffect(() => {
    // Wait css load
    setTimeout(() => {
      intl.value = intlTelInput(document.querySelector("#phone"), {
        initialCountry: "br",
        showSelectedDialCode: true,
        utilsScript: "/intl-tel-input/utils.js",
      });
    }, 500);
  }, []);

  function onSubmit() {
    const form = document.querySelector("#contact") as HTMLFormElement;

    const name = (form?.elements.namedItem("name") as HTMLInputElement).value;
    const email = form?.elements.namedItem("email") as HTMLInputElement;
    const phone = intl.value?.getNumber();
    const subject = (form?.elements.namedItem("subject") as HTMLInputElement)
      .value;
    const availability = (
      form?.elements.namedItem("availability") as HTMLInputElement
    ).value;
    const message = (form?.elements.namedItem("message") as HTMLInputElement)
      .value;
    const extensions = (
      form?.elements.namedItem("extensions") as HTMLInputElement
    ).value;

    if (!name) {
      formErrors.value.name = "Preencha seu nome";
    } else {
      formErrors.value.name = "";
    }
    if (!email.value) {
      formErrors.value.email = "Preencha seu email";
    } else if (!email.checkValidity()) {
      formErrors.value.email = "Email inválido";
    } else {
      formErrors.value.email = "";
    }
    if (!intl.value.isValidNumber()) {
      formErrors.value.phone = "Preencha seu telefone";
    } else {
      formErrors.value.phone = "";
    }
    if (!subject) {
      formErrors.value.subject = "Selecione uma opção";
    } else {
      formErrors.value.subject = "";
    }
    if (!availability) {
      formErrors.value.availability = "Selecione uma opção";
    } else {
      formErrors.value.availability = "";
    }
    if (!message) {
      formErrors.value.message = "Preencha sua mensagem";
    } else {
      formErrors.value.message = "";
    }
    if (!extensions) {
      formErrors.value.extensions = "Selecione uma extensão";
    } else {
      formErrors.value.extensions = "";
    }

    const ok = Object.values(formErrors.value).every((value) => value === "");

    formErrors.value = { ...formErrors.value };

    if (ok) {
      // Wait rerender then open modal
      setTimeout(() => {
        const modalInput = document.getElementById(modalId) as HTMLInputElement;

        modalInput.checked = true;
      }, 100);
    }
  }

  return (
    <>
      <successModal.Modal class="fixed inset-0 z-50 bg-black/80 h-full justify-center items-center">
        <successModal.Toggle class="w-full h-full absolute inset-0" />
        <div class="pt-16 pb-10 px-12 bg-white relative flex flex-col gap-7 max-w-[640px] w-[95%]">
          <p class="text-lg text-black">
            Your inquiry has been successfully sent to our Customer Service.
          </p>
          <successModal.Toggle class="bg-[#d39d4e] hover:bg-[#dcb171] rounded-md transition-colors text-center select-none outline-0 cursor-pointer whitespace-nowrap h-10 px-5 w-full max-w-[160px] text-white flex justify-center items-center">
            Ok
          </successModal.Toggle>
        </div>
      </successModal.Modal>

      <link rel="stylesheet" href="/intl-tel-input/intlTelInput.min.css"></link>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .iti__flag {
                background-image: url("/intl-tel-input/flags.png");
            }
        
            .iti__arrow {
                width: 26px;
                height: 1px;
                border: 0;
            }

            .iti__selected-flag {
                background: transparent !important;
            }

            .iti {
                width: 100%;
            }
          `,
        }}
      />
      <div class="flex flex-col items-center max-w-[672px] w-[95%] pt-14 pb-24 mx-auto">
        <h2 class="text-[30px] font-semibold text-center mb-12">{title}</h2>

        <form
          id="contact"
          class="flex flex-col items-center w-full"
          novalidate
          onSubmit={(e) => {
            e.preventDefault();

            onSubmit();
          }}
        >
          <div class="flex flex-col min-[768px]:grid min-[768px]:grid-cols-2 gap-x-2.5 gap-y-3 w-full">
            <div class="flex flex-col gap-2">
              <label for="name" class="text-[13px] text-black">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Nome"
                class={`w-full border outline-0 rounded-md px-3.5 py-3 bg-white text-black text-ellipsis focus-visible:border-[#d39d4e] transition-colors h-10 ${
                  formErrors.value.name
                    ? "border-[#fb2424]"
                    : "border-[#a0a0a0]"
                }`}
              />
              <p
                class={`text-xs text-[#fb2424] transition-all ${
                  formErrors.value.name ? "h-4" : "h-0"
                }`}
              >
                {formErrors.value.name}
              </p>
            </div>
            <div class="flex flex-col gap-2 relative">
              <Icon
                id="BigChevronDown"
                width={26}
                height={26}
                class="absolute right-1 top-7"
              />
              <label for="subject" class="text-[13px] text-black">
                Subject
              </label>
              <select
                id="subject"
                class={`w-full border outline-0 rounded-md px-3.5 py-3 bg-white appearance-none text-black focus-visible:border-[#d39d4e] transition-colors h-10 ${
                  formErrors.value.subject
                    ? "border-[#fb2424]"
                    : "border-[#a0a0a0]"
                }`}
              >
                <option value="">Selecione uma opção</option>
                {subjects.map((subject) => (
                  <option value={subject.subject}>{subject.subject}</option>
                ))}
              </select>
              <p
                class={`text-xs text-[#fb2424] transition-all ${
                  formErrors.value.subject ? "h-4" : "h-0"
                }`}
              >
                {formErrors.value.subject}
              </p>
            </div>
            <div class="flex flex-col gap-2 relative">
              <Icon
                id="BigChevronDown"
                width={26}
                height={26}
                class="absolute left-[68px] top-7 z-[1]"
              />
              <label for="phone" class="text-[13px] text-black">
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                max={11}
                class={`w-full border outline-0 rounded-md px-3.5 py-3 bg-white text-black text-ellipsis focus-visible:border-[#d39d4e] transition-colors h-10 ${
                  formErrors.value.phone
                    ? "border-[#fb2424]"
                    : "border-[#a0a0a0]"
                }`}
              />
              <p
                class={`text-xs text-[#fb2424] transition-all ${
                  formErrors.value.phone ? "h-4" : "h-0"
                }`}
              >
                {formErrors.value.phone}
              </p>
            </div>
            <div class="flex flex-col gap-2">
              <label for="extensions" class="text-[13px] text-black">
                Extensions
              </label>
              <input
                id="extensions"
                type="text"
                placeholder="Extensões"
                class={`w-full border outline-0 rounded-md px-3.5 py-3 bg-white text-black text-ellipsis focus-visible:border-[#d39d4e] transition-colors h-10 ${
                  formErrors.value.extensions
                    ? "border-[#fb2424]"
                    : "border-[#a0a0a0]"
                }`}
              />
              <p
                class={`text-xs text-[#fb2424] transition-all ${
                  formErrors.value.extensions ? "h-4" : "h-0"
                }`}
              >
                {formErrors.value.extensions}
              </p>
            </div>
            <div class="flex flex-col gap-2">
              <label for="email" class="text-[13px] text-black">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                class={`w-full border outline-0 rounded-md px-3.5 py-3 bg-white text-black text-ellipsis focus-visible:border-[#d39d4e] transition-colors h-10 ${
                  formErrors.value.email
                    ? "border-[#fb2424]"
                    : "border-[#a0a0a0]"
                }`}
              />
              <p
                class={`text-xs text-[#fb2424] transition-all ${
                  formErrors.value.email ? "h-4" : "h-0"
                }`}
              >
                {formErrors.value.email}
              </p>
            </div>
            <div class="flex flex-col gap-2 relative">
              <Icon
                id="BigChevronDown"
                width={26}
                height={26}
                class="absolute right-1 top-7"
              />
              <label for="availability" class="text-[13px] text-black">
                Availability
              </label>
              <select
                id="availability"
                class={`w-full border outline-0 rounded-md px-3.5 py-3 bg-white appearance-none text-black text-ellipsis focus-visible:border-[#d39d4e] transition-colors h-10 ${
                  formErrors.value.availability
                    ? "border-[#fb2424]"
                    : "border-[#a0a0a0]"
                }`}
              >
                <option value="">Selecione uma opção</option>
                {availabilities.map((availability) => (
                  <option value={availability.availability}>
                    {availability.availability}
                  </option>
                ))}
              </select>
              <p
                class={`text-xs text-[#fb2424] transition-all ${
                  formErrors.value.availability ? "h-4" : "h-0"
                }`}
              >
                {formErrors.value.availability}
              </p>
            </div>
            <div class="col-span-2 flex flex-col gap-2">
              <label for="message" class="text-[13px] text-black">
                Message
              </label>
              <textarea
                id="message"
                class="w-full h-36 border border-[#a0a0a0] outline-0 rounded-md px-3.5 py-3 bg-white text-black focus-visible:border-[#d39d4e]"
              />
              <p
                class={`text-xs text-[#fb2424] transition-all ${
                  formErrors.value.message ? "h-4" : "h-0"
                }`}
              >
                {formErrors.value.message}
              </p>
            </div>
          </div>
          <button
            type="submit"
            class="bg-[#d39d4e] hover:bg-[#dcb171] rounded-md transition-colors text-center select-none outline-0 cursor-pointer whitespace-nowrap h-10 px-5 mt-6 w-full max-w-[300px] text-white"
          >
            Enviar
          </button>
        </form>
      </div>
    </>
  );
}
