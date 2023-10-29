import { isToggle } from "$store/components/search/Filters.tsx";
import type { Filter, FilterToggleValue } from "apps/commerce/types.ts";
import Icon from "deco-sites/otica-isabela/components/ui/Icon.tsx";

export interface Props {
  filters: Filter[];
  class?: string;
}

function SelectedFilters({ filters, class: _class = "" }: Props) {
  const selected = filters.reduce<FilterToggleValue[]>((acc, filter) => {
    if (!isToggle(filter)) return acc;

    return [...acc, ...filter.values.filter((value) => value.selected)];
  }, []);

  return (
    <ul class="w-full flex">
      {selected.map((item) => (
        <a href={item.url}>
          <li
            class={`flex items-center text-base-400 text-base cursor-pointer py-1 px-6 rounded-[5px] mr-5 border border-solid border-base-400 ${_class}`}
          >
            <p>{item.label}</p>
            <Icon class="text-base-200 ml-2" size={12} id="Close" />
          </li>
        </a>
      ))}
    </ul>
  );
}

export default SelectedFilters;
