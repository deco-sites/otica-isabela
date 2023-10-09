import Icon from '$store/components/ui/Icon.tsx';
import { useSignal } from '@preact/signals';
import Modal from 'deco-sites/otica-isabela/components/ui/NewModal.tsx';
import { getDevice } from 'deco-sites/otica-isabela/sdk/getDevice.ts';
import { BASE_EXPERIMENTER_URL } from '../../sdk/constants/index.ts';

interface Props {
  image: string;
  variant?: 'outlined' | 'filled';
  size?: 'small' | 'large';
}

const style = {
  outlined: 'bg-white text-black hover:text-white hover:bg-black',
  filled: 'bg-black text-white hover:text-black hover:bg-white',
};

const sizing = {
  small: {
    iconW: 21,
    iconH: 19,
    style: 'text-xs lg:text-sm',
  },
  large: {
    iconW: 40,
    iconH: 37,
    style: 'text-lg',
  },
};

const ToExperimentButton = ({ image }: Props) => {
  const isExperimenting = useSignal(false);
  const device = getDevice();
  const toggleExperimenter = () => {
    isExperimenting.value = !isExperimenting.value;
  };

  return (
    <>
      <button
        class="flex flex-row flex-nowrap items-center gap-x-3 btn btn-outline lg:w-full  border-black font-bold group hover:bg-black w-[200px] px-[22px] py-[5px] xxs:w-60 xxs:px-[26px] xxs:py-[9px] "
        onClick={toggleExperimenter}
      >
        <span class="flex items-center">
          <Icon
            id="Camera"
            class="max-xxs:hidden group-hover:invert"
            width={40}
            height={37}
          />
          <Icon
            id="Camera"
            class="xxs:hidden group-hover:invert"
            width={25}
            height={23}
          />
        </span>
        <p class="max-xxs:text-xl text-2xl text-black group-hover:text-white">
          Experimentar
        </p>
      </button>

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
          ></iframe>
        </div>
      </Modal>
    </>
  );
};

export default ToExperimentButton;
