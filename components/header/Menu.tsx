import { NavItemProps } from "./NavItem.tsx";
import { useEffect } from "preact/hooks";

export interface Props {
  items: NavItemProps[];
  menuClosed: () => void;
}

function MenuItem({ item }: { item: NavItemProps }) {
  const { href = "/", label, children, mobileMenuImage } = item;
  const { src, alt } = mobileMenuImage || {};

  if (!children?.length) {
    return (
      <div class="collapse-title items-center flex gap-x-4">
        <div class="w-4/12">
          {src && <img width={55} height={29} src={src} />}
        </div>
        <a
          class="text-base font-normal w-full text-start text-secondary pl-5"
          href={href}
        >
          {label}
        </a>
      </div>
    );
  }

  return (
    <div class="collapse p-0 collapse-plus">
      <input frameBorder="none" type="checkbox" />
      <div class="collapse-title items-center after:text-3xl text-secondary flex gap-x-4">
        <div class="w-4/12">
          {src && <img alt={alt} width={55} height={29} src={src} />}
        </div>
        <span class="text-base font-normal w-full text-start text-secondary ml-6">
          {label}
        </span>
      </div>

      {!!children?.length && (
        <div class="collapse-content flex flex-col text-secondary text-xs flex-wrap items-start gap-y-3 w-full">
          <ul class="w-full flex flex-col gap-y-3 font-semibold text-secondary text-base leading-5 ml-5">
            <li>
              <a href={href}>Todos</a>
            </li>
            {children.map(({ label, href }) => (
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
    document.getElementById("overlayHeader")?.addEventListener(
      "click",
      menuClosed,
    );
  }, []);

  return (
    <div class="absolute z-50 w-full max-w-xs bg-white rounded-xl">
      <ul class="pr-4 flex-grow flex flex-col">
        {items.map((item, index) => (
          <li key={index}>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
