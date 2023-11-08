import { useCart } from "$store/packs/hooks/useCart.ts";
import { formatPrice } from "$store/sdk/format.ts";

export interface GiftValueReachInfosProps {
  baseValue?: number;
  beforeText?: string;
  afterText?: string;
  successText?: string;
  activate?: boolean;
}

interface Props {
  giftValueReachInfos?: GiftValueReachInfosProps;
}

export const PromotionalBar = ({ giftValueReachInfos }: Props) => {
  const { activate, afterText, baseValue, beforeText, successText } =
    giftValueReachInfos ?? {};

  const { cart } = useCart();
  const test = useCart();

  const total =
    cart.value?.products.reduce((total, p) => total + p.ValorDesconto, 0) ?? 0;
  const discounts = cart.value?.products.reduce(
    (total, p) => total + p.ValorOriginal - p.ValorDesconto,
    0,
  ) ?? 0;

  console.log("TOTAL", total);

  if (!activate || !baseValue || baseValue <= 0) {
    return null;
  }

  const porcentWidthValue = (total * 100) / baseValue;

  const warningText = `${beforeText ?? ""} ${
    baseValue && formatPrice(baseValue - total)
  } ${afterText ?? ""}`;

  return (
    <div class="flex flex-col bg-black   justify-center items-center w-full   ">
      <p class="  pb-1 text-white  font-medium">
        {porcentWidthValue >= 100 ? successText : warningText}
      </p>
      <div class="w-full h-2 bg-secondary ">
        <div
          class="w-full bg-success h-full "
          style={{ maxWidth: `${porcentWidthValue}%` }}
        >
        </div>
      </div>
    </div>
  );
};
