import { visitedProductsCookie } from "$store/components/constants.ts";
import { AuthData } from "$store/packs/types.ts";
import type { AppContext } from "$store/apps/site.ts";
import Details from "$store/components/product/product-details/Details.tsx";
import { NotFound } from "$store/components/product/product-details/NotFound.tsx";
import OtherColorsShelf from "$store/components/product/product-details/OtherColorsShelf.tsx";
import SpecsDesktop from "$store/components/product/product-details/SpecsDesktop.tsx";
import SpecsMobile from "$store/components/product/product-details/SpecsMobile.tsx";
import type {
  ImageWidget,
  ImageWidget as LiveImage,
} from "apps/admin/widgets.ts";
import { getCookies, setCookie } from "std/http/mod.ts";
import { type LoaderReturnType, redirect, type SectionProps } from "@deco/deco";
import { IsabelaProductDetailsPage } from "site/packs/v2/types.ts";
type ButtonLabel = {
  category: string;
  label: string;
};
import { MediasResponseObject } from "$store/packs/v2/loaders/productMedias.ts";

export interface Promotion {
  /** @title Texto */
  label: string;
  /** @title Texto da Flag */
  /** @description Você pode usar %value para substituir pelo preço do produto */
  flagText: string;
}
export interface MobileOptions {
  /** @title Localização da Tag de Desconto */
  discountTagLocation: "Header" | "Image Bottom" | "Image Top";
  /** @title Localização do Nome */
  nameLocation: "Header" | "Bottom";
  /** @title Localização das estrelas
   * @description Caso o Flag de oferta também esteja localizado no "Header", as estrelas irão automaticamente seguir a opção "Bottom".
   */
  starsLocation: "Header" | "Bottom";
  /** @title Mostrar thumbnails do produto */
  /** @default false*/
  showProductTumbnails: boolean;
  /**
   * @title Seção "Escolher as Lentes" e "Adicionar ao Carrinho"
   * @description Mostrar botões "ESCOLHER AS LENTES" e "ADICIONAR AO CARRINHO" após o seguinte elemento não ser mais mostrado
   */
  displayModalAfter: "Header" | "Product Images" | "Experimentador Section";
}
export interface Props {
  /** @title Configurações do Loader */
  page: LoaderReturnType<IsabelaProductDetailsPage | null>;
  /** @title Imagem das Medidas  */
  measurementsImage?: LiveImage;
  /** @title Configurações de Promoções */
  promotions?: Promotion[];
  /** @title Botão de Adicionar no Carrinho por Categoria */
  buttonByCategory?: ButtonLabel[];
  /** @title Botão de Passo a Passo por Categoria */
  stepButtonByCategory?: ButtonLabel[];
  mobileOptions: MobileOptions;
  customer: LoaderReturnType<AuthData>;
  priceValidUntil?: string;
  /** @title Informacoes dentro da secão de descricao */
  /** @hide */
  relatedProductImages?: ({
    slug: string;
    images: MediasResponseObject[];
  } | null)[];
}
function ProductDetails(
  {
    page,
    measurementsImage,
    promotions,
    buttonByCategory,
    stepButtonByCategory,
    customer,
    mobileOptions,
    relatedProductImages,
  }: SectionProps<typeof loader>,
) {
  const { product } = page || {};

  // Use the new promotion countdown format from v2 types
  const isPromotionActive = () => {
    if (!product?.promotion?.countdown) return false;

    if (
      product.promotion.allowsCountdown === false &&
      product.promotion.isDayOffer === false
    ) {
      return false;
    }

    const now = new Date();
    const startDate = new Date(product.promotion.countdown.start);
    const endDate = new Date(product.promotion.countdown.end);

    // Check if current time is within the promotion period
    return now >= startDate && now <= endDate;
  };

  // Only set priceValidUntil if promotion is active and within valid date range
  const priceValidUntil = isPromotionActive()
    ? product?.promotion?.countdown?.end
    : undefined;

  return (
    <>
      <div class="lg:bg-gray-scale-100">
        {/* Stopwatch */}
        <div class="max-w-[1320px] w-[95%] mx-auto py-[10px] lg:py-[20px]">
          {page
            ? (
              <Details
                page={page}
                promotions={promotions}
                buttonByCategory={buttonByCategory}
                stepButtonByCategory={stepButtonByCategory}
                customer={customer}
                mobileOptions={mobileOptions}
                priceValidUntil={priceValidUntil}
              />
            )
            : <NotFound />}
        </div>
      </div>

      <OtherColorsShelf
        product={product!}
        relatedProductImages={relatedProductImages}
      />

      <SpecsDesktop
        product={product!}
        measurementsImage={measurementsImage!}
      />

      {/* <SpecsMobile product={product!} measurementsImage={measurementsImage!} /> */}
    </>
  );
}
export async function loader(props: Props, req: Request, ctx: AppContext) {
  if (!props.page?.product) {
    const url = new URL(req.url);
    redirect(url.origin);
    return props;
  }

  const cookies = getCookies(req.headers);
  const currentSlugs: string[] | undefined =
    cookies?.[visitedProductsCookie]?.split(":") ?? [];

  const newSlugs =
    currentSlugs.some((slug) => slug === props.page?.product.slug)
      ? currentSlugs
      : currentSlugs.concat([props.page.product.slug]);

  setCookie(ctx.response.headers, {
    name: visitedProductsCookie,
    value: newSlugs?.join(":"),
    path: "/",
  });

  const relatedProductImages = await Promise.all(
    (props.page.product.relatedProducts ?? [])
      .filter((product) => product.slug !== props.page?.product?.slug)
      .map(async (product) => {
        const medias = await ctx.invoke(
          "site/loaders/product/productMedias.ts",
          { slug: product.slug },
        );
        return medias && medias.length > 0
          ? { slug: product.slug, images: medias }
          : null;
      }),
  ).then((results) => results.filter(Boolean));

  return {
    ...props,
    relatedProductImages,
  };
}
export default ProductDetails;
