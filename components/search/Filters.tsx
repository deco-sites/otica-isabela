import { Color } from "$store/components/search/SearchResult.tsx";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import Icon from "deco-sites/otica-isabela/components/ui/Icon.tsx";

interface Props {
  filters: ProductListingPage["filters"];
  filterColors: Color[];
  hideFilters?: string[];
}

type FilterToggleValueWithHex = FilterToggleValue & {
  hex?: string;
};

type FilterValuesProps = {
  label: string;
  values: FilterToggleValueWithHex[];
  filterColors?: Color[];
};

export const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem({ url, selected, label }: FilterToggleValueWithHex) {
  return (
    <a href={url || "#"}>
      <div class="flex items-center mb-5">
        <div
          aria-checked={selected}
          class="checkbox border relative h-[30px] w-[30px] mr-2.5 rounded-[5px] border-solid border-black"
        />
        <span>{label}</span>
      </div>
    </a>
  );
}

function AgeOptions({ values }: { values: FilterToggleValueWithHex[] }) {
  const orderedAges = values.sort(
    (a, b) => parseInt(a.value, 10) - parseInt(b.value, 10),
  );

  return <>{orderedAges.map((item) => <ValueItem {...item} />)}</>;
}

function ColorOptions(
  { matchingColors }: {
    matchingColors: FilterToggleValueWithHex[];
  },
) {
  return (
    <>
      {matchingColors?.map((item) => {
        const { url, value, hex } = item;

        return (
          <a href={url}>
            <div class="flex items-center mb-5 p-[5px] hover:border hover:p-1 rounded-[5px] border-solid border-base-200">
              <span
                style={{ backgroundColor: hex }}
                class={`border border-solid h-[25px] w-[25px] rounded-full`}
              />
              <p class="ml-[10px] font-bold">{value}</p>
            </div>
          </a>
        );
      })}
    </>
  );
}

function FilterValues({
  label,
  values,
  filterColors,
}: FilterValuesProps) {
  const flexDirection =
    label === "Formato" || label === "Cor" || label === "Idade"
      ? "flex-row"
      : "flex-col";

  const colorAndAgeStyles = label === "Cor" || label === "Idade"
    ? "w-[650px] flex-wrap justify-between pb-5 right-24 [&>*]:w-[23%]"
    : "";
  const formatoStyles = label === "Formato"
    ? "w-[530px] flex-wrap justify-between"
    : "";

  const matchingColors: FilterToggleValueWithHex[] = values?.map(
    (value) => {
      const matchedColor = filterColors?.find(
        (color) => color.label === value.label,
      );
      if (matchedColor) {
        return {
          ...value,
          hex: matchedColor.hex,
        };
      } else {
        return value;
      }
    },
  );

  function Options() {
    if (label === "Idade") {
      return <AgeOptions values={values} />;
    }

    if (label === "Cor" && matchingColors) {
      return (
        <ColorOptions
          matchingColors={matchingColors}
        />
      );
    }

    return (
      <>
        {values.map((value) => <ValueItem {...value} />)}
      </>
    );
  }

  return (
    <div
      class={`text-black font-medium text-sm border bg-gray-scale-100 absolute hidden invisible z-[9] mt-[85px] mb-0 mx-0 p-10 rounded-[0_0_20px_20px] border-solid border-blue-200 group-hover:flex group-hover:visible ${flexDirection} ${colorAndAgeStyles} ${formatoStyles} top-0 transitionl duration-300 ease-in-out`}
    >
      <Options />
    </div>
  );
}

function Filters({ filters, filterColors, hideFilters = [] }: Props) {
  const defaultFilters = filters.filter((filterItem) => {
    return !hideFilters.includes(filterItem.label);
  });

  return (
    <ul class="flex w-full justify-center flex-row">
      {defaultFilters.map((filter) => (
        <li class="flex leading-relaxed flex-row pl-7 pb-7 justify-between items-center font-medium text-lg text-[#212529] cursor-pointer group">
          <span>{filter.label}</span>
          <Icon size={24} id="ChevronDown" />
          {isToggle(filter) && (
            <FilterValues filterColors={filterColors} {...filter} />
          )}
        </li>
      ))}
    </ul>
  );
}

export default Filters;
