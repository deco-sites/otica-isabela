import { NavItemProps } from "./NavItem.tsx";
import { ModalOverlay } from "../ui/ModalOverlay.tsx";

export interface Props {
  items: NavItemProps[];
  closeMenu?: () => void;
}

function MenuItem({ item }: { item: NavItemProps }) {
  const { href = "/", label, items, mobileMenuImage } = item;
  const { src, alt } = mobileMenuImage || {};

  if (!items?.length) {
    return (
      <div class="collapse-title  ">
        <a
          class="items-center flex  text-base font-normal w-full text-start text-secondary gap-x-4 "
          href={href}
        >
          {src && <img width={55} height={29} src={src} alt={alt} />}
          <span class="pl-2">{label}</span>
        </a>
      </div>
    );
  }

  return (
    <div class=" collapse collapse-plus items-start  ">
      <input frameBorder="none" type="checkbox" />
      <div class="collapse-title  items-center after:text-3xl  after:h-full text-secondary flex ">
        <div class="w-4/12">
          {src && <img alt={alt} width={55} height={29} src={src} />}
        </div>
        <span class="text-base font-normal w-full text-start text-secondary ml-6">
          {label}
        </span>
      </div>

      {!!items?.length && (
        <ul class=" collapse-content  w-full flex flex-col gap-y-3 font-semibold text-secondary text-base leading-5 p-0 ">
          {items.map(({ label, href }) => (
            <li class="pl-9">
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Menu({ items, closeMenu }: Props) {
  return (
    <div class="absolute z-50 w-full max-w-xs bg-white rounded-xl pb-4 top-20">
      <ModalOverlay
        ariaLabel="Mobile Menu Overlay"
        backDropAction={closeMenu}
      />
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
