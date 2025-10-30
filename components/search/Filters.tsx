import { IsabelaProductListingPage } from "site/packs/v2/types.ts";
import { useFilters } from "site/sdk/useFilters.ts";
import FormatFacets from "site/components/search/facets/format.tsx";
import ColorFacets from "site/components/search/facets/colors.tsx";
import MaterialFacets from "site/components/search/facets/material.tsx";
import AgeFacets from "site/components/search/facets/age.tsx";
import StyleFacets from "site/components/search/facets/style.tsx";
import TypeFacets from "site/components/search/facets/type.tsx";
import LensesFacets from "site/components/search/facets/lenses.tsx";
import DisposalTypeFacets from "site/components/search/facets/disposalType.tsx";
import LensesBrandFacets from "site/components/search/facets/lensesBrand.tsx";
import UseIndicationFacets from "site/components/search/facets/useIndication.tsx";
import {
  FilterHideOptions,
  Shape,
  Type,
} from "site/components/search/SearchResult.tsx";
import SizeFacets from "site/components/search/facets/size.tsx";

interface Props {
  facets: IsabelaProductListingPage["filters"];
  shapeIcons: Shape[];
  typeIcons: Type[];
  hideFilters?: FilterHideOptions[];
  url: string;
}

export default function Filters(
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

    const url = new URL(window.location.href);
    const currentUrl = url.toString();

    // 🔑 Sempre resetar página ao mudar filtros
    url.searchParams.set("page", "1");

    // Remove all filter.* params
    Array.from(url.searchParams.keys())
      .filter((key) => key.startsWith("filter."))
      .forEach((key) => url.searchParams.delete(key));

    const apiFilters = filters.getApiFilters();
    for (const [key, value] of apiFilters.entries()) {
      url.searchParams.append(key, value);
    }

    if (currentUrl !== url.toString()) {
      window.location.href = url.toString();
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

  const shouldShowFilter = (
    filterName: FilterHideOptions["filtersToHide"][number],
  ) => {
    return !hideFiltersList?.filtersToHide.includes(filterName);
  };

  return (
    <div class="hidden lg:flex flex-col mr-10 max-w-[200px] w-full">
      <div class="flex flex-col sticky top-0 z-10">
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

        <button
          onClick={handleClearFilters}
          class="mt-6 whitespace-nowrap uppercase border border-black font-medium rounded-[5px] py-[5px] px-5 transition-colors duration-300 ease-in-out text-base bg-white text-black hover:text-white hover:bg-black text-center"
        >
          Limpar Filtros
        </button>
      </div>
    </div>
  );
}
