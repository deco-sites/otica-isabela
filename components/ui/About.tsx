import type { Props as HeaderProps } from "./HeaderTitle.tsx";
import { HeaderTitle } from "./HeaderTitle.tsx";
import { useId } from "$store/sdk/useId.ts";

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
  const id = useId();

  return (
    <>
      {header ? <HeaderTitle {...header} /> : null}
      <div class="container px-4 lg:px-0">
        <input type="checkbox" name="see-more" id={id} class="peer hidden" />
        <span
          class="w-full text-start  "
          dangerouslySetInnerHTML={{
            __html: firstPart ?? "",
          }}
        />
        {secondPart && (
          <>
            <span
              class="w-full text-start my-6 peer-checked:block hidden"
              dangerouslySetInnerHTML={{
                __html: secondPart ?? "",
              }}
            />
            {shouldShowSeeMoreButton && (
              <label
                htmlFor={id}
                class="text-white text-xs bg-black px-6 py-3 my-4 rounded-lg inline-block peer-checked:[&>span:nth-child(2)]:hidden [&>span:first-child]:hidden peer-checked:[&>span:first-child]:block cursor-pointer"
              >
                <span>ver menos</span>
                <span>ver mais</span>
              </label>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default About;
