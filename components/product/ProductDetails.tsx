import Details from "deco-sites/otica-isabela/components/product/product-details/Details.tsx";
import OtherColorsShelf from "deco-sites/otica-isabela/components/product/product-details/OtherColorsShelf.tsx";
import SpecsDesktop from "deco-sites/otica-isabela/components/product/product-details/SpecsDesktop.tsx";
import SpecsMobile from "deco-sites/otica-isabela/components/product/product-details/SpecsMobile.tsx";
import { BestOffersHeader } from "deco-sites/otica-isabela/components/ui/BestOffersHeader.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import type { SectionProps } from "deco/mod.ts";
import type { LoaderReturnType } from "deco/types.ts";
import { visitedProductsCookie } from "$store/components/constants.ts";
import type { ProductDetailsPage } from "apps/commerce/types.ts";
import type { AppContext } from "deco-sites/otica-isabela/apps/site.ts";
import { NotFound } from "deco-sites/otica-isabela/components/product/product-details/NotFound.tsx";
import { getCookies, setCookie } from "std/http/mod.ts";
import { redirect } from "deco/mod.ts";

type ButtonLabel = {
  category: string;
  label: string;
};
export interface Promotion {
  /** @title Texto */
  label: string;

  /** @title Texto da Flag */
  /** @description Você pode usar %value para substituir pelo preço do produto */
  flagText: string;
}

export interface Props {
  /** @title Configurações do Loader */
  page: LoaderReturnType<ProductDetailsPage | null>;

  /** @title Imagem das Medidas  */
  measurementsImage?: LiveImage;

  /** @title Thumb para Video */
  videoThumb?: LiveImage;

  /** @title Configurações de Promoções */
  promotions?: Promotion[];

  /** Label dos Botões por Categoria */
  buttonByCategory?: ButtonLabel[];
}

function ProductDetails({
  page,
  measurementsImage,
  promotions,
  buttonByCategory,
  videoThumb,
}: SectionProps<typeof loader>) {
  const { product } = page || {};
  const { offers } = product || {};
  const priceValidUntil = offers?.offers.at(0)?.priceValidUntil;

  return (
    <>
      <div class="lg:bg-gray-scale-100">
        {/* Stopwatch */}
        {priceValidUntil && (
          <BestOffersHeader
            priceValidUntil={new Date(priceValidUntil!)}
            page={"details"}
          />
        )}
        <div class="container py-0 lg:py-[60px]">
          {page
            ? (
              <Details
                page={page}
                promotions={promotions}
                buttonByCategory={buttonByCategory}
                videoThumb={videoThumb}
              />
            )
            : <NotFound />}
        </div>
      </div>
      <OtherColorsShelf product={product!} />
      <SpecsDesktop product={product!} measurementsImage={measurementsImage!} />
      <SpecsMobile product={product!} measurementsImage={measurementsImage!} />
    </>
  );
}

export function loader(props: Props, req: Request, ctx: AppContext) {
  if (!props.page?.product) {
    const url = new URL(req.url);
    redirect(url.origin);
    return props;
  }

  const productId: string | undefined = props.page.product.productID;
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

  return props;
}

export default ProductDetails;
