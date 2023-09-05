import { DynamicFilter } from "../types.ts";

export const stringfyParams = (params?: object): string => {
  if (!params || Object.keys(params).length == 0) {
    return "";
  }

  return (
    "&" +
    Object.keys(params)
      .map((prop: string) => {
        const elementValue = params[prop as keyof object];
        if (!elementValue) return null;
        return prop + "=" + elementValue;
      })
      .filter(Boolean)
      .join("&")
  );
};

export const stringfyDynamicFilters = (dynamicFilters?: DynamicFilter[]) => {
  if (!dynamicFilters || dynamicFilters.length == 0) {
    return "";
  }

  return `&filtrosDinamicos=${
    dynamicFilters.map(({ filterID }) => filterID).join(",")
  }&valorFiltrosDinamicos=${
    dynamicFilters.map(({ filterValue }) => filterValue).join(",")
  }`;
};
