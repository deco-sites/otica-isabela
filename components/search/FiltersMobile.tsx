import Button from "$store/components/ui/Button.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import { useSignal } from "@preact/signals";
import Icon from "$store/components/ui/Icon.tsx";
import { IsabelaProductListingPage } from "site/packs/v2/types.ts";
import { useFilters } from "site/sdk/useFilters.ts";
import FormatFacets from "site/components/search/facets/format.tsx";
import ColorFacets from "site/components/search/facets/colors.tsx";
import MaterialFacets from "site/components/search/facets/material.tsx";
import AgeFacets from "site/components/search/facets/age.tsx";
import StyleFacets from "site/components/search/facets/style.tsx";
import LensesFacets from "site/components/search/facets/lenses.tsx";
import TypeFacets from "site/components/search/facets/type.tsx";
import DisposalTypeFacets from "site/components/search/facets/disposalType.tsx";
import LensesBrandFacets from "site/components/search/facets/lensesBrand.tsx";
import UseIndicationFacets from "site/components/search/facets/useIndication.tsx";
import {
  FilterHideOptions,
  Shape,
  Type,
} from "site/components/search/SearchResult.tsx";
import ActiveFilters from "site/islands/ActiveFilters.tsx";
import SizeFacets from "site/components/search/facets/size.tsx";

interface Props {
  facets: IsabelaProductListingPage["filters"];
  shapeIcons: Shape[];
  typeIcons: Type[];
  hideFilters?: FilterHideOptions[];
  url: string;
}

function FilterContent(
  { facets, shapeIcons, typeIcons, hideFilters, url }: Props,
) {
  const filters = useFilters();

  const hideFiltersList = hideFilters?.find(({ label }) =>
    new URLPattern({ pathname: label }).test(url)
  );

  const handleFilterChange = (
    key: string,
    operator: string,
    value: string,
    checked: boolean,
  ) => {
    if (checked) {
      filters.addFilter(key, operator, value);
    } else {
      filters.removeFilter(key, operator, value);
    }
  };

  const handleClearFilters = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", "1");
    Array.from(url.searchParams.keys())
      .filter((key) => key.startsWith("filter."))
      .forEach((key) => url.searchParams.delete(key));
    window.location.href = url.toString();
  };

  const handleApplyFilters = () => {
    const url = new URL(window.location.href);

    // Resetar página ao aplicar filtros
    url.searchParams.set("page", "1");

    // Remove all filter.* params
    Array.from(url.searchParams.keys())
      .filter((key) => key.startsWith("filter."))
      .forEach((key) => url.searchParams.delete(key));

    const apiFilters = filters.getApiFilters();
    for (const [key, value] of apiFilters.entries()) {
      url.searchParams.append(key, value);
    }

    // Redirecionar com os novos filtros
    window.location.href = url.toString();
  };

  const shouldShowFilter = (
    filterName: FilterHideOptions["filtersToHide"][number],
  ) => {
    return !hideFiltersList?.filtersToHide.includes(filterName);
  };

  return (
    <>
      <div class="w-full flex items-center justify-center mb-6 mt-3">
        <Icon class="text-black" id="Filter" width={30} height={30} />
        <span class="uppercase text-black text-lg font-outfit">
          Filtros
        </span>
      </div>
      <div class="w-full">
        {filters.filterCount.value > 0
          ? (
            <button
              onClick={handleClearFilters}
              class="whitespace-nowrap uppercase w-full flex items-center justify-center mb-[30px] border border-black font-medium rounded-[5px] py-[5px] px-5 transition-colors duration-300 ease-in-out text-base bg-transparent text-black hover:text-white hover:bg-black"
            >
              Limpar Filtros
            </button>
          )
          : null}
      </div>
      <div class="w-full bg-white p-[15px] relative">
        {shouldShowFilter("size") && (
          <SizeFacets facets={facets} handleFilterChange={handleFilterChange} />
        )}
        {shouldShowFilter("format") && (
          <FormatFacets
            facets={facets}
            handleFilterChange={handleFilterChange}
            shapeIcons={shapeIcons}
          />
        )}
        {shouldShowFilter("color") && (
          <ColorFacets
            facets={facets}
            handleFilterChange={handleFilterChange}
          />
        )}
        {shouldShowFilter("material") && (
          <MaterialFacets
            facets={facets}
            handleFilterChange={handleFilterChange}
          />
        )}
        {shouldShowFilter("style") && (
          <StyleFacets
            facets={facets}
            handleFilterChange={handleFilterChange}
          />
        )}
        {shouldShowFilter("lenses") && (
          <LensesFacets
            facets={facets}
            handleFilterChange={handleFilterChange}
          />
        )}
        {shouldShowFilter("type") && (
          <TypeFacets
            facets={facets}
            handleFilterChange={handleFilterChange}
            typeIcons={typeIcons}
          />
        )}
        {shouldShowFilter("age") && (
          <AgeFacets facets={facets} handleFilterChange={handleFilterChange} />
        )}
        {shouldShowFilter("disposal_type") && (
          <DisposalTypeFacets facets={facets} handleFilterChange={handleFilterChange} />
        )}
        {shouldShowFilter("lenses_brand") && (
          <LensesBrandFacets facets={facets} handleFilterChange={handleFilterChange} />
        )}
        {shouldShowFilter("use_indication") && (
          <UseIndicationFacets facets={facets} handleFilterChange={handleFilterChange} />
        )}

        <div class="bg-white w-full flex flex-col justify-center items-center py-5">
          <div class="w-full mb-2">
            <ActiveFilters />
          </div>
          <button
            onClick={handleApplyFilters}
            class="w-full uppercase border border-black rounded-[5px] bg-black font-medium text-base text-white cursor-pointer py-[5px] px-[20px] whitespace-nowrap"
          >
            <span>FILTRAR</span>
          </button>
        </div>
      </div>
    </>
  );
}

function FiltersMobile({
  facets,
  shapeIcons,
  typeIcons,
  hideFilters,
  url,
}: Props) {
  const filters = useFilters();
  const isOpen = useSignal(false);

  function openFilter() {
    isOpen.value = true;
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
          <FilterContent
            facets={facets}
            shapeIcons={shapeIcons}
            typeIcons={typeIcons}
            hideFilters={hideFilters}
            url={url}
          />
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
            {filters.filterCount.value > 0 && (
              <span class="ml-1 bg-blue-200 inline-flex items-center justify-center w-5 h-5 text-center text-white rounded-[50%] text-xs">
                {filters.filterCount.value.toString()}
              </span>
            )}
          </button>
        </div>
      </div>
    </Drawer>
  );
}

export default FiltersMobile;
