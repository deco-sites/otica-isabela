import { useFilters } from "site/sdk/useFilters.ts";
import { useId } from "$store/sdk/useId.ts";
import { IsabelaProductListingPage } from "site/packs/v2/types.ts";
import Icon from "site/components/ui/Icon.tsx";

interface MaterialFacetsProps {
  facets: IsabelaProductListingPage["filters"];
  handleFilterChange: (
    key: string,
    operator: string,
    value: string,
    checked: boolean,
  ) => void;
}

export default function MaterialFacets({
  facets,
  handleFilterChange,
}: MaterialFacetsProps) {
  const componentId = useId();
  const filters = useFilters();
  const materialFacets = facets["facet_attribute_material/attributeValue"];

  if (!materialFacets || Object.keys(materialFacets).length <= 0) {
    return null;
  }

  return (
    <details class="group">
      <summary class="flex items-center justify-between py-3.5 border-b border-[#cdcdcd] cursor-pointer marker:hidden [&::-webkit-details-marker]:hidden hover:text-blue-200">
        <span class="text-sm font-medium">
          Material{" "}
          {filters.countFilter("Material") > 0 && (
            <span class="ml-1 bg-blue-200 inline-flex items-center justify-center w-5 h-5 text-center text-white rounded-[50%] text-xs">
              {filters.countFilter("Material").toString()}
            </span>
          )}
        </span>
        <Icon id="ChevronDown" size={24} />
      </summary>

      <ul class="flex flex-wrap gap-3.5 flex-col mb-6 pt-2.5">
        {Object.entries(materialFacets).slice(0, 10).map((
          [material, count],
        ) => {
          const uniqueInputId = `${componentId}-material-${material}`;

          return (
            <label
              key={material}
              htmlFor={uniqueInputId}
              class="flex items-center cursor-pointer"
            >
              <input
                id={uniqueInputId}
                type="checkbox"
                checked={filters.isFilterActive("Material", material, "in")}
                class="hidden"
                onChange={(e) =>
                  handleFilterChange(
                    "Material",
                    "in",
                    material,
                    e.currentTarget.checked,
                  )}
              />
              <span
                aria-checked={filters.isFilterActive(
                  "Material",
                  material,
                  "in",
                )}
                class="checkbox border relative h-[12px] w-[12px] mr-2.5 rounded-[3px] border-solid border-[#969696]"
              >
              </span>
              <span class="flex items-center gap-2.5 text-sm text-[#6f6f6f] font-medium">
                {material}
                <span>({count})</span>
              </span>
            </label>
          );
        })}
      </ul>
    </details>
  );
}
