import type { LoaderReturnType } from "$live/types.ts";
import Filters from "$store/components/search/Filters.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import SearchControls from "$store/islands/SearchControls.tsx";
import { SendEventOnLoad } from "$store/sdk/analytics.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { ProductListingPage } from "apps/commerce/types.ts";
import Pagination from "deco-sites/otica-isabela/components/search/Pagination.tsx";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import ProductGallery, { Columns } from "../product/ProductGallery.tsx";

export interface Layout {
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  /**
   * @description Number of products per line on grid
   */
  columns: Columns;
}

export interface Color {
  /**
   * @title Nome
   */
  label: string;
  hex: string;
}

export interface Props {
  page: LoaderReturnType<ProductListingPage | null>;
  layout?: Layout;
  filterColors: Color[];
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-10">
      <span>Não encontrado!</span>
    </div>
  );
}

function Result({
  page,
  layout,
  filterColors,
}: Omit<Props, "page"> & { page: ProductListingPage }) {
  const { products, filters, breadcrumb, pageInfo, sortOptions, seo } = page;

  const productCategory = seo?.title.split(" - ")[0].toUpperCase();

  return (
    <>
      <header class="bg-white border-b border-base-200 m-0 py-2 px-0">
        <h1 class="text-lg font-bebas-neue text-black text-center uppercase">
          {productCategory}
        </h1>
      </header>
      {filters.length
        ? (
          <div class="flex flex-col w-full pt-7 border-b border-base-200 max-lg:hidden sticky z-[9] bg-white top-0">
            <Filters filters={filters} filterColors={filterColors} />
            <div class="border-t border-base-200 w-full py-[30px]">
              <div class="container flex justify-end">
                <a
                  href={breadcrumb?.itemListElement.at(-1)?.item ?? ""}
                  class="uppercase border border-black font-medium rounded-[5px] py-[5px] px-5 transition-colors duration-300 ease-in-out text-base bg-white text-black hover:text-white hover:bg-black"
                >
                  Limpar Filtros
                </a>
              </div>
            </div>
          </div>
        )
        : null}
      <SearchControls
        sortOptions={sortOptions}
        filters={filters}
        filterColors={filterColors}
        breadcrumb={breadcrumb}
        displayFilter={layout?.variant === "drawer"}
      />
      <div class="flex w-full flex-row justify-center items-center my-5">
        <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
      </div>
      <div class="container mt-12 px-4 sm:py-10">
        <div class="flex flex-row">
          <div class="flex-grow">
            <ProductGallery products={products} />
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

function SearchResult({ page, ...props }: Props) {
  if (!page) {
    return <NotFound />;
  }

  return <Result {...props} page={page} />;
}

export default SearchResult;
