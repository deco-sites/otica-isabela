import { signal, computed } from "@preact/signals";

export interface Filter {
  key: string;
  operator: string;
  value: string;
}

// 1. O ESTADO FICA FORA DO HOOK, TORNANDO-SE GLOBAL (SINGLETON)
// Ele é inicializado uma única vez quando o módulo é carregado.
const activeFilters = signal<Filter[]>(
  typeof window !== "undefined" ? parseFiltersFromUrl() : []
);

function parseFiltersFromUrl(): Filter[] {
  const params = new URLSearchParams(window.location.search);
  const filters: Filter[] = [];

  params.forEach((value, key) => {
    if (key.startsWith("filter.")) {
      filters.push({
        key: key.replace("filter.", ""),
        operator: "in",
        value,
      });
    }
  });

  return filters;
}

export function useFilters() {
  const addFilter = (key: string, operator: string, value: string) => {
    const prev = activeFilters.value;
    const existingIndex = prev.findIndex(
      (f) => f.key === key && f.operator === operator
    );
    if (existingIndex >= 0 && operator !== "in") {
      const updated = [...prev];
      updated[existingIndex] = { key, operator, value };
      activeFilters.value = updated;
    } else {
      activeFilters.value = [...prev, { key, operator, value }];
    }
  };

  const removeFilter = (
    key: string,
    operator?: string,
    value?: string,
    redirect?: boolean
  ) => {
    activeFilters.value = activeFilters.value.filter((f) => {
      if (operator && value) {
        return !(f.key === key && f.operator === operator && f.value === value);
      }
      if (value) {
        return !(f.key === key && f.value === value);
      }
      if (operator) {
        return !(f.key === key && f.operator === operator);
      }
      return f.key !== key;
    });

    if (redirect) {
      const params = new URLSearchParams(window.location.search);
      params.delete(`filter.${key}`, value);
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.location.href = newUrl;
    }
  };

  const clearAllFilters = () => {
    activeFilters.value = [];
  };

  const isFilterActive = (
    key: string,
    value?: string,
    operator?: string
  ): boolean => {
    return activeFilters.value.some((f) => {
      if (value && operator) {
        return f.key === key && f.value === value && f.operator === operator;
      }
      if (value) {
        return f.key === key && f.value === value;
      }
      return f.key === key;
    });
  };

  const countFilter = (key: string): number => {
    return activeFilters.value.filter((f) => f.key === key).length;
  };

  const getApiFilters = () => {
    const params = new URLSearchParams();
    activeFilters.value.forEach((filter) => {
      params.append(`filter.${filter.key}`, filter.value);
    });
    return params;
  };

  return {
    activeFilters: activeFilters.value,
    filterCount: computed(() => activeFilters.value.length),
    addFilter,
    removeFilter,
    clearAllFilters,
    isFilterActive,
    getApiFilters,
    countFilter,
  };
}
