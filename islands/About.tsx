import { HeaderTitle } from "../components/ui/HeaderTitle.tsx";
import type { Props as HeaderProps } from "../components/ui/HeaderTitle.tsx";
import { useSignal } from "@preact/signals";

interface Props {
  header?: HeaderProps;
  /**
   * @title Primeira Parte
   * @description Texto que sempre estará visível'
   * @format html
   */
  firstPart?: string;
  /**
   * @title Segunda Parte
   * @description Texto que aparecerá ao clicar em 'ver mais'
   * @format html */
  secondPart?: string;
  /**
   * @title Ver mais (botão)
   * @description Controla se irá ou não exibir o botão 'Ver mais'
   */
  shouldShowSeeMoreButton?: boolean;
}

const About = ({
  header,
  firstPart,
  secondPart,
  shouldShowSeeMoreButton,
}: Props) => {
  const showText = useSignal(false);

  return (
    <>
      {header ? <HeaderTitle {...header} /> : null}
      <div class="container px-4 lg:px-0">
        <span
          class="w-full text-start  "
          dangerouslySetInnerHTML={{
            __html: firstPart ?? "",
          }}
        />
        {secondPart && (
          <>
            {showText.value && (
              <span
                class="w-full text-start my-6 "
                dangerouslySetInnerHTML={{
                  __html: secondPart ?? "",
                }}
              />
            )}
            {shouldShowSeeMoreButton && (
              <button
                onClick={() => (showText.value = !showText.value)}
                class="text-white text-xs bg-black px-6 py-3 my-4 rounded-lg inline-block"
              >
                {showText.value ? "ver menos" : "ver mais"}
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default About;
