import Icon from "$store/components/ui/Icon.tsx";
import type { NavItemProps } from "./NavItem.tsx";

export interface Props {
  items: NavItemProps[];
}

function MenuItem({ item }: { item: NavItemProps }) {
  const { href, label, children, image } = item ?? {};
  const { mobile: mobileImage } = image ?? {};

  if (!children?.length) {
    return <a href={href ?? "/"}>{label}</a>;
  }

  return (
    <div
      class={`collapse p-0 ${children?.length ? "collapse-plus" : ""}`}
    >
      <input frameBorder="none" type="checkbox" />
      <div class="collapse-title items-center after:text-3xl text-slate-600 flex">
        {mobileImage && (
          <img class="max-w-" width={55} height={29} src={mobileImage} />
        )}
        <span class="text-base font-light w-full text-center text-secondary ">
          {label}
        </span>
      </div>
      {!!item.children?.length && (
        <div class="collapse-content flex flex-col text-secondary text-xs flex-wrap items-end  gap-y-3 w-full ">
          <ul class="w-4/5 flex flex-col gap-y-3">
            <li>
              <a href={item.href} class="font-medium ">Ver todos</a>
            </li>
            {item.children?.map(({ label, href }) => (
              <li>
                <a class="font-semibold " href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
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
