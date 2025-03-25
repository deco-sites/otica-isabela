import { FnContext } from "deco/mod.ts";
import { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "$store/components/ui/Icon.tsx";

/**
 * @titleBy title
 */
interface Card {
  /**
   * @title Ícone
   */
  icon: ImageWidget;
  /**
   * @title Descreva o ícone
   */
  alt: string;
  /**
   * @title Titulo
   */
  title: string;
  /**
   * @title Texto
   */
  text: HTMLWidget;
  /**
   * @title Texto no mobile
   */
  mobileText?: HTMLWidget;
  /**
   * @title Texto do botão
   */
  buttonText: string;
  /**
   * @title Link
   */
  link: string;
}

interface Props {
  title: string;
  /**
   * @title Lista de cards
   * @minItems 3
   * @maxItems 3
   */
  cards: Card[];
  /**
   * @title Texto de baixo
   */
  bottomText: HTMLWidget;
}

export default function ({
  title,
  cards,
  bottomText,
  isMobile,
}: ReturnType<typeof loader>) {
  return (
    <div class="bg-[#f3f3f3] flex flex-col pt-5 text-black">
      <div class="max-w-[1200px] w-[95%] mx-auto">
        <div class="flex items-center gap-1 text-xs mb-10 min-[768px]:mb-7">
          <a href="/" class="text-[#d39d4e] underline">
            Home
          </a>
          <Icon id="ChevronRight" size={12} strokeWidth={2} />
          <span class="text-[#9a9a9a]">Contato</span>
        </div>
      </div>
      <h1 class="text-4xl font-bold mb-10 min-[768px]:mb-16 text-center">
        {title}
      </h1>
      <div class="flex flex-col min-[768px]:flex-row gap-x-10 gap-y-2.5 mb-10 max-w-[1140px] mx-auto max-[768px]:w-[95%]">
        {cards.map((card) => (
          <a
            href={card.link}
            class="flex min-[768px]:flex-col items-center gap-2.5 py-4 min-[768px]:pt-10 min-[768px]:pb-8 px-5 bg-white hover:shadow-[0_0_18px_rgba(0,0,0,.12)] min-[768px]:min-h-[260px] w-full min-[768px]:w-1/3 rounded-[10px] group"
          >
            <Image
              src={card.icon}
              alt={card.alt}
              width={isMobile ? 26 : 36}
              height={isMobile ? 26 : 36}
            />
            <strong class="font-medium text-xl min-[768px]:text-2xl group-hover:text-[#d39d4e] min-[768px]:ml-1">
              {card.title}
            </strong>
            <div
              class={" text-[#646464] text-lg leading-[1.3]" +
                " [&_strong]:text-black [&_strong]:text-base text-center max-[768px]:ml-auto"}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: isMobile ? card.mobileText ?? "" : card.text,
                }}
              />
            </div>
            {!isMobile && (
              <span class="flex justify-center items-center bg-[#d39d4e] hover:bg-[#dcb171] rounded-md transition-colors text-center select-none outline-0 cursor-pointer whitespace-nowrap w-full min-[768px]:w-[200px] h-10 px-5 mt-[12px] max-w-[300px] text-white">
                {card.buttonText}
              </span>
            )}
          </a>
        ))}
      </div>
      <div class="mb-10 leading-5 text-sm">
        <p dangerouslySetInnerHTML={{ __html: bottomText }} />
      </div>
    </div>
  );
}

export function loader(props: Props, req: Request, ctx: FnContext) {
  return { ...props, url: req.url, isMobile: ctx.device !== "desktop" };
}
