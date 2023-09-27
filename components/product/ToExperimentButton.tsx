import Modal from "deco-sites/otica-isabela/components/ui/NewModal.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { BASE_EXPERIMENTER_URL } from "../../sdk/constants/index.ts";
import { useSignal } from "@preact/signals";
import { getDevice } from "deco-sites/otica-isabela/sdk/getDevice.ts";

interface Props {
  image: string;
  variant?: "outlined" | "filled";
}

const variantClasses = {
  outlined: "bg-white text-black hover:text-white hover:bg-black lg:text-lg",
  filled: "bg-black text-white hover:text-black hover:bg-white lg:text-lg",
};

const ToExperimentButton = ({ image, variant = "outlined" }: Props) => {
  const isExperimenting = useSignal(false);
  const device = getDevice();
  const toggleExperimenter = () => {
    isExperimenting.value = !isExperimenting.value;
  };

  return (
    <>
      {/* Experimenter */}
      <div class="w-full flex items-center justify-center">
        <button
          class={`group flex items-center lg:h-14 p-0 text-xs justify-center btn w-full border-black sm:py-2 ${
            variantClasses[variant]
          }`}
          onClick={toggleExperimenter}
        >
          <span class="hidden lg:flex">
            <Icon
              id="Camera"
              class={variant === "outlined"
                ? "group-hover:invert"
                : "group-hover:invert-0"}
              width={40}
              height={37}
              filter={variant === "outlined" ? "none" : "invert()"}
            />
          </span>
          <span class="flex lg:hidden">
            <Icon
              id="Camera"
              class="group-hover:invert"
              width={17}
              height={17}
              filter={variant === "outlined" ? "none" : "invert()"}
            />
          </span>
          Experimentar
        </button>
      </div>

      {/* Modal */}
      <Modal
        class="p-0 rounded-md md:min-w-[673px]"
        open={isExperimenting.value}
        onClose={toggleExperimenter}
      >
        <div id="header" class="text-left sticky bg-white top-0">
          <div class="flex items-center justify-between">
            <h1 class="text-xs font-bold p-2">Experimentador de óculos</h1>
            <Icon
              class="mr-1 cursor-pointer"
              id="XMark"
              width={25}
              height={23}
              onClick={toggleExperimenter}
            />
          </div>
          <span class="border-b block"></span>
        </div>
        <div id="content" class="min-h-[512px] p-2">
          <iframe
            class="w-full"
            width="640"
            height="480"
            src={`${BASE_EXPERIMENTER_URL}?oculos=${image}&tipo=${device}`}
          >
          </iframe>
        </div>
      </Modal>
    </>
  );
};

export default ToExperimentButton;
