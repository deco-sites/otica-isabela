import { IconTitle } from "$store/components/ui/IconTitle.tsx";
import type { IconTitleProps } from "$store/components/ui/IconTitle.tsx";
import { useId } from "preact/hooks";

interface Props {
  header?: IconTitleProps;
  /** @format html */
  firstPart?: string;
  /** @format html */
  secondPart?: string;
}

interface Styles {
  [tag: string]: string;
}

const About = ({ header, firstPart, secondPart }: Props) => {
  const id = useId();
  const tagStyles = {
    p: "text-black text-sm py-2 ",
    h2: "text-black text-[28px] font-semibold my-4 ",
    a: "text-blue-100 underline hover:no-underline cursor-pointer z-50",
  };

  const applyStylesToHTML = (
    text: string,
    styles: Styles,
  ): string => {
    const tagPattern = /<(\w+)/g;

    const replaceText = (match: string, tag: string): string => {
      if (Object.prototype.hasOwnProperty.call(styles, tag)) {
        return `<${tag} class="${styles[tag]}"`;
      }
      return match;
    };

    return text.replace(tagPattern, replaceText);
  };

  return (
    <>
      <IconTitle {...header} />
      <div class="container px-4 lg:px-0">
        <label for={id}>
          <input
            type="checkbox"
            name={id}
            id={id}
            class="peer hidden  "
            frameBorder="none"
          />
          <span
            class="w-full text-start  "
            dangerouslySetInnerHTML={{
              __html: applyStylesToHTML(firstPart ?? "", tagStyles) ??
                "",
            }}
          />
          {secondPart && (
            <>
              <span
                class="w-full text-start ml-1 hidden peer-checked:inline-block "
                dangerouslySetInnerHTML={{
                  __html: applyStylesToHTML(secondPart ?? "", tagStyles) ??
                    "",
                }}
              />
              <span class="text-white text-xs bg-black px-5 py-2 my-4 rounded-lg inline-block peer-checked:hidden ">
                ver mais
              </span>
              <span class="text-white text-xs bg-black px-5 py-2 my-4 rounded-lg hidden peer-checked:inline-block  ">
                ver menos
              </span>
            </>
          )}
        </label>
      </div>
    </>
  );
};

export default About;
