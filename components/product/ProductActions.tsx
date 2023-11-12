import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { Options as Props, useAddToCart } from "$store/sdk/useAddToCart.ts";

interface AddTOCartProps extends Props {
  label?: string;
}

export const ToExperimentButton = () => {
  return (
    <div class="w-full flex items-center justify-center">
      <button class="flex items-center justify-center h-14 gap-x-3 group btn btn-outline w-60 lg:w-full border-black font-bold text-xl lg:text-2xl text-black hover:text-white hover:bg-black py-2">
        <span class="hidden lg:flex">
          <Icon
            id="Camera"
            class="group-hover:invert"
            width={40}
            height={37}
            style={{ color: "black" }}
          />
        </span>
        <span class="flex lg:hidden">
          <Icon
            id="Camera"
            class="group-hover:invert"
            width={25}
            height={23}
            style={{ color: "black" }}
          />
        </span>
        Experimentar
      </button>
    </div>
  );
};

export const AddToCartButton = (
  { idProduct, sku, price, name, label = "Adicionar à Sacola" }: AddTOCartProps,
) => {
  const props = useAddToCart({
    idProduct,
    sku,
    price,
    name,
  });

  return (
    <Button
      data-deco="add-to-cart"
      {...props}
      class="bg-white text-orange-500 border-orange-500 border rounded-[9px] uppercase btn w-full py-2 text-[15px] min-h-[56px] hover:bg-orange-500 hover:text-white hover:border-orange-500"
    >
      {label}
    </Button>
  );
};

export default AddToCartButton;
