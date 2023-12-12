import { useEffect } from "preact/hooks";

interface Props {
  rootId: string;
}

function updateValues(input: HTMLInputElement, label: Element) {
  const inputValue = input.value;
  label.textContent = inputValue;
  input.setAttribute("value", inputValue);
}

function setup({ rootId }: Props) {
  const root = document.getElementById(rootId);
  const params = new URLSearchParams(window.location.search).entries();
  const urlParams = Array.from(params).map(([key, value]) => ({
    key,
    value,
  }));

  const customFiltersCheckbox = root?.querySelector("#custom-filters-checkbox");
  const minInputs = root?.querySelectorAll<HTMLInputElement>(
    `[data-input-item-min]`,
  );
  const maxInputs = root?.querySelectorAll<HTMLInputElement>(
    `[data-input-item-max]`,
  );

  customFiltersCheckbox?.addEventListener("click", () => {
    const currStatus = customFiltersCheckbox.getAttribute("aria-checked");
    const customFiltersContainer = document.getElementById("custom-filters");

    customFiltersCheckbox.setAttribute(
      "aria-checked",
      currStatus === "true" ? "false" : "true",
    );

    customFiltersContainer!.style.display = currStatus === "false"
      ? "block"
      : "none";
  });

  minInputs?.forEach((input) => {
    const parent = input.parentElement;
    const id = input.getAttribute("data-input-item-min");
    const labelEl = root?.querySelector(`#${id}-min-label`);
    const label = parent?.getAttribute("data-input-label");

    const appliedFilter = urlParams.find((param) =>
      param.key.split("filter.")[1] === label
    );

    if (appliedFilter) {
      const appliedValue = appliedFilter.value.split(":")[0];

      input.setAttribute("value", appliedValue);
      labelEl!.textContent = appliedValue;
    }

    input.addEventListener("input", () => {
      updateValues(input, labelEl!);
    });
  });

  maxInputs?.forEach((input) => {
    const parent = input.parentElement;
    const id = input.getAttribute("data-input-item-max");
    const labelEl = root?.querySelector(`#${id}-max-label`);
    const label = parent?.getAttribute("data-input-label");

    const appliedFilter = urlParams.find((param) =>
      param.key.split("filter.")[1] === label
    );

    if (appliedFilter) {
      const appliedValue = appliedFilter.value.split(":")[1];

      input.setAttribute("value", appliedValue);
      labelEl!.textContent = appliedValue;
    }

    input.addEventListener("input", () => {
      updateValues(input, labelEl!);
    });
  });
}

function FiltersJS({ rootId }: Props) {
  useEffect(() => {
    setup({ rootId });
  }, [rootId]);

  return <div data-range-filter-controller-js />;
}

export default FiltersJS;
