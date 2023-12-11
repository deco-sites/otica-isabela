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
    const id = input.getAttribute("data-input-item-min");
    const labelEl = root?.querySelector(`#${id}-min-label`);

    input.addEventListener("input", () => {
      updateValues(input, labelEl!);
    });
  });

  maxInputs?.forEach((input) => {
    const id = input.getAttribute("data-input-item-max");
    const labelEl = root?.querySelector(`#${id}-max-label`);

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
