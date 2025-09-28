import { useCallback, useState } from "preact/hooks";

export interface Filter {
  key: string;
  operator: string;
  value: string;
}

function parseFiltersFromUrl(): Filter[] {
  const params = new URLSearchParams(window.location.search);
  const filters: Filter[] = [];

  params.forEach((value, key) => {
    // exemplo: filter.categoryName=Eletrônicos
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
  const [activeFilters, setActiveFilters] = useState<Filter[]>(() =>
    parseFiltersFromUrl()
  );

  const addFilter = useCallback(
    (key: string, operator: string, value: string) => {
      setActiveFilters((prev) => {
        const existingIndex = prev.findIndex(
          (f) => f.key === key && f.operator === operator
        );
        if (existingIndex >= 0 && operator !== "in") {
          const updated = [...prev];
          updated[existingIndex] = { key, operator, value };
          return updated;
        }
        return [...prev, { key, operator, value }];
      });
    },
    []
  );

  const removeFilter = useCallback(
    (key: string, operator?: string, value?: string, redirect?: boolean) => {
      setActiveFilters((prev) =>
        prev.filter((f) => {
          if (operator && value) {
            return !(
              f.key === key &&
              f.operator === operator &&
              f.value === value
            );
          }
          if (value) {
            return !(f.key === key && f.value === value);
          }
          if (operator) {
            return !(f.key === key && f.operator === operator);
          }
          return f.key !== key;
        })
      );
      if (redirect) {
        const params = new URLSearchParams(window.location.search);
        params.delete(`filter.${key}`, value);
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.location.href = newUrl;
      }
    },
    []
  );

  const clearAllFilters = useCallback(() => {
    setActiveFilters([]);
  }, []);

  const isFilterActive = useCallback(
    (key: string, value?: string, operator?: string): boolean => {
      return activeFilters.some((f) => {
        if (value && operator) {
          return f.key === key && f.value === value && f.operator === operator;
        }
        if (value) {
          return f.key === key && f.value === value;
        }
        if (operator) {
          return f.key === key && f.operator === operator;
        }
        return f.key === key;
      });
    },
    [activeFilters]
  );

  const getApiFilters = useCallback(() => {
    const params = new URLSearchParams();

    activeFilters.forEach((filter, index) => {
      params.append(`filter.${filter.key}`, filter.value);
      // params.append(`Filters[${index}].Key`, filter.key);
      // params.append(`Filters[${index}].Operator`, filter.operator);
      // params.append(`Filters[${index}].Values`, filter.value);
    });

    return params;
  }, [activeFilters]);

  const countFilter = (key: string): number => {
    return activeFilters.filter((f) => f.key === key).length;
  };

  const formatFilterLabel = (
    key: string,
    operator: string,
    value: string
  ): string => {
    switch (key) {
      case "isAvailable":
        return value === "True"
          ? "Apenas disponíveis"
          : "Incluir indisponíveis";

      case "productPrice":
        if (operator === "range") {
          const [min, max] = value.split(",");
          return `R$ ${min} - R$ ${max}`;
        }
        return `R$ ${value}`;

      case "categoryName":
        return value;

      case "subCategoryName":
        return value;

      default:
        return `${key}: ${value}`;
    }
  };

  const getFormattedFilters = useCallback((): Array<{
    key: string;
    value: string;
    label: string;
  }> => {
    return activeFilters.map((filter) => ({
      key: filter.key,
      value: filter.value,
      label: formatFilterLabel(filter.key, filter.operator, filter.value),
    }));
  }, [activeFilters]);

  return {
    activeFilters,
    filterCount: activeFilters.length,
    addFilter,
    removeFilter,
    clearAllFilters,
    isFilterActive,
    getApiFilters,
    getFormattedFilters,
    countFilter,
  };
}
