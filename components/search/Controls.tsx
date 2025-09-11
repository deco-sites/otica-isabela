import Filters from "$store/components/search/Filters.tsx";
import { isToggle } from "$store/components/search/Filters.tsx";
import type { Props as SearchResultProps } from "$store/components/search/SearchResult.tsx";
import Sort from "$store/components/search/Sort.tsx";
import Button from "$store/components/ui/Button.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import SelectedFilters from "$store/islands/SelectedFilters.tsx";
import { useSignal } from "@preact/signals";
import type {} from "apps/commerce/types.ts";
import { selectedFilters } from "$store/components/search/SelectedFilters.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import ApplyRangeFiltersJS from "$store/islands/ApplyRangeFiltersJS.tsx";
import { IsabelaProductListingPage } from "site/packs/v2/types.ts";

type Props = {
  filters: IsabelaProductListingPage["filters"];
  breadcrumb: IsabelaProductListingPage["breadcrumb"];
  sortOptions: IsabelaProductListingPage["sortOptions"];
  hideFilters: SearchResultProps["hideFilters"];
  typeIcons: SearchResultProps["typeIcons"];
  shapeIcons: SearchResultProps["shapeIcons"];
  filterColors: SearchResultProps["filterColors"];
};

function SearchControls({
  filters,
  breadcrumb,
  sortOptions,
  hideFilters = [],
  typeIcons = [],
  shapeIcons = [],
  filterColors = [],
}: Props) {
  const isOpen = useSignal(false);
  const isFilter = useSignal(false);

  function openFilter() {
    isOpen.value = true;
    isFilter.value = true;
  }

  function openOrderBy() {
    isOpen.value = true;
    isFilter.value = false;
  }

  function FilterContent() {
    return (
      <>
        <div class="w-full flex items-center justify-center mb-6 mt-3">
          <Icon class="text-black" id="Filter" width={30} height={30} />
          <span class="uppercase text-black text-lg font-outfit">
            Filtros
          </span>
        </div>
        <div class="w-full">
          {selectedFilters.value?.length > 0
            ? (
              <a
                href={breadcrumb?.itemListElement.at(-1)?.item ?? ""}
                class="whitespace-nowrap uppercase w-full flex items-center justify-center mb-[30px] border border-black font-medium rounded-[5px] py-[5px] px-5 transition-colors duration-300 ease-in-out text-base bg-transparent text-black hover:text-white hover:bg-black"
              >
                Limpar Filtros
              </a>
            )
            : null}
        </div>
        <div class="w-full bg-white p-[15px] relative">
          <Filters
            filters={filters}
            filterColors={filterColors}
            hideFilters={hideFilters}
            typeIcons={typeIcons}
            shapeIcons={shapeIcons}
            isMobile
          />
          <div class="bg-white w-full flex flex-col justify-center items-center py-5">
            <div class="w-full">
              <SelectedFilters class="mb-2 lg:mb-5" filters={filters} />
            </div>
            <button
              id="apply-range-filters-mobile"
              class="w-full uppercase border border-black rounded-[5px] bg-black font-medium text-base text-white cursor-pointer py-[5px] px-[20px] whitespace-nowrap"
            >
              <span>FILTRAR</span>
            </button>
          </div>
        </div>
        <ApplyRangeFiltersJS
          rootId="size-options-container-mobile"
          buttonId="apply-range-filters-mobile"
        />
      </>
    );
  }

  function OrderByContent() {
    return (
      <>
        <div class="w-full flex items-center justify-center mb-6 mt-3">
          <Icon class="text-black" id="Order" width={30} height={30} />
          <span class="uppercase text-black text-lg font-outfit">
            Ordenar
          </span>
        </div>
        <div class="w-full bg-white p-[15px]">
          {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
        </div>
      </>
    );
  }

  return (
    <Drawer
      open={isOpen.value}
      class="lg:hidden"
      onClose={() => (isOpen.value = false)}
      aside={
        <div class="relative bg-[#e3e3e3] opacity-1 px-1.5 w-full h-full flex flex-col overflow-x-hidden overflow-y-scroll">
          <div class="absolute top-0 right-0">
            <Button
              class="relative btn btn-ghost hover:bg-transparent"
              onClick={() => (isOpen.value = false)}
            >
              <Icon class="text-red-500" id="XMark" size={24} />
            </Button>
          </div>
          {isFilter.value ? <FilterContent /> : <OrderByContent />}
        </div>
      }
    >
      <div class="lg:hidden relative w-[95%] mx-auto flex flex-row gap-3 font-outfit">
        <div class="flex justify-center items-center">
          <button
            class="border-[1px] border-solid border-grayscale-700 rounded-md h-full w-fit py-1 px-3 bg-transparent flex gap-1 flex-nowrap items-center justify-center"
            onClick={() => openFilter()}
          >
            <Icon
              class="text-grayscale-700"
              id="Filter"
              width={16}
              height={16}
            />
            <span class="text-grayscale-700 text-xs font-bold">
              Filtrar
            </span>
            {filters.some((filter) => isToggle(filter)) && (
              <span class="ml-1 bg-blue-200 inline-flex items-center justify-center w-5 h-5 text-center text-white rounded-[50%] text-xs">
                {filters.reduce((count, filter) => {
                  if (isToggle(filter)) {
                    return count + filter.values.filter((value) =>
                      value.selected
                    ).length;
                  }
                  return count;
                }, 0)}
              </span>
            )}
          </button>
        </div>
        <div class="hidden justify-center items-center">
          <button
            class="border-[1px] border-solid border-grayscale-700 rounded-[17px] h-full w-fit py-1 px-3 bg-transparent flex gap-1 flex-nowrap items-center justify-center"
            onClick={() => openOrderBy()}
          >
            <Icon class="text-gray-700" id="Order" width={16} height={16} />
            <span class="uppercase text-gray-700 text-xs font-bold">
              Ordenar
            </span>
          </button>
        </div>
      </div>
    </Drawer>
  );
}

export default SearchControls;
