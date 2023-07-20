import { formatPrice } from "$store/sdk/format.ts";

export interface GiftValueReachInfosProps {
  baseValue?: number;
  beforeText?: string;
  afterText?: string;
  sucessText?: string;
  activate?: boolean;
}

interface Props {
  giftValueReachInfos?: GiftValueReachInfosProps;
}

export const PromotionalBar = (
  { giftValueReachInfos }: Props,
) => {
  const { activate, afterText, baseValue, beforeText, sucessText } =
    giftValueReachInfos ??
      {};

  const CART_VALUE_MOCK = 40;

  if (!activate || !baseValue || baseValue <= 0) {
    return null;
  }

  const porcentWidthValue = CART_VALUE_MOCK * 100 / baseValue;

  const warningText = `${beforeText ?? ""} ${
    baseValue &&
    formatPrice(baseValue - CART_VALUE_MOCK)
  } ${afterText ?? ""}`;

  return (
    <div class="flex flex-col bg-black   justify-center items-center w-full   ">
      <p class="  pb-1 text-white  font-semibold">
        {porcentWidthValue >= 100 ? sucessText : warningText}
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
