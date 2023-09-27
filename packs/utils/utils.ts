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

export const normalizeFilter = (value: string) => {
  const exceptions = ["da", "de", "do"]; // Palavras que não devem ter a primeira letra em maiúsculo

  const capitalizeWord = (word: string) => {
    return exceptions.includes(word.toLowerCase())
      ? word.charAt(0).toLowerCase() + word.slice(1) // Mantém a palavra em minúsculas se for uma exceção
      : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  return value
    .toLowerCase()
    .trim()
    .replace(/[_.-]/g, " ")
    .split(" ")
    .map((
      word,
      index,
    ) => (index === 0 ? capitalizeWord(word) : capitalizeWord(word)))
    .join(" ");
};
