import { IconTitle } from "$store/components/ui/IconTitle.tsx";
import type { IconTitleProps } from "$store/components/ui/IconTitle.tsx";
import { useSignal } from "@preact/signals";

interface Props {
  header?: IconTitleProps;
  /**
   * @title Primeira Parte
   * @format html
   */
  firstPart?: string;
  /**
   * @title Segunda Parte
   * @format html */
  secondPart?: string;
}

const About = ({ header, firstPart, secondPart }: Props) => {
  const showText = useSignal(false);

  return (
    <>
      <IconTitle {...header} />
      <div class="container px-4 lg:px-0">
        <span
          class="w-full text-start  "
          dangerouslySetInnerHTML={{
            __html: firstPart ??
              "",
          }}
        />
        {secondPart && showText.value && (
          <span
            class="w-full text-start my-6 "
            dangerouslySetInnerHTML={{
              __html: secondPart ?? "",
            }}
          />
        )}

        {secondPart && (
          <button
            onClick={() => showText.value = !showText.value}
            class="text-white text-xs bg-black px-6 py-3 my-4 rounded-lg inline-block"
          >
            {showText.value ? "ver menos" : "ver mais"}
          </button>
        )}
      </div>
    </>
  );
};

export default About;
