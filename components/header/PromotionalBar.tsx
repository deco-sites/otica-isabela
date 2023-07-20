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
  const { activate, afterText, baseValue, beforeText } = giftValueReachInfos ??
    {};

  const CART_VALUE_MOCK = 40;

  const porcentWidthValue = baseValue ?? 0 / CART_VALUE_MOCK;

  if (!activate) {
    return null;
  }

  return (
    <div class="flex flex-col bg-black  justify-center items-center w-full">
      <p class="  pb-2 text-white  font-semibold font-sans">
        {`${beforeText ?? ""} ${
          baseValue &&
          formatPrice(baseValue - CART_VALUE_MOCK)
        } ${afterText ?? ""}`}
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
