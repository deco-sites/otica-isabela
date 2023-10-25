import { Color, Shape, Type } from "$store/components/search/SearchResult.tsx";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import Icon from "deco-sites/otica-isabela/components/ui/Icon.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import { ComponentChildren } from "preact";

interface Props {
  filters: ProductListingPage["filters"];
  filterColors: Color[];
  hideFilters?: string[];
  shapeIcons: Shape[];
  typeIcons: Type[];
}

type FilterToggleValueWithHex = FilterToggleValue & {
  hex?: string;
};

type FilterValuesProps = {
  label: string;
  values: FilterToggleValueWithHex[];
  filterColors?: Color[];
  shapeIcons: Shape[];
  typeIcons: Type[];
  position: "left" | "right";
};

export const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label, children, class: _class }:
    & Omit<FilterToggleValueWithHex, "label">
    & { label?: string; children?: ComponentChildren; class?: string },
) {
  return (
    <a href={url || "#"} class={_class}>
      <div class="flex items-center mb-5">
        <div
          aria-checked={selected}
          class="checkbox border relative h-[30px] w-[30px] mr-2.5 rounded-[5px] border-solid border-black"
        />
        <span class="flex items-center gap-2.5">{label ?? children}</span>
      </div>
    </a>
  );
}

function AgeOptions({ values }: { values: FilterToggleValueWithHex[] }) {
  const orderedAges = values.sort(
    (a, b) => parseInt(a.value, 10) - parseInt(b.value, 10),
  );

  return (
    <>{orderedAges.map((item) => <ValueItem class="lg:w-1/4" {...item} />)}</>
  );
}

function TypeOptions(
  { values, typeIcons }: {
    values: FilterToggleValueWithHex[];
    typeIcons: Type[];
  },
) {
  return (
    <>
      {values.map(({ label, ...item }) => {
        const typeIcon = typeIcons?.find((icon) => icon.label === label);

        return (
          <ValueItem {...item}>
            {typeIcon
              ? (
                <Image
                  src={typeIcon.icon}
                  alt={typeIcon.label}
                  width={70}
                  height={29}
                />
              )
              : null}
            {label}
          </ValueItem>
        );
      })}
    </>
  );
}

function ShapeOptions(
  { values, shapeIcons }: {
    values: FilterToggleValueWithHex[];
    shapeIcons: Shape[];
  },
) {
  return (
    <>
      {values.map(({ label, ...item }) => {
        const shapeIcon = shapeIcons?.find((icon) => icon.label === label);

        return (
          <ValueItem {...item} class="lg:w-1/2">
            {shapeIcon
              ? (
                <Image
                  src={shapeIcon.image}
                  alt={shapeIcon.label}
                  width={50}
                  height={shapeIcon.height}
                />
              )
              : null}
            {label}
          </ValueItem>
        );
      })}
    </>
  );
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
          <a href={url} class="lg:w-1/4">
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
  typeIcons,
  shapeIcons,
  position,
}: FilterValuesProps) {
  const flexDirection =
    label === "Formato" || label === "Cor" || label === "Idade"
      ? "flex-row"
      : "flex-col";
  const colorAndAgeStyles = label === "Cor" || label === "Idade"
    ? "w-[650px] flex-wrap justify-between pb-5"
    : "";
  const formatoStyles = label === "Formato"
    ? "w-[530px] px-[50px] pb-[20px] flex-wrap justify-between"
    : "";
  const positionStyles = position === "left"
    ? "lg:top-full lg:left-0"
    : "lg:top-full lg:right-0";

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
    if (label === "Tipo") {
      return <TypeOptions values={values} typeIcons={typeIcons} />;
    }

    if (label === "Formato") {
      return <ShapeOptions values={values} shapeIcons={shapeIcons} />;
    }

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
      class={`text-black font-medium text-sm border bg-gray-scale-100 absolute hidden invisible z-[9] mb-0 mx-0 p-10 rounded-[0_0_20px_20px] border-solid border-blue-200 group-hover:flex group-hover:visible top-0 transitionl duration-300 ease-in-out
        ${flexDirection} ${colorAndAgeStyles} ${formatoStyles} ${positionStyles}
      `}
    >
      <Options />
    </div>
  );
}

function Filters(
  { filters, filterColors, hideFilters = [], shapeIcons, typeIcons }: Props,
) {
  const defaultFilters = filters.filter((filterItem) => {
    return !hideFilters.includes(filterItem.label);
  });

  return (
    <ul class="flex w-full justify-center flex-row">
      {defaultFilters.map((filter, index, array) => (
        <li class="flex relative leading-relaxed flex-row px-3.5 pb-7 justify-between items-center font-medium text-lg text-[#212529] cursor-pointer group">
          <span>{filter.label}</span>
          <Icon size={24} id="ChevronDown" />
          {isToggle(filter) && (
            <FilterValues
              typeIcons={typeIcons}
              shapeIcons={shapeIcons}
              filterColors={filterColors}
              position={index < array.length / 2 ? "left" : "right"}
              {...filter}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

export default Filters;
