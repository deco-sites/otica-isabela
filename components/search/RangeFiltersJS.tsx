import { selectedFilters } from "deco-sites/otica-isabela/components/search/SelectedFilters.tsx";
import { useEffect } from "preact/hooks";

interface Props {
  rootId: string;
}

type URLParams = {
  key: string;
  value: string;
}[];

type InputType = "min" | "max";

const allowedRangeFilters = [
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

function handleSelectedCustomFilters(urlParams: URLParams) {
  const hasCustomFilterApplied = urlParams.some((param) =>
    allowedRangeFilters.includes(param.key.split("filter.")[1])
  );

  if (hasCustomFilterApplied) {
    const selectedBox = document.querySelector<HTMLElement>(
      "#personalized-filter",
    );

    selectedBox?.style.removeProperty("display");
    selectedBox?.addEventListener("click", () => {
      const url = new URL(window.location.href);

      resetCustomFilters(url);
    });
  }
}

function handleToggleCustomFilters(root: HTMLElement, urlParams: URLParams) {
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
  }

  customFiltersCheckbox?.addEventListener("click", () => {
    const currStatus = customFiltersCheckbox.getAttribute("aria-checked");

    customFiltersCheckbox.setAttribute(
      "aria-checked",
      currStatus === "true" ? "false" : "true",
    );

    customFiltersContainer!.style.display = currStatus === "false"
      ? "block"
      : "none";
  });
}

function handleInputs(
  root: HTMLElement,
  urlParams: URLParams,
  type: InputType,
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
    });
  });
}

function setup({ rootId }: Props) {
  const root = document.getElementById(rootId);
  const params = new URLSearchParams(window.location.search).entries();
  const urlParams = Array.from(params).map(([key, value]) => ({
    key,
    value,
  }));

  handleSelectedCustomFilters(urlParams);
  handleToggleCustomFilters(root!, urlParams);
  handleInputs(root!, urlParams, "min");
  handleInputs(root!, urlParams, "max");
}

function FiltersJS({ rootId }: Props) {
  useEffect(() => {
    setup({ rootId });
  }, [rootId, selectedFilters.value]);

  return <div data-range-filter-controller-js />;
}

export default FiltersJS;
