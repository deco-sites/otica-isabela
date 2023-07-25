import type { NavItemProps } from "./NavItem.tsx";
import { useEffect } from "preact/compat";
import { IS_BROWSER } from "$fresh/runtime.ts";

export interface Props {
  items: NavItemProps[];
  menuClosed: () => void;
}

function MenuItem({ item }: { item: NavItemProps }) {
  const { href, label, children, mobileMenuImage } = item ?? {};
  const { src, alt } = mobileMenuImage ?? {};

  if (!children?.length) {
    return (
      <div class="collapse-title items-center after:text-3xl text-secondary flex gap-x-4">
        <div class=" w-1/4 ">
          {src && <img width={55} height={29} src={src} />}
        </div>
        <a href={href ?? "/"}>{label}</a>
      </div>
    );
  }

  return (
    <div
      class={"collapse p-0 collapse-plus"}
    >
      <input frameBorder="none" type="checkbox" />
      <div class="collapse-title items-center after:text-3xl text-secondary flex gap-x-4">
        <div class=" w-1/4 ">
          {src && <img alt={alt} width={55} height={29} src={src} />}
        </div>

        <span class="text-base font-normal w-full text-start text-secondary ">
          {label}
        </span>
      </div>
      {!!item.children?.length && (
        <div class="collapse-content flex flex-col text-secondary text-xs flex-wrap items-end  gap-y-3 w-full ">
          <ul class="w-4/5 flex flex-col gap-y-3 font-semibold text-secondary text-base line leading-5 ">
            <li>
              <a href={item.href}>Ver todos</a>
            </li>
            {item.children?.map(({ label, href }) => (
              <li>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function Menu({ items, menuClosed }: Props) {
  useEffect(() => {
    if (!IS_BROWSER) {
      return;
    }
    document?.getElementById("overlayHeader")?.addEventListener(
      "click",
      menuClosed,
    );
  }, []);

  return (
    <div class="absolute z-50 w-full max-w-xs bg-white rounded-xl">
      <ul class="pr-4 flex-grow flex flex-col">
        {items.map((item) => (
          <li>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
