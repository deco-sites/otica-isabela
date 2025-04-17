import Icon from "$store/components/ui/Icon.tsx";
import type { BreadcrumbList } from "apps/commerce/types.ts";

export type Props = {
  pageInfo: {
    currentPage: number;
    nextPage?: string;
    previousPage?: string;
    records?: number;
    recordPerPage?: number;
  };
};

interface PageParams {
  page: number;
  href: string;
}

export default function Pagination({ pageInfo }: Props) {
  const { nextPage, previousPage } = pageInfo;
  const firstPage = 1;
  const totalPages = Math.ceil(
    Number(pageInfo?.records) / Number(pageInfo?.recordPerPage),
  );
  const moreThanSevenPages = totalPages > firstPage + 6;
  const pageParams = new URLSearchParams(nextPage ?? previousPage);

  const eachPageParams: PageParams[] = Array.from(
    { length: Number(totalPages) },
    (_value, i) => {
      pageParams.set("page", `${i + 1}`);
      return {
        page: i + 1,
        href: pageParams.toString(),
      };
    },
  );
  const currentPage = pageInfo.currentPage + 1;
  const nextPageNumber = currentPage + 1;
  const prevPageNumber = currentPage - 1;
  const lastPage = totalPages;
  const shouldRenderFirstPage = currentPage >= 3;
  const shouldRenderLastPage = lastPage !== -1 && currentPage <= lastPage - 2;

  function SimplePagination() {
    return (
      <>
        {eachPageParams.map(({ page, href }) => (
          <a
            aria-label={`pagina ${page}`}
            rel="page"
            href={`?${href}`}
            class={`w-10 h-10 border text-black border-none rounded-[9px] flex items-center justify-center text-sm font-semibold
		  ${
              currentPage === page
                ? "bg-blue-200 border-blue-200 text-white"
                : "bg-[#f0f0f0]"
            }
		`}
          >
            {page}
          </a>
        ))}
      </>
    );
  }

  function PaginationWithSpread() {
    const jumpBackPage = Math.max(currentPage - 2, 2);
    const jumpForwardPage = Math.min(currentPage + 2, totalPages - 1);

    return (
      <>
        {shouldRenderFirstPage && (
          <a
            aria-label="primeira pagina"
            rel="first"
            href={`?${eachPageParams[0].href}`}
            class={`w-10 h-10 border text-black border-none flex items-center justify-center text-sm font-semibold
              ${
              currentPage === firstPage
                ? "bg-blue-200 text-white"
                : "bg-[#f0f0f0]"
            }
            `}
          >
            {firstPage}
          </a>
        )}

        {currentPage > 4 && (
          <a
            aria-label={`Pular para a página ${jumpBackPage}`}
            href={`?${eachPageParams[jumpBackPage - 1].href}`}
            class="w-10 h-10 bg-[#f0f0f0] flex items-center justify-center text-sm font-semibold text-gray-600 hover:bg-gray-200 group"
          >
            <span class="block group-hover:hidden">...</span>
            <span class="hidden group-hover:block">
              <Icon
                id="ChevronLeft"
                size={20}
                strokeWidth={3}
                style={{ color: "bg-blue-200" }}
              />
            </span>
          </a>
        )}

        {previousPage && (
          <a
            aria-label="pagina anterior"
            rel="prev"
            href={previousPage}
            class="flex w-10 bg-[#f0f0f0] h-10 border text-black border-none items-center justify-center text-sm font-semibold"
          >
            {prevPageNumber}
          </a>
        )}

        <span class="w-10 h-10 bg-blue-200 text-white flex items-center justify-center text-sm font-semibold">
          {currentPage}
        </span>

        {nextPage && (
          <a
            aria-label="proxima pagina"
            rel="next"
            href={nextPage}
            class="flex w-10 h-10 border text-black bg-[#f0f0f0] border-none items-center justify-center text-sm font-semibold"
          >
            {nextPageNumber}
          </a>
        )}

        {currentPage < totalPages - 3 && (
          <a
            aria-label={`Pular para a página ${jumpForwardPage}`}
            href={`?${eachPageParams[jumpForwardPage - 1].href}`}
            class="w-10 h-10 flex items-center justify-center text-sm font-semibold text-grayscale-700 bg-[#f0f0f0] hover:bg-gray-200 group"
          >
            <span class="block group-hover:hidden">...</span>
            <span class="hidden group-hover:block">
              <Icon
                id="ChevronLeft"
                size={20}
                strokeWidth={3}
                class={"rotate-180"}
                style={{ color: "bg-blue-200" }}
              />
            </span>
          </a>
        )}

        {shouldRenderLastPage && (
          <a
            aria-label="ultima pagina"
            rel="last"
            href={`?${eachPageParams[totalPages - 1].href}`}
            class={`w-10 h-10 border text-black border-none flex items-center justify-center text-sm font-semibold
              ${
              currentPage === lastPage
                ? "bg-blue-200 text-white"
                : "bg-[#f0f0f0]"
            }
            `}
          >
            {lastPage}
          </a>
        )}
      </>
    );
  }

  return (
    <div class="flex justify-center my-5 gap-[10px]">
      {previousPage && (
        <a
          aria-label="pagina anterior"
          rel="prev"
          href={previousPage}
          disabled={!previousPage}
          class="w-10 h-10 border bg-blue-200 flex items-center justify-center text-sm font-semibold"
        >
          <Icon
            id="ChevronLeft"
            size={20}
            strokeWidth={3}
            style={{ color: "white" }}
          />
        </a>
      )}
      {!moreThanSevenPages ? <SimplePagination /> : <PaginationWithSpread />}
      {nextPage && (
        <a
          aria-label="proxima pagina"
          rel="next"
          href={nextPage}
          class="w-10 h-10 border bg-blue-200 flex items-center justify-center text-sm font-semibold"
        >
          <Icon
            id="ChevronLeft"
            size={20}
            strokeWidth={3}
            class={"rotate-180"}
            style={{ color: "white" }}
          />
        </a>
      )}
    </div>
  );
}
