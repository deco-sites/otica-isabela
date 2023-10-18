import Filters from "$store/components/search/Filters.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Modal from "$store/components/ui/Modal.tsx";
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
    <div class="flex flex-col items-center ">
      <div class="flex w-full pt-7 border-b border-base-200">
        <ul class="flex w-full justify-center flex-row">
          <li class="flex flex-row pl-7 pb-7 justify-between items-center font-medium text-lg text-[#212529]  cursor-pointer">
            <p class="mr-1">Formato</p>
            <Icon class="text-black" size={24} id="ChevronDown" />
          </li>
          <li class="flex flex-row pl-7 pb-7 justify-between items-center font-medium text-lg text-[#212529] cursor-pointer">
            <p class="mr-1">Material</p>
            <Icon size={24} id="ChevronDown" />
          </li>
          <li class="flex flex-row pl-7 pb-7 justify-between items-center font-medium text-lg text-[#212529] cursor-pointer">
            <p class="mr-1">Estilo</p>
            <Icon size={24} id="ChevronDown" />
          </li>
          <li class="flex flex-row pl-7 pb-7 justify-between items-center font-medium text-lg text-[#212529] cursor-pointer">
            <p class="mr-1">Lentes</p>
            <Icon size={24} id="ChevronDown" />
          </li>
        </ul>
      </div>

      <div class="flex w-full flex-row justify-center items-center my-5">
        <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
      </div>

      {/* <div class="flex flex-row items-center justify-between border-b border-base-200 sm:gap-4 sm:border-none">
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
      </div> */}

      <Modal
        loading="lazy"
        title="Filtrar"
        mode="sidebar-right"
        open={open.value}
        onClose={() => {
          open.value = false;
        }}
      >
        <Filters filters={filters} />
      </Modal>
    </div>
  );
}

export default SearchControls;
