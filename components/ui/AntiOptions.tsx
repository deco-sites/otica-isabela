import { FnContext } from "deco/mod.ts";
import { HTMLWidget } from "apps/admin/widgets.ts";
import { chunk } from "std/collections/chunk.ts";

interface Props {
  /**
   * @title Titulo
   */
  title: string;
  /**
   * @title Descrição
   */
  description: string;
  /**
   * @title Opções
   */
  options: HTMLWidget[];
}

export default function ({
  title,
  description,
  options,
  isMobile,
}: ReturnType<typeof loader>) {
  const [left, right] = chunk(options, 3);

  return (
    <div class="max-[768px]:pt-7 max-[768px]:pb-12 py-[84px] bg-[#f0ebe7] mb-5 min-[768px]:mb-[90px]">
      <h2 class="text-4xl max-[768px]:text-2xl font-medium text-center mb-5">
        {title}
      </h2>
      <p class="text-center mb-11">{description}</p>
      <div class="max-w-[1200px] mx-auto w-[95%]">
        {isMobile
          ? (
            <div class="flex flex-col gap-10">
              {options.map((chunk) => (
                <div
                  dangerouslySetInnerHTML={{ __html: chunk }}
                  class={"px-10" +
                    " [&_strong]:text-xl [&_strong]:font-medium [&_strong]:leading-none" +
                    " [&_p]:font-light [&_p:not(:has(:is(strong,a)))]:leading-[1.3]" +
                    " [&_a]:text-[#d39d4e] [&_a]:text-sm [&_a]:underline [&_a:hover]:text-[#b47d2e]" +
                    " [&_sup]:text-[9px] [&_sup]:relative [&_sup]:-top-2.5"}
                />
              ))}
            </div>
          )
          : (
            <div class="flex">
              <div class="flex flex-col w-1/2 border-r border-r-[#b9b9b9]">
                {left.map((chunk) => (
                  <div
                    dangerouslySetInnerHTML={{ __html: chunk }}
                    class={"min-h-44 px-10" +
                      " [&_strong]:text-xl [&_strong]:font-medium [&_strong]:leading-none" +
                      " [&_p]:font-light [&_p:not(:has(:is(strong,a)))]:leading-[1.3]" +
                      " [&_a]:text-[#d39d4e] [&_a]:text-sm [&_a]:underline [&_a:hover]:text-[#b47d2e]" +
                      " [&_sup]:text-[9px] [&_sup]:relative [&_sup]:-top-2.5"}
                  />
                ))}
              </div>
              <div class="flex flex-col w-1/2">
                {right.map((chunk) => (
                  <div
                    dangerouslySetInnerHTML={{ __html: chunk }}
                    class={"min-h-44 pr-10 pl-7 min-[1000px]:pl-[72px]" +
                      " [&_strong]:text-xl [&_strong]:font-medium [&_strong]:leading-none" +
                      " [&_p]:font-light [&_p:not(:has(:is(strong,a)))]:leading-[1.3]" +
                      " [&_a]:text-[#d39d4e] [&_a]:text-sm [&_a]:underline [&_a:hover]:text-[#b47d2e]" +
                      " [&_sup]:text-[9px] [&_sup]:relative [&_sup]:-top-2.5"}
                  />
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

export function loader(props: Props, req: Request, ctx: FnContext) {
  return { ...props, url: req.url, isMobile: ctx.device !== "desktop" };
}
