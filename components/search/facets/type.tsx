import { useFilters } from "site/sdk/useFilters.ts";
import { IsabelaProductListingPage } from "site/packs/v2/types.ts";
import Icon from "site/components/ui/Icon.tsx";
import { Type } from "site/components/search/SearchResult.tsx";
import Image from "apps/website/components/Image.tsx";

interface TypeFacetsProps {
  facets: IsabelaProductListingPage["filters"];
  handleFilterChange: (
    key: string,
    operator: string,
    value: string,
    checked: boolean,
  ) => void;
  typeIcons: Type[];
}

export default function TypeFacets({
  facets,
  handleFilterChange,
  typeIcons,
}: TypeFacetsProps) {
  const filters = useFilters();
  const typeFacets = facets["facet_attribute_tipo"];

  if (!typeFacets || Object.keys(typeFacets).length <= 1) {
    return null;
  }

  return (
    <details class="group">
      <summary class="flex items-center justify-between py-3.5 border-b border-[#cdcdcd] cursor-pointer marker:hidden [&::-webkit-details-marker]:hidden hover:text-blue-200">
        <span class="text-sm font-medium">
          Tipo{" "}
          {filters.countFilter("Tipo") > 0 && (
            <span class="ml-1 bg-blue-200 inline-flex items-center justify-center w-5 h-5 text-center text-white rounded-[50%] text-xs">
              {filters.countFilter("Tipo").toString()}
            </span>
          )}
        </span>
        <Icon id="ChevronDown" size={24} />
      </summary>

      <ul class="flex flex-wrap gap-3.5 flex-col mb-6 pt-2.5">
        {Object.entries(typeFacets).slice(0, 10).map((
          [type, count],
        ) => {
          const icon = typeIcons.find((icon) => icon.label === type);

          return (
            <label
              key={type}
              htmlFor={`type-${type}`}
              class="flex items-center cursor-pointer"
            >
              <input
                id={`type-${type}`}
                type="checkbox"
                checked={filters.isFilterActive("Tipo", type, "in")}
                class="hidden"
                onChange={(e) =>
                  handleFilterChange(
                    "Tipo",
                    "in",
                    type,
                    e.currentTarget.checked,
                  )}
              />
              <span
                aria-checked={filters.isFilterActive(
                  "Tipo",
                  type,
                  "in",
                )}
                class="checkbox border relative h-[12px] w-[12px] mr-2.5 rounded-[3px] border-solid border-[#969696]"
              >
              </span>
              <span class="flex items-center gap-2.5 text-sm text-[#6f6f6f] font-medium">
                {icon && (
                  <Image
                    src={icon.icon}
                    alt={icon.label}
                    width={70}
                    height={29}
                  />
                )}
                {type}
                <span>({count})</span>
              </span>
            </label>
          );
        })}
      </ul>
    </details>
  );
}
