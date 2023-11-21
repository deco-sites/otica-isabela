import type { BreadcrumbList } from "apps/commerce/types.ts";
import Icon from "deco-sites/otica-isabela/components/ui/Icon.tsx";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
}

function Breadcrumb({ itemListElement = [] }: Props) {
  return (
    <ul class="inline-flex items-baseline">
      {itemListElement
        .filter(({ name, item }) => name && item)
        .map(({ name, item }, index) => (
          <li>
            <a
              class="font-roboto text-[#222] text-[12px] sm:text-[15px] capitalize hover:underline"
              href={item}
            >
              {index === 0
                ? (
                  <>
                    <div class="sm:hidden items-center inline-flex justify-center">
                      <Icon
                        class="text-black"
                        id="Home"
                        size={15}
                      />
                    </div>
                    <div class="hidden sm:inline-flex">
                      {name?.toLocaleLowerCase().trim()}
                    </div>
                  </>
                )
                : name?.toLocaleLowerCase().trim()}
            </a>
            {index < itemListElement.length - 1 && (
              <span class="my-0 mx-[10px] text-sm text-[#212529]">›</span>
            )}
          </li>
        ))}
    </ul>
  );
}

export default Breadcrumb;
