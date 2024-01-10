import { FilterToggleValueWithHex } from "deco-sites/otica-isabela/components/search/Filters.tsx";
import { selectedFilters } from "deco-sites/otica-isabela/components/search/SelectedFilters.tsx";
import { ComponentChildren } from "preact";

export default function ValueItem({
  url,
  selected,
  label,
  type,
  children,
  hideCheckbox,
  withBorder,
  class: _class,
}: Omit<FilterToggleValueWithHex, "label"> & {
  label: string;
  type: string;
  hideCheckbox?: boolean;
  withBorder?: boolean;
  children?: ComponentChildren;
  class?: string;
  hasSelected?: boolean;
}) {
  const isSelected = selectedFilters.value.some((value) =>
    label === value.label
  );
  return (
    <button
      onClick={() => {
        const selected = selectedFilters.peek();
        const filters = selected.some((filter) => filter.label === label)
          ? selected.filter((filter) => filter.label !== label)
          : selected.concat({
            type,
            url,
            label,
          });
        selectedFilters.value = filters;
      }}
      class={_class}
    >
      <div class="flex items-center">
        {hideCheckbox ? null : (
          <div
            aria-checked={isSelected}
            class="checkbox border relative h-[30px] w-[30px] mr-2.5 rounded-[5px] border-solid border-black"
          />
        )}
        <span
          class={`${
            isSelected && withBorder ? "border" : ""
          } rounded-[5px] border-base-200 flex items-center gap-2.5 max-lg:font-medium`}
        >
          {children ?? label}
        </span>
      </div>
    </button>
  );
}
