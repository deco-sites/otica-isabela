import type { JSX } from "preact";
import type { Filter, FilterToggleValue } from "apps/commerce/types.ts";
import ValueItem from "$store/islands/ValueItem.tsx";

function IconOptions({ label }: { label: string }) {
  const options: Record<string, () => JSX.Element> = {
    "altura-da-lente": () => (
      <div class="flex relative">
        <img
          width={30}
          height={15}
          src="/image/icon-glasses-size.png"
          loading="lazy"
        />
        <img
          width={3.75}
          height={10}
          src="/image/arrow-AL.png"
          loading="lazy"
          class="absolute -right-2 bottom-0"
        />
      </div>
    ),
    "frente-total": () => (
      <div>
        <img width={30} height={7} src="/image/arrow-FT.png" loading="lazy" />
        <img
          width={30}
          height={15}
          src="/image/icon-glasses-size.png"
          loading="lazy"
        />
      </div>
    ),
    "largura-da-lente": () => (
      <div>
        <img
          width={30}
          height={15}
          src="/image/icon-glasses-size.png"
          loading="lazy"
        />
        <img
          class="float-right"
          width={14}
          height={5.25}
          src="/image/arrow-LL.png"
          loading="lazy"
        />
      </div>
    ),
    "largura-da-ponte": () => (
      <div class="flex items-center flex-col">
        <img width={10} height={5.2} src="/image/arrow-LP.png" loading="lazy" />
        <img
          width={30}
          height={15}
          src="/image/icon-glasses-size.png"
          loading="lazy"
        />
      </div>
    ),
  };

  const Component = options[label];

  return <Component />;
}

function SizeOptions(
  { values, rangeOptions, type }: {
    values: FilterToggleValue[];
    rangeOptions: Filter[];
    type: string;
  },
) {
  return (
    <>
      <div class="flex flex-col gap-3 pr-10">
        {values.map((value) => (
          <ValueItem type={type} {...value} class="h-fit flex" />
        ))}
        {rangeOptions && (
          <div class="flex items-center">
            <div
              id="custom-filters-checkbox"
              aria-checked={false}
              class="checkbox border relative h-[12px] w-[12px] mr-2.5 rounded-[3px] border-solid border-[#969696]"
            />
            <span class="flex items-center text-sm gap-2.5 max-lg:font-medium text-[#6f6f6f]">
              Personalizado
            </span>
          </div>
        )}
      </div>
      <div
        id="custom-filters"
        class="pt-2 after:lg:border-l border-[#969696] lg:pt-0"
        style={{ display: "none" }}
      >
        {rangeOptions.map((option) => {
          // @ts-ignore: FilterRangeValue
          const min = option.values.min;
          // @ts-ignore: FilterRangeValue
          const max = option.values.max;
          const id = option.label.toLowerCase().replace(/\s/g, "-");

          return (
            <div class="border-b last:border-none border-[#a6a6a6] mt-3">
              <div class="flex justify-between">
                <p class="text-xs font-normal">{option.label}</p>
                <div>
                  <IconOptions label={id} />
                </div>
              </div>
              <div
                id="range-filter-input-container"
                data-input-label={option.label}
                class="relative lg:w-[200px] h-[35px]"
              >
                <input
                  data-input-item-min={id}
                  min={min}
                  max={max}
                  id="filter-range-input"
                  type="range"
                  class="h-0 z-[1] top-[50%] absolute pointer-events-none outline-none w-full"
                  loading="lazy"
                />
                <input
                  data-input-item-max={id}
                  min={min}
                  max={max}
                  id="filter-range-input"
                  type="range"
                  class="absolute pointer-events-none outline-none w-full h-full"
                  loading="lazy"
                />
              </div>
              <div class="text-xs font-normal text-center mb-3">
                {/* @ts-ignore */}
                <span id={`${id}-min-label`}>{option.values.min}</span>-
                {/* @ts-ignore */}
                <span id={`${id}-max-label`}>{option.values.max}</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default SizeOptions;
