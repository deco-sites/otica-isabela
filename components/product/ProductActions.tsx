import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import {
  Options as UseAddToCartProps,
  useAddToCart,
} from "$store/sdk/useAddToCart.ts";

interface Props extends UseAddToCartProps {
  /**
   * @description Product id
   */
  sellerId: string;
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
          />
        </span>
        <span class="flex lg:hidden">
          <Icon
            id="Camera"
            class="group-hover:invert"
            width={25}
            height={23}
          />
        </span>
        Experimentar
      </button>
    </div>
  );
};

export const AddToCartButton = (
  { skuId, sellerId, discount, price, productGroupId, name }: Props,
) => {
  const props = useAddToCart({
    skuId,
    sellerId,
    discount,
    price,
    productGroupId,
    name,
  });

  return (
    <Button data-deco="add-to-cart" {...props} class="btn-primary">
      Adicionar à Sacola
    </Button>
  );
};

export default AddToCartButton;
