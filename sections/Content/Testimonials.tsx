import { IconTitle } from "$store/components/ui/IconTitle.tsx";
import type { IconTitleProps } from "$store/components/ui/IconTitle.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "preact/hooks";
import TestimonialItem from "$store/components/ui/TestimonialItem.tsx";
import { ProductShelfDots } from "$store/components/product/ProductShelf.tsx";
import type {
  MembershipBadgeProps,
  Review,
} from "$store/components/ui/TestimonialItem.tsx";

export interface Props {
  header?: IconTitleProps;

  /**
   * @description Utilize o campo label em Membership Badges para adicionar a classificação do cliente.
   */
  membershipBadges?: MembershipBadgeProps[];
}

const REVIEW_MOCK: Review[] = [
  {
    additionalImage:
      "https://www.oticaisabeladias.com.br//Images/Blob/Avaliacoes//876231b79dc743c1860a4b7e8d3d8cc7.webp",
    authorCity: "Florianópolis - SC",
    authorName: "Maria Fernanda",
    productLink:
      "/produto/Armacao-Oculos-Clipon-Grau-Feminino-1271-Isabela-Dias",
    productName: "Óculos Clipon Redondo Feminino 1271",
    productPhoto:
      "https://www.oticaisabeladias.com.br/backoffice//Images/Blob/webp_id//53f3483dfa624952aff955a695e069d9-2.webp",
    ratingValue: 5,
    reviewDescription:
      "Os óculos chegaram bem rápido (pedi Sedex) e bem embalados, o que era uma das minhas maiores preocupações. Eles foram elogiados pela pessoa mais importantes, minha oftalmologista! Ela disse que ficaram muito bons e realmente, mesmo sendo um grau maior minha lente ficou mais fina que a anterior. As lentes clip-on são muito estilosas também. Recomendo 100%",
  },
  {
    additionalImage:
      "https://www.oticaisabeladias.com.br//Images/Blob/Avaliacoes//876231b79dc743c1860a4b7e8d3d8cc7.webp",
    authorCity: "Florianópolis - SC",
    authorName: "Maria Fernanda",
    productLink:
      "/produto/Armacao-Oculos-Clipon-Grau-Feminino-1271-Isabela-Dias",
    productName: "Óculos Clipon Redondo Feminino 1271",
    productPhoto:
      "https://www.oticaisabeladias.com.br/backoffice//Images/Blob/webp_id//53f3483dfa624952aff955a695e069d9-2.webp",
    ratingValue: 5,
    reviewDescription:
      "Os óculos chegaram bem rápido (pedi Sedex) e bem embalados, o que era uma das minhas maiores preocupações. Eles foram elogiados pela pessoa mais importantes, minha oftalmologista! Ela disse que ficaram muito bons e realmente, mesmo sendo um grau maior minha lente ficou mais fina que a anterior. As lentes clip-on são muito estilosas também. Recomendo 100%",
    memberLevel: "gold",
  },
  {
    additionalImage:
      "https://www.oticaisabeladias.com.br//Images/Blob/Avaliacoes//876231b79dc743c1860a4b7e8d3d8cc7.webp",
    authorCity: "Florianópolis - SC",
    authorName: "Maria Fernanda",
    productLink:
      "/produto/Armacao-Oculos-Clipon-Grau-Feminino-1271-Isabela-Dias",
    productName: "Óculos Clipon Redondo Feminino 1271",
    productPhoto:
      "https://www.oticaisabeladias.com.br/backoffice//Images/Blob/webp_id//53f3483dfa624952aff955a695e069d9-2.webp",
    ratingValue: 5,
    reviewDescription:
      "A ótica Isabela Dias trabalha com preço justo, qualidade impecável e um atendimento incrível. Sou fã dessa ótica! ",
    memberLevel: "vip",
  },
];

export default function Testimonials(
  { header, membershipBadges }: Props,
) {
  const id = useId();

  return (
    <>
      <IconTitle {...header} />
      <div class="w-full container px-4 py-8 flex flex-col gap-14 lg:gap-20 lg:py-10 lg:px-0">
        <div
          class="relative w-full px-8"
          id={id}
        >
          <Slider class="carousel carousel-start gap-4 lg:gap-8 row-start-2 row-end-5 w-full">
            {REVIEW_MOCK?.map((review, index) => (
              <Slider.Item
                index={index}
                class="flex flex-col gap-4 carousel-item w-full"
              >
                <TestimonialItem
                  membershipBadges={membershipBadges}
                  review={review}
                />
              </Slider.Item>
            ))}
          </Slider>

          <div class="flex flex-row w-full gap-x-3 justify-center items-center py-14 ">
            {REVIEW_MOCK?.map((_, index) => (
              <Slider.Dot index={index}>
                {ProductShelfDots}
              </Slider.Dot>
            ))}
          </div>

          <SliderJS
            itemsPerPage={{ desktop: { 0: 2 }, mobile: { 0: 1 } }}
            rootId={id}
          />
        </div>
      </div>
    </>
  );
}
