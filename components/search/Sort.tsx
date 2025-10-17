import { ProductListingPage } from "apps/commerce/types.ts";
import { useMemo } from "preact/hooks";

const SORT_QUERY_PARAM = "sort";

const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(window.location?.search);
    return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
  }, []);

const resetOtherOptions = (param: string) => {
  const options = document.querySelectorAll("[data-sort-option]");
  options.forEach((option) => {
    if (option.getAttribute("value") !== param) {
      option.setAttribute("aria-checked", "false");
    }
  });

  return;
};

const applySort = (param: string) => {
  const el = document.querySelector(`[value=${param}]`);
  const urlSearchParams = new URLSearchParams(window.location.search);
  const sortStatus = el?.getAttribute("aria-checked");

  el?.setAttribute("aria-checked", sortStatus === "true" ? "false" : "true");
  if (sortStatus === "true") {
    urlSearchParams.delete(SORT_QUERY_PARAM, param);
  } else {
    urlSearchParams.set(SORT_QUERY_PARAM, param);
  }
  resetOtherOptions(param);

  window.location.search = urlSearchParams.toString();
};

export type Props = Pick<ProductListingPage, "sortOptions">;

function Sort({ sortOptions }: Props) {
  const sort = useSort();

  return (
    <div class="flex flex-col">
      {sortOptions.map((option) => (
        <div
          key={option.value}
          onClick={() => applySort(option.value)}
          class="flex items-center mb-5"
        >
          <div
            data-sort-option={option.value}
            value={option.value}
            aria-checked={option.value === sort}
            class="checkbox border relative h-[30px] w-[30px] mr-2.5 rounded-[5px] border-solid border-black"
          />
          <span class="flex items-center gap-2.5 text-lg font-bold">
            {option.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Sort;
