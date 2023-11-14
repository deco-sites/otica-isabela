import Button from "$store/components/ui/Button.tsx";
import { Options as Props, useAddToCart } from "$store/sdk/useAddToCart.ts";

interface ChooseLensProps extends Props {
  loading: boolean;
}

export const ChooseLensButton = ({
  idProduct,
  sku,
  price,
  name,
  loading,
}: ChooseLensProps) => {
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
      class="text-white bg-orange-500 rounded-[9px] uppercase btn w-full py-2 text-sm min-h-[50px] hover:text-orange-500 hover:bg-white hover:border-orange-500"
    >
      {loading ? <span class="loading loading-spinner" /> : (
        "Escolher as lentes"
      )}
    </Button>
  );
};

export default ChooseLensButton;
