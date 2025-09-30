import { type Filter, useFilters } from "site/sdk/useFilters.ts";
import Icon from "site/components/ui/Icon.tsx";

export default function ActiveFilters() {
  const filters = useFilters();

  const handleClearFilter = (filter: Filter) => {
    filters.removeFilter(filter.key, filter.operator, filter.value, true);
  };

  return (
    <div class="max-lg:hidden">
      <ul class="w-full flex flex-wrap gap-y-3">
        {filters.activeFilters.map((filter) => (
          <li>
            <button
              onClick={() => handleClearFilter(filter)}
              class="flex bg-[#f3f3f3] items-center text-grayscale-700 text-xs lg:text-base cursor-pointer py-1 px-3 lg:px-6 rounded-[17px] mr-2 lg:mr-5"
            >
              <span>{filter.value}</span>
              <Icon class="text-grayscale-500 ml-2" id="Close" size={12} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
