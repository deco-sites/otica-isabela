import type { Props as HeaderProps } from "./HeaderTitle.tsx";
import { HeaderTitle } from "./HeaderTitle.tsx";
import { useId } from "deco-sites/otica-isabela/sdk/useId.ts";

interface AboutProps {
  header?: HeaderProps;
  /**
   * @title Primeira Parte
   * @description Texto que sempre estará visível
   * @format html
   */
  firstPart?: string;
  /**
   * @title Segunda Parte
   * @description Texto que aparecerá ao clicar em 'ver mais'
   * @format html
   */
  secondPart?: string;
  /**
   * @title Ver mais (botão)
   * @description Controla se irá ou não exibir o botão 'Ver mais'
   */
  shouldShowSeeMoreButton?: boolean;
}

const AboutSection = ({
  header,
  firstPart,
  secondPart,
  shouldShowSeeMoreButton,
}: AboutProps) => {
  const id = useId();

  return (
    <>
      {header ? <HeaderTitle {...header} /> : null}
      <div class="container px-4 lg:px-0">
        <input type="checkbox" name="see-more" id={id} class="peer hidden" />
        <span
          class="w-full text-start"
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

interface PrivacyPolicyProps {
  title?: string;
  content: string;
}

const PrivacyPolicySection = ({
  title,
  content,
}: PrivacyPolicyProps): JSX.Element => {
  return (
    <section class="container mx-auto px-4 py-8">
      {title && <h1 class="text-2xl font-bold mb-4">{title}</h1>}
      <div
        class="text-lg leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  );
};

export { AboutSection, PrivacyPolicySection };
