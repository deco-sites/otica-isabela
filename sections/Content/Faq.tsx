import { IconTitle } from "$store/components/ui/IconTitle.tsx";
import type { IconTitleProps } from "$store/components/ui/IconTitle.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

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
  image?: LiveImage;
  /**
   * @title  Duvidas
   */
  questions?: Question[];
}

function Question({ label, answer }: Question) {
  return (
    <details class="collapse collapse-arrow join-item  ">
      <summary class="collapse-title text-black font-semibold text-2xl rounded-3xl  bg-gray-scale-100">
        {label}
      </summary>
      <div
        class="collapse-content mt-3 rounded-2xl bg-gray-scale-100 py-5 px-4 text-base"
        dangerouslySetInnerHTML={{ __html: answer }}
      />
    </details>
  );
}

export default function FAQ({ header, image, questions }: Props) {
  return (
    <>
      <div class="w-full flex justify-center items-center bg-gray-scale-100 px-4 lg:px-0 ">
        <div class="w-full max-w-xl  text-center">
          <IconTitle {...header} />
        </div>
      </div>

      <div class="w-full flex  items-center   justify-center px-4 lg:px-0  bg-white lg:bg-orange-600">
        <div class="w-full container flex flex-col  lg:flex-row  gap-x-3 ">
          {image && (
            <div
              class="w-full lg:w-1/2  bg-cover bg-no-repeat"
              style={{ backgroundImage: `url(${image})` }}
            />
          )}

          <div class="w-full lg:w-1/2 my-12 flex flex-col gap-y-8">
            {questions?.map((question) => <Question {...question} />)}
          </div>
        </div>
      </div>
    </>
  );
}
