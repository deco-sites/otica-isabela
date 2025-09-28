import type { LoaderReturnType, SectionProps } from "$live/types.ts";
import ProductGallery from "$store/components/product/ProductGallery.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import Banner from "$store/components/ui/CategoryBanner.tsx";
import type { Banner as BannerProps } from "$store/components/ui/CategoryBanner.tsx";
import { SendEventOnLoad } from "$store/sdk/analytics.tsx";
import Pagination from "$store/components/search/Pagination.tsx";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import type { ImageWidget as LiveImage } from "apps/admin/widgets.ts";
import type { AppContext } from "$store/apps/site.ts";
import { getCookies } from "std/http/mod.ts";
import {
  ISABELA_DIAS_NAME_COOKIE,
  ISABELA_DIAS_WISHLIST_IDS,
} from "$store/packs/constants.ts";
import { AuthData } from "$store/packs/types.ts";
import { redirect } from "@deco/deco";
import {
  BreadcrumbItem,
  IsabelaProductListingPage,
} from "site/packs/v2/types.ts";
import Filters from 'site/islands/Filters.tsx';
import ActiveFilters from 'site/islands/ActiveFilters.tsx';
import CategoryMenu from "$store/components/ui/CategoryMenu.tsx";
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
  name: string;
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
  /**
   * @title Cor 2
   * @format color
   */
  hex2?: string;
  /**
   * @title Cor 3
   * @format color
   */
  hex3?: string;
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
  page: LoaderReturnType<IsabelaProductListingPage | null>;
  banner?: BannerProps[];
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
function NotFound({ alert }: {
  alert?: string;
}) {
  return (
    <div class="w-full flex justify-center items-center py-10">
      <span>{alert ? alert : "Não encontrado!"}</span>
    </div>
  );
}
function Result(
  {
    page,
    banner = [] as BannerProps[],
    filterColors = [],
    hideFilters = [],
    typeIcons = [],
    shapeIcons = [],
    categories = [],
    isSliderEnabled,
    customer,
    url,
  }: Omit<ComponentProps, "page"> & {
    page: IsabelaProductListingPage;
    banner?: BannerProps[];
    url: string;
  },
) {
  const { products, filters, pageInfo, sortOptions, seo } = page;
  const { pathname } = new URL(url);
  const categorySlug = pathname.split("/")[1] ?? "";
  const subCategorySlug = pathname.split("/")[2] ?? "";

  const getCategoryNames = () => {
    const category = categories.find((c) => c.label === `/${categorySlug}`);
    if (!category) return ["", ""];

    const subCategoryList = category.categoryItems;

    const subCategory = subCategoryList.find((c) => c.link === pathname);

    return [category.name || "", subCategory?.label || ""];
  };

  const [categoryName, subCategoryName] = getCategoryNames();

  const breadcrumbItems: BreadcrumbItem[] = [
    { name: categoryName, href: `/${categorySlug}` },
    ...(subCategoryName
      ? [{ name: subCategoryName, href: `/${categorySlug}/${subCategorySlug}` }]
      : []),
  ];

  return (
    <>
      <header class="max-w-[1320px] mx-auto w-[95%] flex flex-col bg-white m-0 py-2">
        <div class="flex w-full flex-row items-center">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </header>

      <div class="flex justify-between max-w-[1320px] w-[95%] mx-auto mt-4">
          <ActiveFilters />
          <CategoryMenu categories={categories} url={url} />
      </div>

      <div class="max-w-[1320px] mx-auto mt-4 w-[95%]">
        <div class="flex flex-row">
          <Filters facets={filters} shapeIcons={shapeIcons} typeIcons={typeIcons} />

          <div class="flex-grow w-full flex flex-col max-lg:gap-6 gap-10">
            {banner && banner.map((b) => <Banner banner={b} />)}
            <ProductGallery
              products={products}
              isSliderEnabled={isSliderEnabled}
              customer={customer}
            />
            <div class="flex max-lg:flex-col gap-2 justify-normal my-4">
              <Pagination pageInfo={pageInfo} />
              <span class="text-grayscale-700 flex max-lg:justify-center items-center gap-1">
                <strong>{pageInfo.records}</strong> resultados
              </span>
            </div>
          </div>
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
                product: {
                  ...product,
                  "@type": "Product",
                  productID: String(product?.id),
                  sku: product?.code,
                  category: product?.category?.name || "",
                },
                price: product?.priceWithDiscount,
                listPrice: product?.price,
                breadcrumbList: {
                  "@type": "BreadcrumbList",
                  itemListElement: breadcrumbItems.map((item, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    name: item.name,
                    item: item.href,
                  })),
                  numberOfItems: breadcrumbItems.length,
                },
              })
            ),
          },
        }}
      />
    </>
  );
}
export const loader = async (
  { banner = [], categories = [], ...props }: Props,
  req: Request,
  ctx: AppContext,
) => {
  const isFavoritos = req.url.includes("meus-favoritos");

  if (isFavoritos) {
    const cookies = getCookies(req.headers);
    const wishlistIds = cookies?.[ISABELA_DIAS_WISHLIST_IDS]?.split(",") ?? [];
    const isLogged = Boolean(cookies[ISABELA_DIAS_NAME_COOKIE]);
    if (!isLogged) {
      redirect(new URL("/identificacao", new URL(req.url)));
    }
    const wishlistProductsPage = await ctx.invoke(
      "site/loaders/product/productListingPage.ts",
      // { id: wishlistIds, ordenacao: "none" },
    );
    props.page = wishlistProductsPage;
  }

  const matchedBanner = banner.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );

  return {
    banner: matchedBanner ? [matchedBanner] : [],
    categories,
    url: req.url,
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
