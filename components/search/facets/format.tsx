import { useFilters } from "site/sdk/useFilters.ts";
import { useId } from "$store/sdk/useId.ts";
import { IsabelaProductListingPage } from "site/packs/v2/types.ts";
import Icon from "site/components/ui/Icon.tsx";
import { Shape } from "site/components/search/SearchResult.tsx";
import Image from "apps/website/components/Image.tsx";

interface FormatFacetsProps {
  facets: IsabelaProductListingPage["filters"];
  handleFilterChange: (
    key: string,
    operator: string,
    value: string,
    checked: boolean,
  ) => void;
  shapeIcons: Shape[];
}

export default function FormatFacets({
  facets,
  handleFilterChange,
  shapeIcons,
}: FormatFacetsProps) {
  const componentId = useId();
  const filters = useFilters();
  const formatFacets = facets["facet_attribute_formato"];

  if (!formatFacets || Object.keys(formatFacets).length <= 1) {
    return null;
  }

  return (
    <details class="group">
      <summary class="flex items-center justify-between py-3.5 border-b border-[#cdcdcd] cursor-pointer marker:hidden [&::-webkit-details-marker]:hidden pt-0 hover:text-blue-200">
        <span class="text-sm font-medium">
          Formato{" "}
          {filters.countFilter("Formato") > 0 && (
            <span class="ml-1 bg-blue-200 inline-flex items-center justify-center w-5 h-5 text-center text-white rounded-[50%] text-xs">
              {filters.countFilter("Formato").toString()}
            </span>
          )}
        </span>
        <Icon id="ChevronDown" size={24} />
      </summary>

      <ul class="flex flex-wrap gap-3.5 flex-col mb-6 pt-2.5">
        {Object.entries(formatFacets).slice(0, 10).map((
          [format, count],
        ) => {
          const shape = shapeIcons.find((shape) => shape.label === format);
          const uniqueInputId = `${componentId}-format-${format}`;

          return (
            <label
              key={format}
              htmlFor={uniqueInputId}
              class="flex items-center cursor-pointer"
            >
              <input
                id={uniqueInputId}
                type="checkbox"
                checked={filters.isFilterActive("Formato", format, "in")}
                class="hidden"
                onChange={(e) =>
                  handleFilterChange(
                    "Formato",
                    "in",
                    format,
                    e.currentTarget.checked,
                  )}
              />
              <span
                aria-checked={filters.isFilterActive(
                  "Formato",
                  format,
                  "in",
                )}
                class="checkbox border relative h-[12px] w-[12px] mr-2.5 rounded-[3px] border-solid border-[#969696]"
              >
              </span>
              <span class="flex items-center gap-2.5 text-sm text-[#6f6f6f] font-medium">
                {shape && (
                  <Image
                    src={shape.image}
                    alt={shape.label}
                    width={50}
                    height={shape.height}
                  />
                )}
                {format}
                <span>({count})</span>
              </span>
            </label>
          );
        })}
      </ul>
    </details>
  );
}
