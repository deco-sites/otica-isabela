import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import Icon from "deco-sites/otica-isabela/components/ui/Icon.tsx";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem({ url, selected, label }: FilterToggleValue) {
  return (
    <a href={url || "#"}>
      <div class="flex items-center mb-5">
        <div
          aria-checked={selected}
          class="checkbox border relative h-[30px] w-[30px] mr-2.5 rounded-[5px] border-solid border-black"
        />
        <span>{label}</span>
      </div>
    </a>
  );
}

function FilterValues({ label, values }: FilterToggle) {
  const flexDirection = label === "Formato" || label === "Cor"
    ? "flex-row"
    : "flex-col";

  const corStyles = label === "Cor"
    ? "w-[650px] flex-wrap justify-between pb-5"
    : "";
  const formatoStyles = label === "Formato"
    ? "w-[530px] flex-wrap justify-between"
    : "";

  return (
    <div
      class={`text-black font-medium text-sm border bg-gray-scale-100 absolute hidden invisible z-[9] mt-[84px] mb-0 mx-0 p-10 rounded-[0_0_20px_20px] border-solid border-blue-200 group-hover:flex group-hover:visible ${flexDirection} ${corStyles} ${formatoStyles} top-0 transitionl duration-300 ease-in-out`}
    >
      {values.map((item) => {
        const { url, selected, value } = item;

        if (label === "Cor") {
          return (
            <a href={url} class="w-[23%]">
              <div class="flex items-center mb-5 p-[5px] hover:border hover:p-1 rounded-[5px] border-solid border-base-200">
                <span class="border bg-[#0e4bef] border-solid border-[#0e4bef] h-[25px] w-[25px] rounded-full" />
                <p class="ml-[10px] font-bold">{value}</p>
              </div>
            </a>
          );
        }
        return <ValueItem {...item} />;
      })}
    </div>
  );
}

function Filters({ filters }: Props) {
  const selectedFilters = [2, 3, 4, 5, 14, 22];
  const filtersSelectedAndFiltered = filters.filter((filterItem) =>
    selectedFilters.includes(Number(filterItem.key))
  );

  return (
    <ul class="flex w-full justify-center flex-row">
      {filtersSelectedAndFiltered.map((filter) => (
        <li class="flex flex-row pl-7 pb-7 justify-between items-center font-medium text-lg text-[#212529] cursor-pointer group">
          <span>{filter.label}</span>
          <Icon size={24} id="ChevronDown" />
          {isToggle(filter) && <FilterValues {...filter} />}
        </li>
      ))}
    </ul>
  );
}

export default Filters;
