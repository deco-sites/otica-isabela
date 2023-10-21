import { formatPrice } from "$store/sdk/format.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import Icon from "deco-sites/otica-isabela/components/ui/Icon.tsx";
import { parseRange } from "deco-sites/std/utils/filters.ts";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem({ url, selected, label, quantity }: FilterToggleValue) {
  return (
    <a href={url} class="flex items-center gap-2">
      <div aria-checked={selected} class="checkbox" />
      <span class="text-sm">{label}</span>
      {quantity > 0 && <span class="text-sm text-base-300">({quantity})</span>}
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";

  return (
    <ul class={`flex flex-wrap gap-2 ${flexDirection}`}>
      {values.map((item) => {
        const { url, selected, value } = item;

        if (key === "cor" || key === "tamanho") {
          return (
            <a href={url}>
              <span>{value}</span>
            </a>
          );
        }

        if (key === "price") {
          const range = parseRange(item.value);

          return (
            range && (
              <ValueItem
                {...item}
                label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
              />
            )
          );
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function Filters({ filters }: Props) {
  return (
    <ul class="flex w-full justify-center flex-row">
      {filters.filter(isToggle).map((filter) => (
        <li class="flex flex-row pl-7 pb-7 justify-between items-center font-medium text-lg text-[#212529] cursor-pointer">
          <span>{filter.label}</span>
          <Icon size={24} id="ChevronDown" />
          <FilterValues {...filter} />
        </li>
      ))}
    </ul>
  );
}

export default Filters;
