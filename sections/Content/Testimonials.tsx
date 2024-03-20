import { HeaderTitle } from "../../components/ui/HeaderTitle.tsx";
import type { Props as HeaderProps } from "../../components/ui/HeaderTitle.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";

import { useId } from "deco-sites/otica-isabela/sdk/useId.ts";

import TestimonialItem from "$store/components/ui/TestimonialItem.tsx";

import type { MembershipBadgeProps } from "$store/components/ui/TestimonialItem.tsx";
import { Review } from "deco-sites/otica-isabela/packs/types.ts";
import type { LoaderReturnType } from "$live/types.ts";

export interface Props {
  header?: HeaderProps;
  /**
   * @title Medalhas de Membros
   * @description Utilize o campo label em Membership Badges para adicionar a classificação do cliente.
   */
  membershipBadges?: MembershipBadgeProps[];
  /**
   * @title Loader de Reviews
   */
  page: LoaderReturnType<Review[] | null>;
}

export default function Testimonials(
  { header, membershipBadges, page }: Props,
) {
  const id = useId();

  return (
    <>
      {header ? <HeaderTitle {...header} /> : null}
      <div class="w-full container px-4 py-8 flex flex-col gap-14 lg:gap-20 lg:py-10 lg:px-0">
        <div class="relative w-full" id={id}>
          <Slider class="carousel carousel-start gap-4 lg:gap-8 row-start-2 row-end-5 w-full">
            {page?.map((review, index) => (
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
            {page?.map((_, index) => <Slider.Dot index={index} />)}
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
