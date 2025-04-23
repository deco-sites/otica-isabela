import { Color, Shape, Type } from "$store/components/search/SearchResult.tsx";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import SizeOptions from "$store/components/search/SizeOptions.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import RangeFiltersJS from "$store/islands/RangeFiltersJS.tsx";
import ValueItem from "$store/islands/ValueItem.tsx";
import Image from "apps/website/components/Image.tsx";

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
    <div className="max-lg:grid max-lg:grid-cols-4 max-lg:gap-6 flex gap-3 flex-wrap">
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
            class="w-fit"
          >
            <div class="flex items-center tooltip tooltip-top" data-tip={value}>
              <span
                title={value}
                style={{ backgroundColor: hex }}
                class={`border border-solid h-5 w-5 rounded-full`}
              />
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
        <div id={rootId} class="">
          <SizeOptions
            values={values}
            type={label}
            rangeOptions={rangeOptions!}
            isMobile={isMobile}
          />
          <RangeFiltersJS rootId={rootId} isMobile={isMobile} />
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
            class={`grid gap-3 justify-start font-medium text-grayscale-700 text-sm mb-0 mx-0 rounded-[0_0_20px_20px] transition duration-300 ease-in-out
			  `}
          >
            <Options isMobile={isMobile} />
          </div>
        )
        : (
          <div class="collapse-content grid gap-6 max-h-[210px] !min-h-[unset] overflow-auto">
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
          <ul class="hidden lg:flex flex-col w-full">
            {defaultFilters.map((filter, index, array) => (
              <li class="flex flex-col relative leading-relaxed justify-between font-medium text-lg text-[#212529] cursor-pointer group hover:text-blue-200">
                <details class="group">
                  <summary
                    class={`flex items-center justify-between py-3.5 border-b border-[#cdcdcd] cursor-pointer marker:hidden [&::-webkit-details-marker]:hidden ${
                      index === 0 ? "pt-0" : ""
                    }`}
                  >
                    <span class="text-sm">
                      {filter.label}
                      {isToggle(filter) && filter.values.filter((value) =>
                            value.selected
                          ).length > 0 &&
                        (
                          <span class="ml-1 bg-blue-200 inline-flex items-center justify-center w-5 h-5 text-center text-white rounded-[50%] text-xs">
                            {filter.values.filter((value) => value.selected)
                              .length}
                          </span>
                        )}
                    </span>
                    <Icon size={24} id="ChevronDown" />
                  </summary>
                  <ul class="flex flex-wrap gap-3.5 flex-col mb-6 pt-2.5">
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
                  </ul>
                </details>
              </li>
            ))}
          </ul>
        )
        : (
          <ul class="lg:hidden flex w-full justify-center flex-col max-h-[550px] overflow-y-visible">
            {defaultFilters.map((filter) => (
              <li
                key={filter.key}
                class="collapse collapse-arrow border-b-[1px] border-solid border-b-[#cdcdcd] rounded-none"
              >
                <input type="checkbox" />
                <div class="collapse-title after:!w-3 after:!h-3 text-base font-bold px-0">
                  {filter.label}
                  {isToggle(filter) &&
                    filter.values.filter((value) => value.selected).length >
                      0 &&
                    (
                      <span class="ml-1 bg-blue-200 inline-flex items-center justify-center w-5 h-5 text-center text-white rounded-[50%] text-xs">
                        {filter.values.filter((value) =>
                          value.selected
                        )
                          .length}
                      </span>
                    )}
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
