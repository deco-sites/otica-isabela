import { IconTitle } from "$store/components/ui/IconTitle.tsx";
import type { IconTitleProps } from "$store/components/ui/IconTitle.tsx";
import type { Image as ImageType } from "deco-sites/std/components/types.ts";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import ProductShelf from "$store/components/product/ProductShelf.tsx";
import VerticalProductShelf from "$store/components/product/VerticalProductShelf.tsx";

export interface Props {
  header?: IconTitleProps;
  products?: LoaderReturnType<Product[] | null>;
  image: {
    desktop: ImageType;
    mobile?: ImageType;
    alt: string;
    href?: string;
  };
  imageAlign?: {
    desktop: "left" | "right";
    mobile: "top" | "bottom";
  };
}

const ProductShelfAndImage = (
  { header, image, products, imageAlign }: Props,
) => {
  if (!products || !products?.length) {
    return null;
  }
  const { desktop, mobile, alt, href } = image;

  return (
    <section class="flex flex-col">
      <IconTitle {...header} />
      <div
        class={`w-full container  flex ${
          imageAlign?.mobile === "bottom" ? "flex-col" : "flex-col-reverse"
        } items-center justify-center gap-x-12  ${
          imageAlign?.desktop === "right"
            ? "lg:flex-row"
            : "lg:flex-row-reverse"
        } lg:justify-between lg:items-start mt-14 mb-24 lg:mb-6`}
      >
        <div class=" w-full lg:w-1/3">
          <div class="hidden lg:flex">
            <VerticalProductShelf products={products} />
          </div>
          <div class="flex mt-8 lg:hidden">
            <ProductShelf
              itemsPerPage={{ desktop: 3, mobile: 0 }}
              products={products}
            />
          </div>
        </div>

        <div class="w-full lg:w-2/3 px-8 lg:px-0">
          <a href={href}>
            <Picture>
              <Source
                media="(max-width: 983px)"
                src={mobile ?? desktop}
                width={350}
              />
              <Source
                media="(min-width: 984px)"
                src={desktop}
                width={700}
              />
              {
                <img
                  src={mobile ?? desktop}
                  alt={alt}
                  class="rounded-xl w-full"
                  decoding="async"
                  loading="lazy"
                />
              }
            </Picture>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductShelfAndImage;
