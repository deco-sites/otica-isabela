import { CategoryMenuItem } from "$store/components/search/SearchResult.tsx";
import SelectedFilters from "$store/islands/SelectedFilters.tsx";
import type { ProductListingPage } from "apps/commerce/types.ts";

export interface Props {
  categories: CategoryMenuItem[];
  filters: ProductListingPage["filters"];
}

function CategoryMenu({ categories, filters }: Props) {
  if (!categories) {
    return null;
  }

  function capitalizeWords(text: string) {
    return text
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  return (
    <div class="max-lg:hidden flex justify-between max-w-[1320px] w-[95%] mx-auto mt-4">
      <span class="font-semibold flex items-center max-lg:hidden">
        Filtros:
      </span>
      <SelectedFilters filters={filters} />
      <div class="flex max-lg:flex-wrap gap-3.5 lg:items-center">
        {categories?.map(({ label, link }) => (
          <div class="border-[1px] border-black hover:border-slot-primary-500 text-grayscale-700 hover:text-slot-primary-500 py-[5px] max-lg:py-1 px-4 max-lg:px-3 rounded-[17px] text-center">
            <a
              class="font-bold hover:underline text-sm max-lg:text-xs"
              href={link}
            >
              {capitalizeWords(label)}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryMenu;
