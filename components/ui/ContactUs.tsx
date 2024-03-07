import { FnContext } from "deco/mod.ts";
import { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

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
}: ReturnType<typeof loader>) {
  return (
    <div class="bg-[#f3f3f3] flex flex-col items-center">
      <h1 class="text-4xl font-bold">{title}</h1>
      <div class="flex gap-10">
        {cards.map((card) => (
          <a href={card.link} class="flex flex-col items-center gap-2.5">
            <Image src={card.icon} alt={card.alt} width={36} height={36} />
            <strong class="font-medium text-2xl">{card.title}</strong>
            {/* <p dangerouslySetInnerHTML={{ __html: card.text }} /> */}
            {/* <a href={card.link}>{card.buttonText}</a> */}
          </a>
        ))}
      </div>
      <p dangerouslySetInnerHTML={{ __html: bottomText }} />
    </div>
  );
}

export function loader(props: Props, req: Request, ctx: FnContext) {
  return { ...props, url: req.url, isMobile: ctx.device !== "desktop" };
}
