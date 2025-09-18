import { useEffect, useRef } from "preact/hooks";
import { IsabelaProductListingPage } from "site/packs/v2/types.ts";
import { useFilters } from "site/sdk/useFilters.ts";
import Icon from "site/components/ui/Icon.tsx";
interface Props {
  facets: IsabelaProductListingPage["filters"];
}

export default function Filters({ facets }: Props) {
  const filters = useFilters();
  const formatFacets = facets["facet_attribute_formato"];
  const isMountingRef = useRef(true);

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

  useEffect(() => {
    if (isMountingRef.current) {
      isMountingRef.current = false;
      return;
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
  }, [filters.filterCount]);

  return (
    <div class="flex flex-col mr-10 max-w-[200px] w-full">
      <div class="flex flex-col sticky top-0 z-10">
        {formatFacets &&
          Object.keys(formatFacets).length > 1 && (
          <details class="group">
            <summary class="flex items-center justify-between py-3.5 border-b border-[#cdcdcd] cursor-pointer marker:hidden [&::-webkit-details-marker]:hidden pt-0 hover:text-blue-200">
              <span class="text-sm">
                Formato{" "}
                {filters.countFilter("formatName") > 0 && (
                  <span class="ml-1 bg-blue-200 inline-flex items-center justify-center w-5 h-5 text-center text-white rounded-[50%] text-xs">
                    {filters.countFilter("formatName").toString()}
                  </span>
                )}
              </span>
              <Icon id="ChevronDown" size={24} />
            </summary>

            <ul class="flex flex-wrap gap-3.5 flex-col mb-6 pt-2.5">
              {Object.entries(formatFacets).slice(0, 10).map((
                [format, count],
              ) => (
                <label
                  key={format}
                  htmlFor={`format-${format}`}
                  class="flex items-center cursor-pointer"
                >
                  <input
                    id={`format-${format}`}
                    type="checkbox"
                    checked={filters.isFilterActive("formatName", format, "eq")}
                    class="hidden"
                    onChange={(e) =>
                      handleFilterChange(
                        "formatName",
                        "eq",
                        format,
                        e.currentTarget.checked,
                      )}
                  />
                  <span
                    aria-checked={filters.isFilterActive(
                      "formatName",
                      format,
                      "eq",
                    )}
                    class="checkbox border relative h-[12px] w-[12px] mr-2.5 rounded-[3px] border-solid border-[#969696]"
                  >
                  </span>
                  <span class="flex items-center gap-2.5 text-sm text-[#6f6f6f] font-medium">
                    {format}
                    <span>({count})</span>
                  </span>
                </label>
              ))}
            </ul>
          </details>
        )}
      </div>
    </div>
  );
}
