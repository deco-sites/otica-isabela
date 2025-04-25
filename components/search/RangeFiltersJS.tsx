import { selectedFilters } from "$store/components/search/SelectedFilters.tsx";
import { useEffect } from "preact/hooks";

interface Props {
  rootId: string;
  isMobile: boolean;
}

type URLParams = {
  key: string;
  value: string;
}[];

type InputType = "min" | "max";

export const allowedRangeFilters = [
  "Altura da Lente",
  "Largura da Lente",
  "Largura da Ponte",
  "Frente Total",
];

function updateValues(input: HTMLInputElement, label: Element) {
  const inputValue = input.value;
  label.textContent = inputValue;
  input.setAttribute("value", inputValue);
}

function resetCustomFilters(url: URL) {
  allowedRangeFilters.forEach((filter) => {
    url.searchParams.delete(`filter.${filter}`);
  });

  if (window.location.href !== url.href) {
    window.location.href = url.href;
  }
}

function handleSelectedCustomFilters(root: HTMLElement, urlParams: URLParams) {
  const hasCustomFilterApplied = urlParams.some((param) =>
    allowedRangeFilters.includes(param.key.split("filter.")[1])
  );

  const selectedBox = document.querySelector<HTMLElement>(
    "#personalized-filter",
  );

  if (hasCustomFilterApplied) {
    selectedBox?.style.removeProperty("display");
  }

  selectedBox?.addEventListener("click", () => {
    if (!hasCustomFilterApplied) {
      selectedBox.style.display = "none";
      handleToggleCustomFilters(root, urlParams, true);
      return;
    }

    const url = new URL(window.location.href);

    resetCustomFilters(url);
  });
}

function handleToggleCustomFilters(
  root: HTMLElement,
  urlParams: URLParams,
  preventListener = false,
) {
  const customFiltersContainer = root?.querySelector<HTMLElement>(
    "#custom-filters",
  );
  const customFiltersCheckbox = root?.querySelector<HTMLElement>(
    "#custom-filters-checkbox",
  );

  const hasCustomFilterApplied = urlParams.some((param) =>
    allowedRangeFilters.includes(param.key.split("filter.")[1])
  );

  if (hasCustomFilterApplied) {
    customFiltersCheckbox?.setAttribute(
      "aria-checked",
      "true",
    );
    customFiltersContainer!.style.display = "block";
  } else {
    customFiltersCheckbox?.setAttribute(
      "aria-checked",
      "false",
    );
    customFiltersContainer!.style.display = "none";
  }

  if (preventListener) return;

  customFiltersCheckbox?.addEventListener("click", () => {
    const currStatus = customFiltersCheckbox.getAttribute("aria-checked");

    customFiltersCheckbox.setAttribute(
      "aria-checked",
      currStatus === "true" ? "false" : "true",
    );

    document.querySelector<HTMLElement>(
      "#personalized-filter",
    )!.style.display = currStatus === "true" ? "none" : "flex";

    customFiltersContainer!.style.display = currStatus === "false"
      ? "block"
      : "none";
  });
}

function handleInputs(
  root: HTMLElement,
  urlParams: URLParams,
  type: InputType,
  isMobile: boolean,
) {
  const inputs = root?.querySelectorAll<HTMLInputElement>(
    `[data-input-item-${type}]`,
  );

  inputs?.forEach((input) => {
    const parent = input.parentElement;
    const id = input.getAttribute(`data-input-item-${type}`);
    const labelEl = root?.querySelector<HTMLInputElement>(
      `#${id}-${type}-label`,
    );
    const label = parent?.getAttribute("data-input-label");

    if (!input.getAttribute("value")) {
      input.setAttribute("value", input.getAttribute(type)!);
    }

    const appliedFilter = urlParams.find((param) =>
      param.key.split("filter.")[1] === label
    );

    if (appliedFilter) {
      const appliedValue =
        appliedFilter.value.split(":")[type === "max" ? 1 : 0];

      input.setAttribute("value", appliedValue);
      labelEl!.textContent = appliedValue;
    }

    input.addEventListener("input", () => {
      updateValues(input, labelEl!);

      if (isMobile) return;

      const getUrl = new URL(window.location.href);
      const rootElement = document.querySelector("#size-options-container");

      const rangeFilters =
        rootElement?.querySelectorAll("#range-filter-input-container") || [];

      for (const [key, value] of getUrl.searchParams.entries()) {
        if (
          !selectedFilters.peek().some((filter) =>
            filter.label === value && `filter.${filter.type}` === key
          )
        ) {
          getUrl.searchParams.delete(key, value);
        }
      }

      rangeFilters?.forEach((filter) => {
        const label = filter?.getAttribute("data-input-label");
        const minInput = filter?.querySelector<HTMLInputElement>(
          "[data-input-item-min]",
        );
        const maxInput = filter?.querySelector<HTMLInputElement>(
          "[data-input-item-max]",
        );
        const min = minInput?.getAttribute("min");
        const max = maxInput?.getAttribute("max");
        const minValue = minInput?.getAttribute("value");
        const maxValue = maxInput?.getAttribute("value");

        if (
          (minValue && min !== minValue) || (maxValue && max !== maxValue)
        ) {
          getUrl.searchParams.append(
            `filter.${label!}`,
            `${minValue}:${maxValue}`,
          );
        }
      });

      selectedFilters.value.forEach(({ type, label }) => {
        if (getUrl.searchParams.has(`filter.${type}`, label)) return;
        getUrl.searchParams.append(`filter.${type}`, label);
      });

      if (window.location.href !== getUrl.href) {
        window.location.href = getUrl.href;
      }
    });
  });
}

function setup({ rootId, isMobile }: Props) {
  const root = document.getElementById(rootId);
  const params = new URLSearchParams(window.location.search).entries();
  const urlParams = Array.from(params).map(([key, value]) => ({
    key,
    value,
  }));

  handleSelectedCustomFilters(root!, urlParams);
  handleToggleCustomFilters(root!, urlParams);
  handleInputs(root!, urlParams, "min", isMobile);
  handleInputs(root!, urlParams, "max", isMobile);
}

function FiltersJS({ rootId, isMobile }: Props) {
  useEffect(() => {
    setup({ rootId, isMobile });
  }, [rootId]);

  return <div data-range-filter-controller-js />;
}

export default FiltersJS;
