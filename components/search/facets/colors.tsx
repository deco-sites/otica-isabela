import { useFilters } from "site/sdk/useFilters.ts";
import { IsabelaProductListingPage } from "site/packs/v2/types.ts";
import Icon from "site/components/ui/Icon.tsx";
import { useId } from "$store/sdk/useId.ts";

interface ColorFacetsProps {
  facets: IsabelaProductListingPage["filters"];
  handleFilterChange: (
    key: string,
    operator: string,
    value: string,
    checked: boolean,
  ) => void;
}

export default function ColorFacets({
  facets,
  handleFilterChange,
}: ColorFacetsProps) {
  const componentId = useId();
  const filters = useFilters();
  const colorFacets = facets["facet_attribute_cor/attributeValue"];

  if (!colorFacets || Object.keys(colorFacets).length <= 0) {
    return null;
  }

  const getColorHex = (color: string) => {
    return color.split(":")[1].trim() || "#ffffff";
  };

  const getColorName = (color: string) => {
    return color.split(":")[0].trim() || color;
  };

  return (
    <details class="group">
      <summary class="flex items-center justify-between py-3.5 border-b border-[#cdcdcd] cursor-pointer marker:hidden [&::-webkit-details-marker]:hidden hover:text-blue-200">
        <span class="text-sm font-medium">
          Cor{" "}
          {filters.countFilter("Cor") > 0 && (
            <span class="ml-1 bg-blue-200 inline-flex items-center justify-center w-5 h-5 text-center text-white rounded-[50%] text-xs">
              {filters.countFilter("Cor").toString()}
            </span>
          )}
        </span>
        <Icon id="ChevronDown" size={24} />
      </summary>

      <ul class="pt-2.5 max-lg:grid max-lg:grid-cols-4 max-lg:gap-6 flex gap-3 flex-wrap">
        {Object.entries(colorFacets).map((
          [color, _count],
        ) => {
          const uniqueInputId = `${componentId}-color-${getColorName(color)}`;

          return (
            <label
              key={color}
              htmlFor={uniqueInputId}
              class="flex items-center cursor-pointer"
              style={{
                border: filters.isFilterActive("Cor", color, "in")
                  ? "1px solid #6f6f6f"
                  : "1px solid transparent",
              }}
            >
              <input
                id={uniqueInputId}
                type="checkbox"
                checked={filters.isFilterActive(
                  "Cor",
                  color,
                  "in",
                )}
                class="hidden"
                onChange={(e) =>
                  handleFilterChange(
                    "Cor",
                    "in",
                    color,
                    e.currentTarget.checked,
                  )}
              />
              <span
                style={{ backgroundColor: getColorHex(color) }}
                class="border border-solid w-5 h-5 rounded-full"
              >
              </span>
            </label>
          );
        })}
      </ul>
    </details>
  );
}
