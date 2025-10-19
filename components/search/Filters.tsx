import { IsabelaProductListingPage } from "site/packs/v2/types.ts";
import { useFilters } from "site/sdk/useFilters.ts";
import FormatFacets from "site/components/search/facets/format.tsx";
import ColorFacets from "site/components/search/facets/colors.tsx";
import MaterialFacets from "site/components/search/facets/material.tsx";
import StyleFacets from "site/components/search/facets/style.tsx";
import TypeFacets from "site/components/search/facets/type.tsx";
import { Shape, Type } from "site/components/search/SearchResult.tsx";
import SizeFacets from "site/components/search/facets/size.tsx";

interface Props {
  facets: IsabelaProductListingPage["filters"];
  shapeIcons: Shape[];
  typeIcons: Type[];
}

export default function Filters({ facets, shapeIcons, typeIcons }: Props) {
  const filters = useFilters();

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

  return (
    <div class="hidden lg:flex flex-col mr-10 max-w-[200px] w-full">
      <div class="flex flex-col sticky top-0 z-10">
        <SizeFacets facets={facets} handleFilterChange={handleFilterChange} />
        <FormatFacets
          facets={facets}
          handleFilterChange={handleFilterChange}
          shapeIcons={shapeIcons}
        />
        <ColorFacets facets={facets} handleFilterChange={handleFilterChange} />
        <MaterialFacets
          facets={facets}
          handleFilterChange={handleFilterChange}
        />
        <StyleFacets facets={facets} handleFilterChange={handleFilterChange} />
        <TypeFacets
          facets={facets}
          handleFilterChange={handleFilterChange}
          typeIcons={typeIcons}
        />

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
