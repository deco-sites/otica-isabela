import Filters from "$store/components/search/Filters.tsx";
import type { Props as SearchResultProps } from "$store/components/search/SearchResult.tsx";
import Sort from "$store/components/search/Sort.tsx";
import Button from "$store/components/ui/Button.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import SelectedFilters from "$store/islands/SelectedFilters.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "apps/commerce/types.ts";
import { selectedFilters } from "deco-sites/otica-isabela/components/search/SelectedFilters.tsx";
import Icon from "deco-sites/otica-isabela/components/ui/Icon.tsx";
import ApplyRangeFiltersJS from "deco-sites/otica-isabela/islands/ApplyRangeFiltersJS.tsx";

type Props = {
  filters: ProductListingPage["filters"];
  breadcrumb: ProductListingPage["breadcrumb"];
  sortOptions: ProductListingPage["sortOptions"];
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
        <div class="w-full flex flex-col items-center justify-center my-[30px]">
          <Icon class="text-black" id="Filter" width={50} height={50} />
          <span class="uppercase text-black text-lg font-bebas-neue">
            Filtro
          </span>
        </div>
        <div class="w-full">
          <SelectedFilters class="mb-5" filters={filters} />
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
          <button
            id="apply-range-filters-mobile"
            class="w-full uppercase border border-black rounded-[5px] bg-black font-medium text-base text-white cursor-pointer py-[5px] px-[20px] whitespace-nowrap"
          >
            FILTRAR
          </button>
          <ApplyRangeFiltersJS
            rootId="size-options-container-mobile"
            buttonId="apply-range-filters-mobile"
          />
        </div>
        <div class="w-full">
          <Filters
            filters={filters}
            filterColors={filterColors}
            hideFilters={hideFilters}
            typeIcons={typeIcons}
            shapeIcons={shapeIcons}
            isMobile
          />
        </div>
      </>
    );
  }

  function OrderByContent() {
    return (
      <>
        <div class="w-full flex flex-col items-center justify-center my-[30px]">
          <Icon class="text-black" id="Order" width={50} height={50} />
          <span class="uppercase text-black text-lg font-bebas-neue">
            Ordenar
          </span>
        </div>

        <div class="w-full">
          <a
            href={breadcrumb?.itemListElement.at(-1)?.item ?? ""}
            class="whitespace-nowrap uppercase w-full flex items-center justify-center mb-[30px] border border-black font-medium rounded-[5px] py-[5px] px-5 transition-colors duration-300 ease-in-out text-base bg-transparent text-black hover:text-white hover:bg-black"
          >
            Limpar Filtros
          </a>
        </div>
        <div class="w-full">
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
        <div class="relative bg-white opacity-[0.95] py-[30px] px-[20px] w-full h-full flex flex-col overflow-x-hidden overflow-y-scroll">
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
      <div class="lg:hidden relative w-full flex flex-row justify-between">
        <div class="flex w-1/2 px-[15px] justify-center items-center">
          <button
            class="border-0 px-0 h-full w-full py-[30px] bg-transparent flex flex-col flex-nowrap items-center justify-center"
            onClick={() => openFilter()}
          >
            <Icon class="text-base-200" id="Filter" width={50} height={50} />
            <span class="uppercase text-base-200 font-bebas-neue">Filtro</span>
          </button>
        </div>
        <div class="bg-base-200 absolute h-[92%] w-0.5 right-2/4 top-[5px]
        ">
        </div>
        <div class="flex w-1/2 px-[15px] justify-center items-center">
          <button
            class="border-0 px-0 h-full w-full py-[30px] bg-transparent flex flex-col flex-nowrap items-center justify-center"
            onClick={() => openOrderBy()}
          >
            <Icon class="text-base-200" id="Order" width={50} height={50} />
            <span class="uppercase text-base-200 font-bebas-neue">Ordenar</span>
          </button>
        </div>
      </div>
    </Drawer>
  );
}

export default SearchControls;
