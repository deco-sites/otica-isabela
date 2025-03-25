import { selectedFilters } from "$store/components/search/SelectedFilters.tsx";
import { useEffect } from "preact/hooks";

interface Props {
  rootId: string;
  buttonId: string;
}

const allowedRangeFilters = [
  "Altura da Lente",
  "Largura da Lente",
  "Largura da Ponte",
  "Frente Total",
];

function buildParams(rootElement: HTMLElement) {
  const url = new URL(window.location.href);
  //Reset the parameters for filtering
  allowedRangeFilters.forEach((filter) => {
    url.searchParams.delete(`filter.${filter}`);
  });

  for (const [key, value] of url.searchParams.entries()) {
    if (
      !selectedFilters.peek().some((filter) =>
        filter.label === value && `filter.${filter.type}` === key
      )
    ) {
      url.searchParams.delete(key, value);
    }
  }

  const rangeFilters =
    rootElement?.querySelectorAll("#range-filter-input-container") || [];

  rangeFilters?.forEach((filter) => {
    const label = filter?.getAttribute("data-input-label");
    const minInput = filter?.querySelector<HTMLInputElement>(
      `[data-input-item-min]`,
    );
    const maxInput = filter?.querySelector<HTMLInputElement>(
      `[data-input-item-max]`,
    );

    const min = minInput?.getAttribute("min");
    const max = maxInput?.getAttribute("max");
    const minValue = minInput?.getAttribute("value");
    const maxValue = maxInput?.getAttribute("value");

    if ((minValue && min !== minValue) || (maxValue && max !== maxValue)) {
      url.searchParams.append(`filter.${label!}`, `${minValue}:${maxValue}`);
    }
  });

  selectedFilters.value.forEach(({ type, label }) => {
    if (url.searchParams.has(`filter.${type}`, label)) return;

    url.searchParams.append(`filter.${type}`, label);
  });

  if (window.location.href !== url.href) {
    return url.href;
  }
}

function setup({ rootId, buttonId }: Props) {
  const root = document.getElementById(rootId);
  const applyButton = document.getElementById(buttonId);

  applyButton?.addEventListener("click", () => {
    const url = buildParams(root!);
    if (url) {
      applyButton.querySelector("span")?.classList.add("loading");
      window.location.href = url;
    }
  });
}

function ApplyRangeFilters({ rootId, buttonId }: Props) {
  useEffect(() => {
    setup({ rootId, buttonId });
  }, [rootId, buttonId]);

  return <div data-apply-range-filters-controller-js />;
}

export default ApplyRangeFilters;
