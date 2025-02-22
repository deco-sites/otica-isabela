import type { LoaderReturnType, SectionProps } from "$live/types.ts";
import ProductGallery from "$store/components/product/ProductGallery.tsx";
import Filters from "$store/components/search/Filters.tsx";
import SelectedFilters from "$store/islands/SelectedFilters.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import CategoryMenu from "$store/components/ui/CategoryMenu.tsx";
import SearchControls from "$store/islands/SearchControls.tsx";
import { SendEventOnLoad } from "$store/sdk/analytics.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import ApplyRangeFiltersJS from "deco-sites/otica-isabela/islands/ApplyRangeFiltersJS.tsx";
import type { ProductListingPage } from "apps/commerce/types.ts";
import Pagination from "deco-sites/otica-isabela/components/search/Pagination.tsx";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import type { AppContext } from "deco-sites/otica-isabela/apps/site.ts";
import { getCookies } from "std/http/mod.ts";
import {
  ISABELA_DIAS_WISHLIST_IDS,
  ISABELA_DIAS_NAME_COOKIE,
} from "deco-sites/otica-isabela/packs/constants.ts";
import { AuthData } from "$store/packs/types.ts";
import { redirect } from "deco/mod.ts";
import { Head } from "$fresh/runtime.ts";
export type CategoryMenuItem = {
  /** @title Categoria filha */
  label: string;
  link: string;
};

export interface CategoryMatcher {
  /**
   * @title Caminho da URL
   * @description Use /feminino/* para mostrar esse menu em todas as categorias filhas de feminino
   */
  label: string;
  /** @title Itens do Menu */
  categoryItems: CategoryMenuItem[];
}

export interface Color {
  /**
   * @title Nome
   */
  label: string;
  /**
   * @title Cor
   * @format color
   */
  hex: string;
}

export interface Type {
  /** @title Nome do Tipo */
  label: string;
  /** @title Icone do Tipo */
  icon: LiveImage;
}

export interface Shape {
  /** @title Nome do Formato */
  label: string;
  /** @title Imagem do Formato */
  image: LiveImage;
  /**
   * @title Altura da imagem
   * @description Para evitar quebras de layout, apenas a altura é necessaria e as larguras serão sempre 50px.
   */
  height: number;
}

export interface Props {
  /** @title Loader */
  page: LoaderReturnType<ProductListingPage | null>;
  /** @title Cores do Filtro */
  filterColors?: Color[];
  /** @title Icones do filtro de Tipo */
  typeIcons?: Type[];
  /** @title Icones do filtro de Formato */
  shapeIcons?: Shape[];
  /** @title Esconder Filtros */
  hideFilters?: string[];
  /** @title Menu de Categorias */
  categories?: CategoryMatcher[];
  /** @title Ativar carossel nos itens da galeria? */
  isSliderEnabled?: boolean;
  /**
   * @title Titulo da pagina
   * @description Obrigatório para paginas de coleção
   */
  pageName?: string;
  /**
   * @title Alerta Not Found
   * @description Frase que será renderizada caso a página não retorne nenhum produto
   */
  notFoundAlert?: string;
  customer: LoaderReturnType<AuthData>;
}

function NotFound({alert}: {alert?: string}) {
  return (
    <div class="w-full flex justify-center items-center py-10">
      <span>{alert ? alert : "Não encontrado!"}</span>
    </div>
  );
}

function Result({
  page,
  filterColors = [],
  hideFilters = [],
  typeIcons = [],
  shapeIcons = [],
  categories = [],
  isSliderEnabled,
  pageName,
  customer,
}: Omit<ComponentProps, "page"> & { page: ProductListingPage }) {
  const { products, filters, breadcrumb, pageInfo, sortOptions, seo } = page;
  const productCategory = seo?.title.split(" - ")[0].toUpperCase() ?? (pageName || "");
  // const isAFilterPage = pageInfo?.nextPage?.includes('?filter.') || pageInfo?.previousPage?.includes('?filter.')
  

  return (
    <>
    {/* {isAFilterPage && <Head>
      <meta name="robots" content="noindex" />
    </Head>} */}
      <header class="bg-white border-b border-base-200 m-0 py-2 px-0">
        <h1 class="text-lg font-bebas-neue text-black text-center uppercase">
          {productCategory.length > 0 ? productCategory : pageName}
        </h1>
      </header>
      {filters.length ? (
        <div class="lg:flex flex-col w-full border-b border-base-200 max-lg:hidden sticky z-[9] bg-white top-0">
          <Filters
            filters={filters}
            filterColors={filterColors}
            hideFilters={hideFilters}
            typeIcons={typeIcons}
            shapeIcons={shapeIcons}
          />
          <div class="border-t border-base-200 w-full py-1">
            <div class="container flex justify-between items-center">
              <SelectedFilters filters={filters} />
              <div class="flex gap-4">
                <button
                  id="apply-range-filters"
                  class="uppercase border border-black rounded-[5px] bg-black font-medium text-base text-white cursor-pointer py-[5px] px-[20px] whitespace-nowrap"
                >
                  <span>Aplicar Filtro</span>
                </button>
                <ApplyRangeFiltersJS
                  rootId="size-options-container"
                  buttonId="apply-range-filters"
                />
                <a
                  href={breadcrumb?.itemListElement.at(-1)?.item ?? ""}
                  class="whitespace-nowrap uppercase border border-black font-medium rounded-[5px] py-[5px] px-5 transition-colors duration-300 ease-in-out text-base bg-white text-black hover:text-white hover:bg-black"
                >
                  Limpar Filtros
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <SearchControls
        sortOptions={sortOptions}
        filters={filters}
        filterColors={filterColors}
        breadcrumb={breadcrumb}
        hideFilters={hideFilters}
        typeIcons={typeIcons}
        shapeIcons={shapeIcons}
      />
      {!breadcrumb?.itemListElement?.length ? null : (
        <div class="flex w-full flex-row justify-center items-center my-5">
          <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
        </div>
      )}
      <CategoryMenu categories={categories} />
      <div class="container mt-12 px-4 sm:py-10">
        <div class="flex flex-row">
          <div class="flex-grow">
            <ProductGallery
              products={products}
              isSliderEnabled={isSliderEnabled}
              customer={customer}
            />
          </div>
        </div>
          <div class="flex justify-center my-4">
            <Pagination pageInfo={pageInfo} />
          </div>
      </div>
      <SendEventOnLoad
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: "",
            item_list_id: "",
            items: page.products?.map((product) =>
              mapProductToAnalyticsItem({
                ...useOffer(product.offers),
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </>
  );
}

export const loader = async (
  { categories = [], ...props }: Props,
  req: Request,
  ctx: AppContext
) => {
  const categoryList = categories.find(({ label }) =>
    new URLPattern({ pathname: label }).test(req.url)
  );

  const isFavoritos = req.url.includes("meus-favoritos");

  if (isFavoritos) {
    const cookies = getCookies(req.headers);
    const wishlistIds = cookies?.[ISABELA_DIAS_WISHLIST_IDS]?.split(",") ?? [];
    const isLogged = Boolean(cookies[ISABELA_DIAS_NAME_COOKIE]);
    if (!isLogged) redirect(new URL("/identificacao", new URL(req.url)));
    const wishlistProductsPage = await ctx.invoke(
      "deco-sites/otica-isabela/loaders/product/productListiningPage.ts",
      { id: wishlistIds, ordenacao: "none" }
    );
    props.page = wishlistProductsPage;
  }

  return {
    categories: categoryList?.categoryItems ?? [],
    ...props,
  };
};

type ComponentProps = SectionProps<typeof loader>;

function SearchResult({ page, ...props }: ComponentProps) {
  if (!page) {
    return <NotFound alert={props.notFoundAlert} />;
  }
  return <Result {...props} page={page} />;
}

export default SearchResult;
