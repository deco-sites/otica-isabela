import type { BreadcrumbList } from "apps/commerce/types.ts";
import Icon from "deco-sites/otica-isabela/components/ui/Icon.tsx";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
}

function Breadcrumb({ itemListElement = [] }: Props) {
  return (
    <ul class="mx-3 text-left whitespace-nowrap overflow-hidden truncate ...">
      <li class="inline align-middle text-left leading-[21px]">
        <a
          class="inline-block align-middle font-roboto text-[#222] text-[13px] sm:text-[15px] capitalize hover:underline"
          href="/"
        >
          <span class="inline-block align-middle">
            Ótica Isabela Dias
          </span>
        </a>
        <span class="my-0 mx-[5px] sm:mx-[10px] text-sm text-[#212529] inline align-middle">
          ›
        </span>
      </li>
      {itemListElement
        .filter(({ name, item }) => name && item)
        .map(({ name, item }, index) => (
          <li class="inline align-middle text-left leading-[21px]">
            <a
              class="inline font-roboto text-[#222] text-[13px] sm:text-[15px] capitalize hover:underline"
              href={item}
            >
              {name?.toLocaleLowerCase().trim()}
            </a>
            {index < itemListElement.length - 1 && (
              <span class="my-0 mx-[5px] sm:mx-[10px] text-sm text-[#212529] inline align-middle">
                ›
              </span>
            )}
          </li>
        ))}
    </ul>
  );
}

export default Breadcrumb;
