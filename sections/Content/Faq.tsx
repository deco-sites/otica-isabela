import { IconTitle } from "$store/components/ui/IconTitle.tsx";
import type { IconTitleProps } from "$store/components/ui/IconTitle.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";
import { useId } from "preact/hooks";

export interface Question {
  /**
   * @title  Duvida
   */
  label: string;

  /**
   *  @title  Resposta
   *  @format html */
  answer: string;
}

export interface Props {
  header?: IconTitleProps;
  desktopImage?: { src: LiveImage; description: string };

  /**
   * @title  Duvidas
   */
  questions?: Question[];
}

function Question({ label, answer }: Question) {
  const id = useId();
  return (
    <>
      <div className="collapse collapse-arrow">
        <input type="input" name="faq-help-accordion" />
        <label
          for={id}
          className="collapse-title text-black font-semibold text-[22px]  rounded-3xl  bg-gray-100"
        >
          {label}
        </label>
        <div className="collapse-content mt-3 rounded-2xl text-black  bg-gray-100 text-base mb-2">
          <span
            class="my-5 mx-4 text-base font-normal"
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        </div>
      </div>
    </>
  );
}

export default function FAQ(
  { header, desktopImage, questions }: Props,
) {
  return (
    <>
      <div class="w-full flex justify-center items-center bg-gray-scale-100 px-4 lg:px-0 ">
        <div class="w-full max-w-xl  text-center">
          <IconTitle {...header} />
        </div>
      </div>

      <div
        class={`w-full flex items-center justify-center px-4 lg:px-0 bg-white lg:bg-orange-600`}
      >
        <div class="w-full container flex flex-col lg:flex-row gap-x-3 ">
          {desktopImage && (
            <div class="w-full hidden lg:flex justify-center items-center lg:w-1/2">
              <Image
                class="max-h-[490px]"
                width={350}
                height={436}
                src={desktopImage.src}
                alt={desktopImage.description}
              />
            </div>
          )}

          <div class="w-full lg:w-1/2 my-12 flex flex-col justify-center items-center">
            {questions?.map((question) => <Question {...question} />)}
          </div>
        </div>
      </div>
    </>
  );
}
