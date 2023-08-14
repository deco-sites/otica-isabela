import { IconTitle } from "$store/components/ui/IconTitle.tsx";
import type { IconTitleProps } from "$store/components/ui/IconTitle.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "preact/hooks";
import TestimonialItem from "$store/components/ui/TestimonialItem.tsx";
import type { Testimonial } from "$store/components/ui/TestimonialItem.tsx";
import { ProductShelfDots } from "$store/components/product/ProductShelf.tsx";

export interface Props {
  header?: IconTitleProps;
  testimonials?: Testimonial[];
}

export default function Testimonials(
  { header, testimonials }: Props,
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
            {testimonials?.map((review, index) => (
              <Slider.Item
                index={index}
                class="flex flex-col gap-4 carousel-item w-full"
              >
                <TestimonialItem {...review} />
              </Slider.Item>
            ))}
          </Slider>

          <div class="flex flex-row w-full gap-x-3 justify-center items-center py-14 ">
            {testimonials?.map((_, index) => (
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
