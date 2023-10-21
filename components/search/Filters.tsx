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

const filterItems = [
  {
    label: "Tamanho",
    values: [
      { label: "Grande" },
      { label: "Médio" },
      { label: "Pequeno" },
      { label: "Personalizado" },
    ],
  },
  {
    label: "Formato",
    values: [
      { label: "Quadrado" },
      { label: "Redondo" },
      { label: "Retangular" },
      { label: "Gatinho" },
    ],
  },
  {
    label: "Material",
    values: [
      { label: "Acetato" },
      { label: "Metal" },
      { label: "Alumínio" },
      { label: "TR90" },
    ],
  },
  {
    label: "Estilo",
    values: [
      { label: "Clássico" },
      { label: "Esportivo" },
      { label: "Moderno" },
      { label: "Vintage" },
    ],
  },
];

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
      {filterItems.map((filter) => (
        <li class="flex flex-row pl-7 pb-7 justify-between items-center font-medium text-lg text-[#212529] cursor-pointer group">
          <span>{filter.label}</span>
          <Icon size={24} id="ChevronDown" />

          <div class="border bg-gray-scale-100 absolute hidden invisible z-[9] mt-[84px] mb-0 mx-0 pt-10 pb-5 px-[50px] rounded-[0_0_20px_20px] border-solid border-blue-200 group-hover:flex group-hover:visible  flex-col top-0 transitionl duration-300 ease-in-out">
            {filter.values.map((item) => <span>{item.label}</span>)}
          </div>
          {/* <FilterValues {...filter} /> */}
        </li>
      ))}
    </ul>
  );
}

export default Filters;
