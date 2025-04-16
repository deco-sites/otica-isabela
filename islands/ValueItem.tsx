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
  class: _class,
}: Omit<FilterToggleValueWithHex, "label" | "children"> & {
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

  const handleFilterClick = () => {
    const selected = selectedFilters.peek();
    const filters = selected.some((filter) => filter.label === label)
      ? selected.filter((filter) => filter.label !== label)
      : selected.concat({
        type,
        url,
        label,
      });

    selectedFilters.value = filters;

    // Aplicar o filtro automaticamente ao clicar
    setTimeout(() => {
      const currentUrl = new URL(window.location.href);

      // Limpar filtros existentes do mesmo tipo
      for (const [key, value] of currentUrl.searchParams.entries()) {
        if (
          key === `filter.${type}` &&
          !filters.some((filter) => filter.label === value)
        ) {
          currentUrl.searchParams.delete(key, value);
        }
      }

      // Adicionar novos filtros
      filters.forEach(({ type: filterType, label: filterLabel }) => {
        if (!currentUrl.searchParams.has(`filter.${filterType}`, filterLabel)) {
          currentUrl.searchParams.append(`filter.${filterType}`, filterLabel);
        }
      });

      // Navegar para a nova URL se for diferente da atual
      if (window.location.href !== currentUrl.href) {
        window.location.href = currentUrl.href;
      }
    }, 0);
  };

  return (
    <button
      onClick={handleFilterClick}
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
            isSelected && withBorder ? "border-2" : ""
          } rounded-full text-[#6f6f6f] text-sm border-slot-primary-500 flex items-center gap-2.5 max-lg:font-medium`}
        >
          {children ?? label}
        </span>
      </div>
    </button>
  );
}
