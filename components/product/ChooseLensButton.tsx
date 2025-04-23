import Button from "$store/components/ui/Button.tsx";
import { Options as Props, useAddToCart } from "$store/sdk/useAddToCart.ts";

interface ChooseLensProps extends Props {
  loading?: boolean;
  text: string;
  chooseLensUrl: string;
}

export const ChooseLensButton = ({
  idProduct,
  sku,
  price,
  name,
  text,
  chooseLensUrl,
}: ChooseLensProps) => {
  const cart = useAddToCart({
    idProduct,
    sku,
    price,
    name,
    chooseLensUrl,
  });

  return (
    <Button
      data-deco="add-to-cart"
      {...cart}
      class="text-white bg-slot-primary-500 rounded-[9px] btn normal-case w-full py-2 text-sm min-h-[50px] hover:text-slot-primary-500 hover:bg-white hover:border-slot-primary-500"
    >
      {cart.loading ? <span class="loading loading-spinner" /> : text}
    </Button>
  );
};

export default ChooseLensButton;
