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

  return (
    <div class="flex justify-between max-w-[1320px] w-[95%] mx-auto mt-8">
      <span class="font-semibold flex items-center">Filtros:</span>
      <SelectedFilters filters={filters} />
      <div class="flex flex-col gap-3.5 lg:flex-row lg:items-center">
        {categories?.map(({ label, link }) => (
          <div class="border-[1px] border-black hover:border-slot-primary-500 text-grayscale-700 hover:text-slot-primary-500 py-[5px] px-4 rounded-[17px] text-center">
            <a
              class="font-bold hover:underline text-sm"
              href={link}
            >
              {label}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryMenu;
