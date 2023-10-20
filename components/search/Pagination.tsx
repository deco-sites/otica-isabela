import Icon from "$store/components/ui/Icon.tsx";

export type Props = {
  pageInfo: {
    currentPage: number;
    nextPage?: string;
    previousPage?: string;
    records?: number;
    recordPerPage?: number;
  };
};

export default function Pagination({ pageInfo }: Props) {
  const firstPage = 1;
  const totalPages = Math.ceil(
    Number(pageInfo?.records) / Number(pageInfo?.recordPerPage)
  );
  const moreThanSevenPages = totalPages > firstPage + 6;
  const eachPageList = Array.from(
    { length: Number(totalPages) },
    (value, i) => i
  );
  const currentPage = pageInfo.currentPage + 1;
  const nextPageNumber = currentPage + 1;
  const prevPageNumber = currentPage - 1;
  const lastPage = totalPages;
  const shouldRenderFirstPage = currentPage >= 3;
  const shouldRenderLastPage = lastPage !== -1 && currentPage <= lastPage - 2;
  const shouldRenderFirstSpread = currentPage >= firstPage + 3;
  const shouldRenderSecondSpread = currentPage <= lastPage - 3;

  function simplePagination() {
    return eachPageList.map((page) => (
      <a
        aria-label={`pagina ${page + 1}`}
        rel="page"
        href={`?page=${page + 1}`}
        class={`w-10 h-10 border-2 border-blue-200 text-blue-200 rounded-full flex items-center justify-center text-sm font-bold
		  ${currentPage === page ? "bg-blue-200 text-white" : ""}
		`}
      >
        {page + 1}
      </a>
    ));
  }

  function paginationWithSpread() {
    return (
      <>
        {shouldRenderFirstPage && (
          <a
            aria-label="primeira pagina"
            rel="first"
            href={`?page=${firstPage}`}
            class={`w-10 h-10 border-2 border-blue-200 text-blue-200 rounded-full flex items-center justify-center text-sm font-bold
		  ${currentPage === firstPage ? "bg-blue-200 text-white" : ""}
		`}
          >
            {firstPage}
          </a>
        )}
        {shouldRenderFirstSpread && (
          <div class="w-10 h-10 text-blue-200 rounded-full flex items-center justify-center text-xl font-bold">
            ...
          </div>
        )}
        {pageInfo.previousPage && (
          <a
            aria-label="pagina anterior"
            rel="prev"
            href={pageInfo.previousPage}
            class="hidden sm:flex w-10 h-10 border-2 border-blue-200 text-blue-200 rounded-full items-center justify-center text-sm font-bold"
          >
            {prevPageNumber}
          </a>
        )}
        <span class="w-10 h-10 bg-blue-200 text-white rounded-full flex items-center justify-center text-sm font-bold">
          {currentPage}
        </span>
        {pageInfo.nextPage && (
          <a
            aria-label="proxima pagina"
            rel="next"
            href={pageInfo.nextPage}
            class="hidden sm:flex w-10 h-10 border-2 border-blue-200 text-blue-200 rounded-full items-center justify-center text-sm font-bold"
          >
            {nextPageNumber}
          </a>
        )}
        {shouldRenderSecondSpread && (
          <div class="w-10 h-10 text-blue-200 rounded-full flex items-center justify-center text-xl font-bold">
            ...
          </div>
        )}
        {shouldRenderLastPage && (
          <a
            aria-label="ultima pagina"
            rel="last"
            href={`?page=${lastPage}`}
            class={`w-10 h-10 border-2 border-blue-200 text-blue-200 rounded-full flex items-center justify-center text-sm font-bold
		  ${currentPage === lastPage ? "bg-blue-200 text-white" : ""}
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
      {pageInfo.previousPage && (
        <a
          aria-label="pagina anterior"
          rel="prev"
          href={pageInfo.previousPage}
          disabled={!pageInfo.previousPage}
          class="w-10 h-10 text-blue-200 rounded-full flex items-center justify-center text-sm font-bold"
        >
          <Icon id="ChevronLeft" size={20} strokeWidth={3} />
        </a>
      )}
      {!moreThanSevenPages ? simplePagination() : paginationWithSpread()}
      {pageInfo.nextPage && (
        <a
          aria-label="proxima pagina"
          rel="next"
          href={pageInfo.nextPage}
          class="w-10 h-10 text-blue-200 rounded-full flex items-center justify-center text-sm font-bold"
        >
          <Icon
            id="ChevronLeft"
            size={20}
            strokeWidth={3}
            class={"rotate-180"}
          />
        </a>
      )}
    </div>
  );
}
