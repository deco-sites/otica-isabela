import { visitedProductsCookie } from "$store/components/constants.ts";
import { AuthData } from "$store/packs/types.ts";
import type { ProductDetailsPage } from "apps/commerce/types.ts";
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
  page: LoaderReturnType<ProductDetailsPage | null>;
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
  }: SectionProps<typeof loader>,
) {
  const { product } = page || {};
  const { offers } = product || {};
  const priceValidUntil = offers?.offers.at(0)?.priceValidUntil;

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
      <OtherColorsShelf product={product!} />
      <SpecsDesktop
        product={product!}
        measurementsImage={measurementsImage!}
      />
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
  return {
    ...props,
  };
}
export default ProductDetails;
