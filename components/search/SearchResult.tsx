import type { LoaderReturnType } from "$live/types.ts";
import SearchControls from "$store/islands/SearchControls.tsx";
import { SendEventOnLoad } from "$store/sdk/analytics.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import Pagination from "deco-sites/otica-isabela/components/search/Pagination.tsx";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";
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

export interface Props {
  page: LoaderReturnType<ProductListingPage | null>;
  layout?: Layout;
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
}: Omit<Props, "page"> & { page: ProductListingPage }) {
  const { products, filters, breadcrumb, pageInfo, sortOptions, seo } = page;

  const productCategory = seo?.title.split(" - ")[0].toUpperCase();
  //   const totalPages = Math.ceil(
  //     Number(pageInfo?.records) / Number(pageInfo?.recordPerPage),
  //   );

  //   const totalPagesArray = Array.from(
  //     { length: Number(totalPages) },
  //     (value, i) => i,
  //   );

  return (
    <>
      <header class="bg-white border-b border-base-200 m-0 py-2 px-0">
        <h1 class="text-lg font-bebas-neue text-black text-center uppercase">
          {productCategory}
        </h1>
      </header>
      <SearchControls
        sortOptions={sortOptions}
        filters={filters}
        breadcrumb={breadcrumb}
        displayFilter={layout?.variant === "drawer"}
      />
      <div class="container mt-12 px-4 sm:py-10">
        <div class="flex flex-row">
          <div class="flex-grow">
            <ProductGallery products={products} />
          </div>
        </div>

        <div class="flex justify-center my-4">
          {
            /* <div class="join">
            <a
              aria-label="previous page link"
              rel="prev"
              href={pageInfo?.previousPage}
              class="btn btn-ghost join-item"
              disabled={!pageInfo.previousPage}
            >
              <Icon id="ChevronLeft" width={20} height={20} strokeWidth={2} />
            </a>

            {totalPagesArray.map((page) =>
              pageInfo.currentPage + 1 === page + 1
                ? (
                  <span class="btn btn-ghost join-item border-b-2 border-blue-500 rounded-full">
                    {page + 1}
                  </span>
                )
                : <span class="btn btn-ghost join-item">{page + 1}</span>
            )}

            <a
              aria-label="Próxima página"
              rel="proxima"
              href={pageInfo?.nextPage}
              class="btn btn-ghost join-item"
              disabled={!pageInfo.nextPage}
            >
              <Icon id="ChevronRight" width={20} height={20} strokeWidth={2} />
            </a>
          </div>
        </div> */
          }

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
