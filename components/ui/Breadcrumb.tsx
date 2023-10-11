import type { BreadcrumbList } from "apps/commerce/types.ts";
import Icon from "deco-sites/otica-isabela/components/ui/Icon.tsx";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
}

function Breadcrumb({ itemListElement = [] }: Props) {
  const items = [{ name: "Home", item: "/" }, ...itemListElement];

  return (
    <div>
      <ul class="flex text-sm">
        {items
          .filter(({ name, item }) => name && item)
          .map(({ name, item }, index) => (
            <li>
              <a class="font-roboto capitalize hover:underline" href={item}>
                {name?.toLocaleLowerCase()}
              </a>
              {index < items.length - 1 && <span class="my-0 mx-3">›</span>}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Breadcrumb;
