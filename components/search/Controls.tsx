import Filters from '$store/components/search/Filters.tsx';
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "apps/commerce/types.ts";

type Props =
  & Pick<
    ProductListingPage,
    "filters" | "breadcrumb" | "sortOptions"
  >
  & {
    displayFilter?: boolean;
  };

function SearchControls({
  filters,
  breadcrumb,
  displayFilter,
  sortOptions,
}: Props) {
  const open = useSignal(false);


  return (
      <div class="flex w-full pt-7 border-b border-base-200 max-lg:hidden sticky z-[9] bg-white top-0">
	  <Filters filters={filters} />
      </div>

  )


      {
        /* <div class="flex flex-row items-center justify-between border-b border-base-200 sm:gap-4 sm:border-none">
        <Button
          class={displayFilter ? "btn-ghost" : "btn-ghost lg:hidden"}
          onClick={() => {
            open.value = true;
          }}
        >
          Filtrar
          <Icon id="FilterList" width={16} height={16} />
          {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
        </Button>
      </div> */
      }

      {
        /* <Modal
        loading="lazy"
        title="Filtrar"
        mode="sidebar-right"
        open={open.value}
        onClose={() => {
          open.value = false;
        }}
      >
        <Filters filters={filters} />
      </Modal> */
      }
}

export default SearchControls;
