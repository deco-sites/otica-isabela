import { NavItemProps } from "./NavItem.tsx";
import { useEffect } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";

export interface Props {
  items: NavItemProps[];
  menuClosed: () => void;
}

function MenuItem({ item }: { item: NavItemProps }) {
  const { href = "/", label, children, mobileMenuImage } = item;
  const { src, alt } = mobileMenuImage || {};

  if (!children?.length) {
    return (
      <div class="collapse-title  ">
        <a
          class="items-center flex  text-base font-normal w-full text-start text-secondary gap-x-4 "
          href={href}
        >
          {src && <img width={55} height={29} src={src} />}
          <span class="pl-2">{label}</span>
        </a>
      </div>
    );
  }

  return (
    <div class=" collapse collapse-plus transition-none  ">
      <input frameBorder="none" type="checkbox" />
      <div class="collapse-title  items-center after:text-3xl  after:h-full text-secondary flex ">
        <div class="w-4/12">
          {src && <img alt={alt} width={55} height={29} src={src} />}
        </div>
        <span class="text-base font-normal w-full text-start text-secondary ml-6">
          {label}
        </span>
      </div>

      {!!children?.length && (
        <ul class=" collapse-content  w-full flex flex-col gap-y-3 font-semibold text-secondary text-base leading-5 ml-5 p-0">
          {children.map(({ label, href }) => (
            <li>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Menu({ items, menuClosed }: Props) {
  useEffect(() => {
    if (!IS_BROWSER) {
      return;
    }
    document.getElementById("overlayHeader")?.addEventListener(
      "click",
      menuClosed,
    );
  }, []);

  return (
    <div class="absolute z-50 w-full max-w-xs bg-white rounded-xl pb-4">
      <ul class="pr-4 flex-grow flex flex-col">
        {items.map((item, index) => (
          <li key={index} class="-mb-4">
            <MenuItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
