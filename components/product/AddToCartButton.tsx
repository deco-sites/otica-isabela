import Button from "$store/components/ui/Button.tsx";
import { Options as Props, useAddToCart } from "$store/sdk/useAddToCart.ts";

interface AddToCartProps extends Props {
  label?: string;
}

export const AddToCartButton = ({
  idProduct,
  sku,
  price,
  name,
  label = "Adicionar ao carrinho",
}: AddToCartProps) => {
  const props = useAddToCart({
    idProduct,
    sku,
    price,
    name,
    navigateToCart: true,
  });

  return (
    <Button
      data-deco="add-to-cart"
      {...props}
      class="bg-white text-slot-primary-500 border-slot-primary-500 border rounded-[9px] btn w-full py-2 text-[15px] min-h-[56px] hover:bg-slot-primary-500 hover:text-white hover:border-slot-primary-500 normal-case"
    >
      {label}
    </Button>
  );
};

export default AddToCartButton;
