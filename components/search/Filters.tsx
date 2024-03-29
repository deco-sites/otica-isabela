import { Color, Shape, Type } from "$store/components/search/SearchResult.tsx";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import SizeOptions from "deco-sites/otica-isabela/components/search/SizeOptions.tsx";
import Icon from "deco-sites/otica-isabela/components/ui/Icon.tsx";
import RangeFiltersJS from "deco-sites/otica-isabela/islands/RangeFiltersJS.tsx";
import ValueItem from "deco-sites/otica-isabela/islands/ValueItem.tsx";
import Image from "deco-sites/std/components/Image.tsx";

interface Props {
  filters: ProductListingPage["filters"];
  filterColors: Color[];
  hideFilters?: string[];
  shapeIcons: Shape[];
  typeIcons: Type[];
  isMobile?: boolean;
}

export type FilterToggleValueWithHex = FilterToggleValue & {
  hex?: string;
};

type FilterValuesProps = {
  label: string;
  values: FilterToggleValueWithHex[];
  filterColors?: Color[];
  shapeIcons: Shape[];
  typeIcons: Type[];
  position?: "left" | "right";
  isMobile?: boolean;
  rangeOptions?: Filter[] | null;
};

export const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function AgeOptions(
  { values, type }: { values: FilterToggleValueWithHex[]; type: string },
) {
  const orderedAges = values.sort(
    (a, b) => parseInt(a.value, 10) - parseInt(b.value, 10),
  );

  return (
    <>
      {orderedAges.map((item) => (
        <ValueItem type={type} class="w-full" {...item} />
      ))}
    </>
  );
}

function TypeOptions({
  values,
  typeIcons,
  type,
}: {
  values: FilterToggleValueWithHex[];
  typeIcons: Type[];
  type: string;
}) {
  return (
    <>
      {values.map(({ label, children, ...item }) => {
        const typeIcon = typeIcons?.find((icon) => icon.label === label);

        return (
          <ValueItem type={type} {...item} label={label}>
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

function ShapeOptions({
  values,
  shapeIcons,
  type,
}: {
  values: FilterToggleValueWithHex[];
  shapeIcons: Shape[];
  type: string;
}) {
  return (
    <>
      {values.map(({ label, children, ...item }) => {
        const shapeIcon = shapeIcons?.find((icon) => icon.label === label);

        return (
          <ValueItem {...item} type={type} class="lg:w-1/2" label={label}>
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

function ColorOptions({
  matchingColors,
  type,
}: {
  matchingColors: FilterToggleValueWithHex[];
  type: string;
}) {
  return (
    <div className="grid grid-cols-4 gap-6 max-lg:grid-cols-2 max-lg:gap-y-4 max-lg:gap-x-8">
      {matchingColors?.map(({ children, ...item }) => {
        const { value, hex, selected } = item;
        return (
          <ValueItem
            hideCheckbox
            withBorder
            type={type}
            key={value}
            {...item}
            hasSelected={selected}
            class="w-full"
          >
            <div class="flex items-center p-[5px] hover:border hover:p-1 rounded-[5px] border-base-200">
              <span
                style={{ backgroundColor: hex }}
                class={`border border-solid h-6 w-6 rounded-full`}
              />
              <p class="ml-[10px] font-bold whitespace-nowrap">{value}</p>
            </div>
          </ValueItem>
        );
      })}
    </div>
  );
}

function FilterValues({
  label,
  values,
  filterColors,
  typeIcons,
  shapeIcons,
  position,
  isMobile = false,
  rangeOptions,
}: FilterValuesProps) {
  const flexDirection = label === "Formato" || label === "Idade"
    ? "flex-row"
    : "flex-col";
  const ageStyles = label === "Idade" ? "w-[550px] pb-5 grid-cols-4" : "";
  const colorStyles = label === "Cor" ? "w-[650px] pb-5" : "";
  const shapeStyles = label === "Formato"
    ? "w-[530px] px-[50px] pb-[20px] grid grid-cols-2 gap-6"
    : "";
  const tipoStyles = label === "Tipo" ? "min-w-max" : "";
  const positionStyles = position === "left"
    ? "lg:top-full lg:left-0"
    : "lg:top-full lg:right-0";

  const matchingColors: FilterToggleValueWithHex[] = values?.map((value) => {
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
  });

  function Options({ isMobile }: { isMobile: boolean }) {
    if (label === "Tipo") {
      return <TypeOptions type={label} values={values} typeIcons={typeIcons} />;
    }

    if (label === "Formato") {
      return (
        <ShapeOptions type={label} values={values} shapeIcons={shapeIcons} />
      );
    }

    if (label === "Idade") {
      return <AgeOptions type={label} values={values} />;
    }

    if (label === "Cor" && matchingColors) {
      return <ColorOptions type={label} matchingColors={matchingColors} />;
    }

    if (label === "Tamanho") {
      const rootId = `size-options-container${isMobile ? "-mobile" : ""}`;

      return (
        <div id={rootId} class="lg:flex">
          <SizeOptions
            values={values}
            type={label}
            rangeOptions={rangeOptions!}
          />
          <RangeFiltersJS rootId={rootId} />
        </div>
      );
    }

    return (
      <>
        {values.map((value) => <ValueItem type={label} {...value} />)}
      </>
    );
  }

  return (
    <>
      {!isMobile
        ? (
          <div
            class={`grid gap-6 justify-start font-medium text-black text-sm border bg-gray-scale-100 absolute invisible group-hover:visible z-[9] mb-0 mx-0 p-10 rounded-[0_0_20px_20px] border-solid border-blue-200 top-0 transition duration-300 ease-in-out ${flexDirection} ${ageStyles} ${colorStyles} ${tipoStyles} ${shapeStyles} ${positionStyles}
			  `}
          >
            <Options isMobile={isMobile} />
          </div>
        )
        : (
          <div class="collapse-content grid gap-6">
            <Options isMobile={isMobile} />
          </div>
        )}
    </>
  );
}

function Filters({
  filters,
  filterColors,
  shapeIcons,
  typeIcons,
  isMobile = false,
}: Props) {
  const rangeFilters =
    filters.filter((filter) => filter["@type"] === "FilterRange") || [];
  const defaultFilters = filters.filter((filter) =>
    filter["@type"] !== "FilterRange"
  );

  return (
    <>
      <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html: `
            #filter-range-input {
              background: linear-gradient(#42c3ff,#42c3ff) no-repeat center;
              background-size: 100% 2px;
              appearance: none;
              padding: 0 2px;
            }

            #filter-range-input::-webkit-slider-thumb {
              pointer-events: all;
              border: 2px solid #42c3ff;
              height: 24px;
              width: 24px;
              border-radius: 50%;
              background: #FFFFFF;
              cursor: pointer;
              -webkit-appearance: none;
            }
          `,
        }}
      />
      {!isMobile
        ? (
          <ul class="flex w-full justify-center flex-row">
            {defaultFilters.map((filter, index, array) => (
              <li class="flex relative leading-relaxed flex-row px-3.5 justify-between items-center font-medium text-lg text-[#212529] cursor-pointer group hover:text-blue-200 py-1">
                <span>{filter.label}</span>
                <Icon size={24} id="ChevronDown" />
                {isToggle(filter) && (
                  <FilterValues
                    typeIcons={typeIcons}
                    shapeIcons={shapeIcons}
                    filterColors={filterColors}
                    position={index < array.length / 2 ? "left" : "right"}
                    rangeOptions={filter.label === "Tamanho"
                      ? rangeFilters
                      : null}
                    {...filter}
                  />
                )}
              </li>
            ))}
          </ul>
        )
        : (
          <ul class="lg:hidden flex w-full justify-center flex-col">
            {defaultFilters.map((filter) => (
              <li key={filter.key} class="collapse collapse-arrow ">
                <input type="checkbox" />
                <div class="collapse-title after:!w-4 after:!h-4 font-roboto text-lg font-bold">
                  {filter.label}
                </div>
                {isToggle(filter) && (
                  <FilterValues
                    typeIcons={typeIcons}
                    shapeIcons={shapeIcons}
                    filterColors={filterColors}
                    rangeOptions={filter.label === "Tamanho"
                      ? rangeFilters
                      : null}
                    isMobile
                    {...filter}
                  />
                )}
              </li>
            ))}
          </ul>
        )}
    </>
  );
}

export default Filters;
