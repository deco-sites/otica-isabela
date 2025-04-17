import Icon from "$store/components/ui/Icon.tsx";
import { useSignal } from "@preact/signals";
import Modal from "$store/components/ui/NewModal.tsx";
import { getDevice } from "$store/sdk/getDevice.ts";

interface Props {
  image: string;
  variant?: "outlined" | "filled";
  size?: "tiny" | "small" | "large";
}

const STYLE = {
  outlined: "bg-white text-grayscale-700 hover:text-slot-primary-500",
  filled: "bg-white text-grayscale-700 hover:text-slot-primary-500",
};

const SIZING = {
  tiny: {
    iconW: 16,
    iconH: 14,
    style: "text-xs rounded-[4px] lg:text-sm max-lg:w-auto gap-[10px] p-[10px]",
  },
  small: {
    iconW: 25,
    iconH: 23,
    style: "text-xs lg:text-sm max-lg:w-auto rounded-[15px] gap-2 py-1.5 px-4",
  },
  large: {
    iconW: 40,
    iconH: 37,
    style:
      "lg:text-2xl text-xl max-lg:w-[250px] rounded-[9px] gap-4 py-[5px] px-5 xxs:py-[9px] xxs:px-4 2xl:px-12",
  },
};

const ToExperimentButton = ({
  image,
  variant = "outlined",
  size = "small",
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
        class={`group flex items-center justify-center border border-black hover:border-slot-primary-500 font-semibold w-full 
		      ${STYLE[variant]} ${SIZING[size].style}`}
        onClick={toggleExperimenter}
      >
        <span class="">
          <Icon
            id="Camera"
            class={`text-black`}
            width={SIZING[size].iconW}
            height={SIZING[size].iconH}
            // filter={variant === "outlined" ? "none" : "invert()"}
            style={{ color: "black" }}
          />
        </span>
        {
          /* <span class="flex lg:hidden">
          <Icon
            id="Camera"
            class="group-hover:invert text-black"
            width={SIZING[size].iconW}
            height={SIZING[size].iconH}
            filter={variant === "outlined" ? "none" : "invert()"}
            style={{ color: "black" }}
          />
        </span> */
        }
        <p class="hover:underline">Experimentar</p>
      </button>

      {/* Modal */}
      {isExperimenting.value
        ? (
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
                src={`/view/experimentador.html?oculos=${image}&tipo=${device}`}
              >
              </iframe>
            </div>
          </Modal>
        )
        : null}
    </>
  );
};

export default ToExperimentButton;
