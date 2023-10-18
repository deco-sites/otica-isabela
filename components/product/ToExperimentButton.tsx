import Icon from "$store/components/ui/Icon.tsx";
import { useSignal } from "@preact/signals";
import Modal from "deco-sites/otica-isabela/components/ui/NewModal.tsx";
import { BASE_EXPERIMENTER_URL } from "deco-sites/otica-isabela/sdk/constants/index.ts";
import { getDevice } from "deco-sites/otica-isabela/sdk/getDevice.ts";

interface Props {
  image: string;
  variant?: "outlined" | "filled";
  size?: "small" | "large";
}

const style = {
  outlined: "bg-white text-black hover:text-white hover:bg-black",
  filled: "bg-black text-white hover:text-black hover:bg-white",
};

const sizing = {
  small: {
    iconW: 21,
    iconH: 19,
    style: "text-xs lg:text-sm",
  },
  large: {
    iconW: 40,
    iconH: 37,
    style: "text-2xl font-bold px-[50px] py-[9px]",
  },
};

const ToExperimentButton = ({
  image,
  variant = "outlined",
  size = "large",
}: Props) => {
  const isExperimenting = useSignal(false);
  const device = getDevice();
  const toggleExperimenter = () => {
    isExperimenting.value = !isExperimenting.value;
  };

  return (
    <>
      {/* Experimenter */}
      <button
        class={`w-full group flex items-center justify-between border border-black rounded-[4px]  font-bold2 lg:rounded-[9px] lg:h-14 ${style[variant]} ${sizing[size].style}`}
        onClick={toggleExperimenter}
      >
        <span class="hidden lg:flex">
          <Icon
            id="Camera"
            class={`${
              variant === "outlined"
                ? "group-hover:invert"
                : "group-hover:invert-0"
            } text-black`}
            width={sizing[size].iconW}
            height={sizing[size].iconH}
            filter={variant === "outlined" ? "none" : "invert()"}
          />
        </span>
        <span class="flex lg:hidden">
          <Icon
            id="Camera"
            class="group-hover:invert text-black"
            width={17}
            height={17}
            filter={variant === "outlined" ? "none" : "invert()"}
          />
        </span>
        <p>Experimentar</p>
      </button>
      {/* Modal */}
      {isExperimenting.value ? (
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
            ></iframe>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default ToExperimentButton;
