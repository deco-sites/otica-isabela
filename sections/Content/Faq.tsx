import { HeaderTitle } from "$store/components/ui/HeaderTitle.tsx";
import type { Props as HeaderProps } from "$store/components/ui/HeaderTitle.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";
import FaqContainer from "$store/islands/FaqContainer.tsx";

export interface Question {
  /**
   * @title Duvida
   */
  label: string;
  /**
   *  @title Resposta
   *  @format html */
  answer: string;
}

export interface Props {
  header?: HeaderProps;
  /**
   * @format color
   * @title Cor do Fundo
   */
  backgroundColor?: string;
  /** @title Imagem */
  desktopImage?: {
    /** @title Imagem */
    src: LiveImage;
    /** @title Alt */
    description: string;
  };
  /**
   * @title Duvidas
   */
  questions?: Question[];
}

function Question({ label, answer }: Question) {
  return (
    <>
      <div className="collapse collapse-arrow">
        <input
          id={`${label}-collapse`}
          type="radio"
          name="faq-help-accordion"
        />
        <label
          for={`${label}-collapse`}
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
  { header, desktopImage, questions, backgroundColor }: Props,
) {
  return (
    <>
      <div class="w-full flex justify-center items-center bg-gray-scale-100 px-4 lg:px-0 ">
        <div class="w-full max-w-xl  text-center">
          {header ? <HeaderTitle {...header} /> : null}
        </div>
      </div>

      <FaqContainer backgroundColor={backgroundColor}>
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
      </FaqContainer>
    </>
  );
}
