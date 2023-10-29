import { ProductListingPage } from "apps/commerce/types.ts";
import type { JSX } from "preact";
import { useMemo } from "preact/hooks";

const SORT_QUERY_PARAM = "sort";

const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(window.location?.search);
    return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
  }, []);

// TODO: Replace with "search utils"
const applySort = (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
  const urlSearchParams = new URLSearchParams(window.location.search);

  urlSearchParams.set(SORT_QUERY_PARAM, e.currentTarget.value);
  window.location.search = urlSearchParams.toString();
};

export type Props = Pick<ProductListingPage, "sortOptions">;

const portugueseMappings = {
  "price:desc": "Maior Preço",
  "orders:desc": "Mais vendidos",
  "discount:desc": "Maior desconto",
};
function Sort({ sortOptions }: Props) {
  const sort = useSort();

  console.log("sort", sort);

  return (
    <div class="flex flex-col">
      {/* {sortOptions
        .map(({ value, label }) => ({
          value,
          label: portugueseMappings[label as keyof typeof portugueseMappings],
        }))
        .filter(({ label }) => label)
        .map(({ value, label }) => (
          <div
            key={value}
            value={value}
            aria-checked={value === sort}
            class="checkbox border relative h-[30px] w-[30px] mr-2.5 rounded-[5px] border-solid border-black"
          >
            <span class="flex items-center gap-2.5">{label}</span>
          </div>
        ))} */}
      {sortOptions.map((option) => (
        <div key={option.value} class="flex items-center mb-5">
          <div
            value={option.value}
            aria-checked={option.value === sort}
            class="checkbox border relative h-[30px] w-[30px] mr-2.5 rounded-[5px] border-solid border-black"
          />
          <span class="flex items-center gap-2.5">{option.label}</span>
        </div>
      ))}
    </div>
  );
}

export default Sort;
