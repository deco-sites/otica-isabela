import Modal from "deco-sites/otica-isabela/components/ui/NewModal.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { BASE_EXPERIMENTER_URL } from "../../sdk/constants/index.ts";
import { useSignal } from "@preact/signals";

interface Props {
  device: string;
  image: string;
}

const ToExperimentButton = ({ device, image }: Props) => {
  const isExperimenting = useSignal(false);

  const toggleExperimenter = () => {
    isExperimenting.value = !isExperimenting.value;
  };

  return (
    <>
      {/* Experimenter */}
      <div class="w-full flex items-center justify-center">
        <button
          class="flex items-center justify-center h-14 gap-x-3 group btn btn-outline w-60 lg:w-full  border-black font-bold text-xl lg:text-2xl text-black hover:text-white hover:bg-black py-2"
          onClick={toggleExperimenter}
        >
          <span class="hidden lg:flex">
            <Icon
              id="Camera"
              class="group-hover:invert"
              width={40}
              height={37}
            />
          </span>
          <span class="flex lg:hidden">
            <Icon
              id="Camera"
              class="group-hover:invert"
              width={25}
              height={23}
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
