import type { RichText } from "apps/admin/widgets.ts";
import Icon from "../../components/ui/Icon.tsx";
import { useSignal } from "@preact/signals";
import { withManifest } from "$live/clients/withManifest.ts";
import type { Manifest } from "../../manifest.gen.ts";

interface Props {
    title: string;
    text: RichText;
    mobileText: RichText;
}

//@ts-ignore Um erro bizarro acontecendo quando remove o ts-ignore
const Runtime = withManifest<Manifest>();

const subscribe = Runtime.create(
    "site/loaders/store/newsletter.ts",
);

export default function ({ title, text, mobileText }: Props) {
    const loading = useSignal(false);
    const messageAlert = useSignal<
        { message: string; mode: "success" | "danger" | "" }
    >({ message: "", mode: "" });

    const phoneMask = (value: string) => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2");
    };

    const handleSubmit = async (e: SubmitEvent) => {
        e.preventDefault();
        const phoneRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const form = e.currentTarget as HTMLFormElement;
        const name = (form.elements.namedItem("name") as HTMLInputElement)
            ?.value;
        const email = (form.elements.namedItem("email") as HTMLInputElement)
            ?.value;
        const phone = (form.elements.namedItem("phone") as HTMLInputElement)
            ?.value;

        if (!phoneRegex.test(phone)) {
            messageAlert.value = {
                message: "Por favor, insira um número de telefone válido",
                mode: "danger",
            };
            return;
        }

        if (!emailRegex.test(email)) {
            messageAlert.value = {
                message: "Por favor, insira um e-mail válido",
                mode: "danger",
            };
            return;
        }

        try {
            loading.value = true;
            await subscribe({ email, nome: name, celular: phone });
            messageAlert.value = {
                message: "Obrigado por se inscrever!",
                mode: "success",
            };
            form.reset();
        } catch (e) {
            messageAlert.value = {
                message: "Houve um erro interno. Por favor, tente novamente.",
                mode: "danger",
            };
        } finally {
            loading.value = false;
        }
    };

    return (
        <div class="bg-gradient-to-r from-[#80D6FF] to-slot-primary-400 lg:to-slot-primary-600 relative py-14 isolate">
            <Icon
                id="newsletter-logo"
                size={316}
                class="text-grayscale-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 hidden lg:block"
            />

            <div class="max-w-[1320px] w-[95%] mx-auto flex items-center gap-4 justify-between flex-col lg:flex-row">
                <div class="flex flex-col gap-8">
                    <h2 class="text-grayscale-700 text-xl lg:leading-9 lg:text-[32px] font-medium max-lg:text-center">
                        {title}
                    </h2>
                    <div
                        dangerouslySetInnerHTML={{ __html: text }}
                        class="text-grayscale-600 max-w-[500px] hidden md:block"
                    />
                    <div
                        dangerouslySetInnerHTML={{ __html: mobileText }}
                        class="text-grayscale-600 max-w-[500px] md:hidden"
                    />
                </div>

                <form
                    class="flex flex-col items-center gap-4 w-full max-w-[300px]"
                    onSubmit={handleSubmit}
                >
                    <div class="flex flex-col gap-2 w-full">
                        <div class="flex flex-col gap-0.5 w-full">
                            <label
                                for="name"
                                class="text-grayscale-0 text-sm font-medium"
                            >
                                Nome
                            </label>
                            <div class="bg-grayscale-0 px-3 rounded flex items-center gap-2 border border-grayscale-200 overflow-hidden w-full">
                                <Icon
                                    id="User"
                                    size={20}
                                    class="text-slot-primary-500"
                                />
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Digite seu nome"
                                    required
                                    class="text-sm flex-1 outline-0 py-3 w-full"
                                />
                            </div>
                        </div>
                        <div class="flex flex-col gap-0.5 w-full">
                            <label
                                for="email"
                                class="text-grayscale-0 text-sm font-medium"
                            >
                                Email
                            </label>
                            <div class="bg-grayscale-0 px-3 rounded flex items-center gap-2 border border-grayscale-200 overflow-hidden w-full">
                                <Icon
                                    id="email"
                                    size={20}
                                    class="text-slot-primary-500"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Exemplo@email.com"
                                    required
                                    class="text-sm flex-1 outline-0 py-3 w-full"
                                />
                            </div>
                        </div>
                        <div class="flex flex-col gap-0.5 w-full">
                            <label
                                for="whatsapp"
                                class="text-grayscale-0 text-sm font-medium"
                            >
                                WhatsApp
                            </label>
                            <div class="bg-grayscale-0 px-3 rounded flex items-center gap-2 border border-grayscale-200 overflow-hidden w-full">
                                <Icon
                                    id="wpp-new"
                                    size={20}
                                    class="text-slot-primary-500"
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    placeholder="Digite seu telefone (WhatsApp)"
                                    required
                                    maxLength={15}
                                    class="text-sm flex-1 outline-0 py-3 w-full"
                                    onChange={(e) => {
                                        e.currentTarget.value = phoneMask(
                                            e.currentTarget.value,
                                        );
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {messageAlert.value.message && (
                        <div
                            class={`text-sm p-2 rounded w-full text-center ${
                                messageAlert.value.mode === "success"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                            }`}
                        >
                            {messageAlert.value.message}
                        </div>
                    )}

                    <button
                        type="submit"
                        class="bg-slot-primary-500 text-grayscale-0 text-sm font-medium px-8 py-3.5 rounded-2xl shadow-md"
                        disabled={loading.value}
                    >
                        {loading.value ? "Enviando..." : "Quero ser avisado"}
                    </button>
                </form>
            </div>
        </div>
    );
}
