import Image from "apps/website/components/Image.tsx";
import Icon from "deco-sites/otica-isabela/components/ui/Icon.tsx";
import Button from "deco-sites/otica-isabela/components/ui/VideoModal/Button.tsx";
import Modal from "deco-sites/otica-isabela/components/ui/VideoModal/Modal.tsx";
import { IImage } from "deco-sites/otica-isabela/sdk/types.ts";
import { useId } from "preact/hooks";

export interface Props {
  thumbnail: IImage;
  /**
   * @format uri
   */
  videoUrl: string;
}

export default function Video({ thumbnail, videoUrl }: Props) {
  const id = useId();

  return (
    <div class="relative">
      <Image class="w-full object-cover" {...thumbnail} />
      <Button
        modalId={id}
        class="absolute inset-0 bg-black/50 flex justify-center items-center"
      >
        <Icon id="Play" size={72} class="text-white" />
      </Button>
      <Modal url={videoUrl} modalId={id} />
    </div>
  );
}
