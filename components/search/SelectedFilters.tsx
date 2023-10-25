import type { Filter, FilterToggleValue } from "apps/commerce/types.ts";
import { isToggle } from "$store/components/search/Filters.tsx";

export interface Props {
  filters: Filter[];
}

function SelectedFilters({ filters }: Props) {
  const selected = filters.reduce<FilterToggleValue[]>((acc, filter) => {
    if (!isToggle(filter)) return acc;

    return [...acc, ...filter.values.filter((value) => value.selected)];
  }, []);

  return (
    <ul>
      {selected.map((item) => (
        <li>
          {item.label}
        </li>
      ))}
    </ul>
  );
}

export default SelectedFilters;
