import type { Filter, FilterToggleValue } from "apps/commerce/types.ts";
import { ValueItem } from "./Filters.tsx";

function SizeOptions(
  { values, rangeOptions }: {
    values: FilterToggleValue[];
    rangeOptions: Filter[];
  },
) {
  console.log(JSON.stringify(rangeOptions));

  return (
    <div class="flex gap-6">
      <div>
        {values.map((value) => <ValueItem {...value} />)}
        {rangeOptions && (
          <div class="flex items-center mb-5">
            <div
              id="custom-filters-checkbox"
              aria-checked={false}
              class="checkbox border relative h-[30px] w-[30px] mr-2.5 rounded-[5px] border-solid border-black"
            />
            <span class="flex items-center gap-2.5 max-lg:font-medium">
              Personalizado
            </span>
          </div>
        )}
      </div>
      <div
        id="custom-filters"
        class="border-l border-black px-6"
        style={{ display: "none" }}
      >
        {rangeOptions.map((option) => {
          // @ts-ignore: FilterRangeValue
          const min = option.values.min;
          // @ts-ignore: FilterRangeValue
          const max = option.values.max;
          const id = option.label.toLowerCase().replace(/\s/g, "-");

          return (
            <div class="border-b border-[#a6a6a6] mt-3">
              <div>
                <p class="text-xs font-normal">{option.label}</p>
              </div>
              <div
                id="range-filter-input-container"
                data-input-label={option.label}
                class="relative w-[200px] h-[35px]"
              >
                <input
                  data-input-item-min={id}
                  min={min}
                  max={max}
                  value={min}
                  id="filter-range-input"
                  type="range"
                  class="h-0 z-[1] top-[50%] absolute pointer-events-none outline-none w-full"
                />
                <input
                  data-input-item-max={id}
                  min={min}
                  max={max}
                  value={max}
                  id="filter-range-input"
                  type="range"
                  class="absolute pointer-events-none outline-none w-full h-full"
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
    </div>
  );
}

export default SizeOptions;
