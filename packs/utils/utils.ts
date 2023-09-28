import { DynamicFilter } from "../types.ts";

export const stringfyDynamicFilters = (dynamicFilters?: DynamicFilter[]) => {
  if (!dynamicFilters || dynamicFilters.length == 0) {
    return "";
  }

  return "&" + new URLSearchParams({
    filtrosDinamicos: dynamicFilters.map(({ filterID }) => filterID).join(","),
    valorFiltrosDinamicos: dynamicFilters.map(({ filterValue }) => filterValue)
      .join(","),
  }).toString();
};
