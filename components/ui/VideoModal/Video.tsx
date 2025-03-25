import Image from "apps/website/components/Image.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/VideoModal/Button.tsx";
import Modal from "$store/components/ui/VideoModal/Modal.tsx";
import { IImage } from "$store/sdk/types.ts";
import { useId } from "preact/hooks";

export interface Props {
  thumbnail: IImage;
  /**
   * @format uri
   */
  videoUrl: string;
}

export default function Video({
  thumbnail = {
    alt: "placeholder",
    height: 400,
    width: 600,
    src: "https://fakeimg.pl/600x400",
  },
  videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ",
}: Props) {
  const id = useId();

  return (
    <div class="relative">
      <Image class="w-full object-cover h-full" {...thumbnail} />
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
