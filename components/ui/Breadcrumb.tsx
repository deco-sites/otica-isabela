import type { BreadcrumbList } from "apps/commerce/types.ts";
import Icon from "deco-sites/otica-isabela/components/ui/Icon.tsx";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
}

function Breadcrumb({ itemListElement = [] }: Props) {
  return (
    <ul class="mx-2 text-left">
      {itemListElement
        .filter(({ name, item }) => name && item)
        .map(({ name, item }, index) => (
          <li class="inline align-middle text-left leading-[21px]">
            <a
              class={`${
                index === 0 ? "inline-block align-middle" : ""
              } font-roboto text-[#222] text-[13px] sm:text-[15px] capitalize hover:underline`}
              href={item}
            >
              {index === 0
                ? (
                  <>
                    <Icon
                      class="text-black sm:hidden"
                      id="Home"
                      size={16}
                    />
                    <span class="hidden sm:inline align-middle">
                      {name?.toLocaleLowerCase().trim()}
                    </span>
                  </>
                )
                : name?.toLocaleLowerCase().trim()}
            </a>
            {index < itemListElement.length - 1 && (
              <span class="my-0 mx-[10px] text-sm text-[#212529] inline align-middle">
                ›
              </span>
            )}
          </li>
        ))}
    </ul>
  );
}

export default Breadcrumb;
