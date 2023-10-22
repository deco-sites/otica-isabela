import Details from "deco-sites/otica-isabela/components/product/product-details/Details.tsx";
import OtherColorsShelf from "deco-sites/otica-isabela/components/product/product-details/OtherColorsShelf.tsx";
import SpecsDesktop from "deco-sites/otica-isabela/components/product/product-details/SpecsDesktop.tsx";
import SpecsMobile from "deco-sites/otica-isabela/components/product/product-details/SpecsMobile.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import type { SectionProps } from "$live/mod.ts";
import type { LoaderReturnType } from "$live/types.ts";
import { visitedProductsCookie } from "$store/components/constants.ts";
import type { ProductDetailsPage } from "apps/commerce/types.ts";
import type { AppContext } from "deco-sites/otica-isabela/apps/site.ts";
import { NotFound } from "deco-sites/otica-isabela/components/product/product-details/NotFound.tsx";
import { getCookies, setCookie } from "std/http/mod.ts";

type ButtonLabel = {
  category: string;
  label: string;
};

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>;
  measurementsImage?: LiveImage;
  buttonByCategory: ButtonLabel[];
}

function ProductDetails({
  page,
  measurementsImage,
  buttonByCategory,
}: SectionProps<typeof loader>) {
  const { product } = page || {};

  if (!product) return <NotFound />;

  return (
    <>
      <div class="lg:bg-gray-scale-100">
        <div class="container py-0 lg:py-[60px]">
          <Details page={page!} labels={buttonByCategory} />
        </div>
      </div>
      <OtherColorsShelf product={product!} />
      <SpecsDesktop product={product!} measurementsImage={measurementsImage!} />
      <SpecsMobile product={product!} measurementsImage={measurementsImage!} />
    </>
  );
}

export function loader({ ...props }: Props, req: Request, ctx: AppContext) {
  const productId: string | undefined = props.page?.product?.productID ?? "";

  if (!productId) return { ...props };

  const cookies = getCookies(req.headers);
  const currentIds: string[] | undefined =
    cookies?.[visitedProductsCookie]?.split(":") ?? [];

  const newIds = currentIds.some((id) => id === productId)
    ? currentIds
    : currentIds.concat([productId]);

  setCookie(ctx.response.headers, {
    name: visitedProductsCookie,
    value: newIds?.join(":"),
    path: "/",
  });

  return { ...props };
}

export default ProductDetails;
