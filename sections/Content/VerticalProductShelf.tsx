import { IconTitle } from "$store/components/ui/IconTitle.tsx";
import type { IconTitleProps } from "$store/components/ui/IconTitle.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import type { Image as ImageProps } from "deco-sites/std/components/types.ts";
import type { Context } from "deco-sites/std/packs/vtex/accounts/vtex.ts";
import type { SectionProps } from "$live/mod.ts";
import ProductCard from "$store/components/product/ProductCard.tsx";
import { useId } from "preact/hooks";
import SliderJS from "$store/islands/SliderJS.tsx";
import Slider from "$store/components/ui/Slider.tsx";

export interface Props {
  headerSection?: IconTitleProps;
  image?: {
    src?: ImageProps;
    alt?: string;
  };
}

export async function loader(
  { ...props }: Props,
  req: Request,
  ctx: Context,
) {
  const products = await ctx.invoke(
    "deco-sites/std/loaders/vtex/intelligentSearch/productList.ts",
    { ids: ["186", "406", "281", "301", "151"] },
  );

  return { ...props, products };
}

const VerticalProductShelf = (
  { headerSection, image, products }: SectionProps<typeof loader>,
) => {
  if (!products || !products?.length) {
    return null;
  }

  const id = useId();
  const { src, alt } = image ?? {};

  const arrangedProducts = Array.from(
    { length: Math.ceil(products?.length / 2) },
    (_, index) => products?.slice(index * 2, index * 2 + 2),
  );

  return (
    <section class="flex flex-col">
      <IconTitle {...headerSection} />
      <div class="w-full container flex flex-col  items-center justify-center  lg:flex-row lg:justify-between">
        <div class="w-2/5">
          <div
            id={id}
            class="container flex flex-col"
          >
            <Slider class="carousel">
              {arrangedProducts?.map((allProducts, index) => (
                <Slider.Item
                  index={index}
                  class="carousel-item  w-full flex flex-col"
                >
                  {allProducts.map((product) => (
                    <ProductCard
                      product={product}
                    />
                  ))}
                </Slider.Item>
              ))}
            </Slider>

            <SliderJS
              rootId={id}
            />

            <div class="flex flex-row w-full gap-x-3 justify-center items-center py-14 ">
              {arrangedProducts.map((_, index) => (
                <Slider.Dot index={index}>
                  <div class=" w-[10px] h-[10px] rounded-3xl bg-blue-200  ">
                  </div>
                </Slider.Dot>
              ))}
            </div>
          </div>
        </div>

        <div class="w-3/5">
          <Image
            width={450}
            src={src ?? ""}
            alt={alt ?? ""}
          />
        </div>
      </div>
    </section>
  );
};

export default VerticalProductShelf;
