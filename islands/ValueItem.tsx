import { FilterToggleValueWithHex } from "$store/components/search/Filters.tsx";
import { selectedFilters } from "$store/components/search/SelectedFilters.tsx";
import { ComponentChildren } from "preact";

export default function ValueItem({
  url,
  selected,
  label,
  type,
  children,
  hideCheckbox,
  withBorder,
  isMobile,
  class: _class,
}: Omit<FilterToggleValueWithHex, "label" | "children"> & {
  label: string;
  type: string;
  hideCheckbox?: boolean;
  withBorder?: boolean;
  children?: ComponentChildren;
  class?: string;
  hasSelected?: boolean;
  isMobile?: boolean;
}) {
  const isSelected = selectedFilters.value.some((value) =>
    label === value.label
  );

  console.log(isMobile, "ta mobile ? ");

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

        if (isMobile) return;

        const getUrl = new URL(window.location.href);

        for (const [key, value] of getUrl.searchParams.entries()) {
          if (
            !selectedFilters.peek().some((filter) =>
              filter.label === value && `filter.${filter.type}` === key
            )
          ) {
            getUrl.searchParams.delete(key, value);
          }
        }

        selectedFilters.value.forEach(({ type, label }) => {
          if (getUrl.searchParams.has(`filter.${type}`, label)) return;
          getUrl.searchParams.append(`filter.${type}`, label);
        });
        console.log(getUrl, "get url aq");

        if (window.location.href !== getUrl.href) {
          console.log("entra no if?");
          window.location.href = getUrl.href;
        }
      }}
      class={_class}
    >
      <div class="flex items-center">
        {hideCheckbox ? null : (
          <div
            aria-checked={isSelected}
            class="checkbox border relative h-[12px] w-[12px] mr-2.5 rounded-[3px] border-solid border-[#969696]"
          />
        )}
        <span
          class={`${
            isSelected && withBorder ? "border" : ""
          } flex items-center text-sm gap-2.5 max-lg:font-medium text-[#6f6f6f]`}
        >
          {children ?? label}
        </span>
      </div>
    </button>
  );
}
