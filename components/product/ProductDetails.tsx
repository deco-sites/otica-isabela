import OtherColorsShelf from "deco-sites/otica-isabela/components/product/product-details/OtherColorsShelf.tsx";
import type { SectionProps } from "$live/mod.ts";
import type { LoaderReturnType } from "$live/types.ts";
import { visitedProductsCookie } from "$store/components/constants.ts";
import type { ProductDetailsPage } from "apps/commerce/types.ts";
import type { AppContext } from "deco-sites/otica-isabela/apps/site.ts";
import Details from "deco-sites/otica-isabela/components/product/product-details/Details.tsx";
import { NotFound } from "deco-sites/otica-isabela/components/product/product-details/NotFound.tsx";
import { getCookies, setCookie } from "std/http/mod.ts";

export type Variant = "front-back" | "slider" | "auto";

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>;
  /**
   * @title Product view
   * @description Ask for the developer to remove this option since this is here to help development only and should not be used in production
   */
  variant?: Variant;
}

function ProductDetails({
  page,
  variant: maybeVar = "auto",
}: SectionProps<typeof loader>) {
  const { product } = page || {};
  const variant =
    maybeVar === "auto"
      ? page?.product.image?.length && page?.product.image?.length < 2
        ? "front-back"
        : "slider"
      : maybeVar;

  return (
    <>
      <div class="lg:bg-gray-scale-100">
        <div class="container py-0 lg:py-[60px]">
          {page ? <Details page={page} variant={variant} /> : <NotFound />}
        </div>
      </div>
      <OtherColorsShelf product={product!} />
    </>
  );
}

export function loader({ ...props }: Props, req: Request, ctx: AppContext) {
  const productId: string | undefined = props.page?.product?.productID ?? "";

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
