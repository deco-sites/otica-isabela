import Icon from "$store/components/ui/Icon.tsx";
import type { NavItemProps } from "./NavItem.tsx";

export interface Props {
  items: NavItemProps[];
}

function MenuItem({ item }: { item: NavItemProps }) {
  const { mobile: mobileImage } = item?.image ?? {};

  return (
    <div class="collapse collapse-plus p-0">
      <input type="checkbox" />
      <div class="collapse-title items-center after:text-3xl text-slate-600 flex gap-x-2">
        {mobileImage && <img width={55} height={29} src={mobileImage} />}
        <span>{item.label}</span>
      </div>
      <div class="collapse-content">
        <ul>
          <li>
            <a class=" text-sm text-slate-600" href={item.href}>Ver todos</a>
          </li>
          {item.children?.map((node) => (
            <li>
              <MenuItem item={node} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Menu({ items }: Props) {
  return (
    <>
      <ul class="pr-4 flex-grow flex flex-col divide-y divide-base-200">
        {items.map((item) => (
          <li>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default Menu;
