import { isToggle } from "$store/components/search/Filters.tsx";
import type { Filter, FilterToggleValue } from "apps/commerce/types.ts";
import Icon from "$store/components/ui/Icon.tsx";
import { signal } from "@preact/signals";
import { useEffect } from "preact/hooks";

export interface Props {
  filters: Filter[];
  class?: string;
}

type SelectedFilter = { url: string; label: string; type: string };

export const selectedFilters = signal<
  SelectedFilter[]
>([]);

function SelectedFilters({ filters, class: _class = "" }: Props) {
  const selected = filters.reduce<SelectedFilter[]>((acc, filter) => {
    if (!isToggle(filter)) return acc;

    return [
      ...acc,
      ...filter.values.filter((value) => value.selected).map((value) => ({
        url: value.url,
        label: value.label,
        type: filter.label,
      })),
    ];
  }, []);

  useEffect(
    () => {
      selectedFilters.value = selected;
    },
    [],
  );

  const removeFilter = (item: SelectedFilter) => {
    selectedFilters.value = selectedFilters.peek().filter((filter) =>
      filter.label !== item.label
    );

    const currentUrl = new URL(window.location.href);

    for (const [key, value] of currentUrl.searchParams.entries()) {
      if (key === `filter.${item.type}` && value === item.label) {
        currentUrl.searchParams.delete(key, value);
        break;
      }
    }

    if (window.location.href !== currentUrl.href) {
      window.location.href = currentUrl.href;
    }
  };

  return (
    <ul class="w-full flex flex-wrap gap-y-3">
      {selectedFilters.value.map((item) => (
        <button
          key={item.label}
          onClick={() => removeFilter(item)}
        >
          <li
            class={`flex bg-[#f3f3f3] items-center text-grayscale-700 text-base cursor-pointer py-1 px-6 rounded-[17px] mr-5 ${_class}`}
          >
            <p>{item.label}</p>
            <Icon class="text-grayscale-500 ml-2" size={12} id="Close" />
          </li>
        </button>
      ))}

      <li
        id="personalized-filter"
        class={`flex bg-[#f3f3f3] items-center text-grayscale-700 text-base cursor-pointer py-1 px-6 rounded-[17px] mr-5 ${_class}`}
        style={{ display: "none" }}
      >
        <p>Personalizado</p>
        <Icon class="text-grayscale-500 ml-2" size={12} id="Close" />
      </li>
    </ul>
  );
}

export default SelectedFilters;
