import Icon from "$store/components/ui/Icon.tsx";
import type { AvailableIcons } from "$store/components/ui/Icon.tsx";

interface Item {
  label: string;
  icon: AvailableIcons;
  description?: string;
}

interface Props {
  items: Item[];
}

function ProductDetailsScale({ items }: Props) {
  const applyBorder = items.length - 2;

  return (
    <div
      id="scale-container"
      class="w-[95%] m-auto my-4 bg-gray-100 rounded-[20px] p-9 max-w-[1140px] mx-auto lg:flex items-center justify-center wrap sm:grid sm:grid-cols-2"
    >
      {items.map(({ icon, label, description }, index) => (
        <div
          id={`item-${index}`}
          class={`flex items-center gap-3 py-[15px] md:px-[30px] border-b border-blue-300 last:border-0 ${
            index >= applyBorder ? "md:border-b-0" : ""
          } lg:border-r lg:border-b-0 lg:py-0 relative group`}
        >
          <Icon id={icon} size={31} style={{ color: "#42C3FF" }} />
          <span class="text-lg font-roboto">{label}</span>
          <div
            id={`item-${index}-description`}
            class="hidden bg-white rounded-[10px] p-[30px] shadow-inner bottom-[100%] left-0 absolute group-hover:block max-w-[260px]"
          >
            <p class="text-xs m-0">{description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductDetailsScale;
