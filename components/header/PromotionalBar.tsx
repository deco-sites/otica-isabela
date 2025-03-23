import { useCart } from "$store/packs/hooks/useCart.ts";
import { formatPrice } from "$store/sdk/format.ts";
import type { AppContext } from "../../apps/site.ts";
import { clx } from "../../sdk/clx.ts";

export interface GiftValueReachInfosProps {
  /**
   * @title  Valor para aplicar a promoção
   */
  baseValue?: number;
  /**
   * @title  Texto antes do valor
   */
  beforeText?: string;
  /**
   * @title  Texto após o valor
   */
  afterText?: string;
  /**
   * @title  Texto de sucesso
   */
  successText?: string;
  /**
   * @title  Ativar?
   */
  activate?: boolean;
}

interface Props {
  giftValueReachInfos?: GiftValueReachInfosProps;
}

export const PromotionalBar = (
  { giftValueReachInfos }: Props,
) => {
  const { activate, afterText, baseValue, beforeText, successText } =
    giftValueReachInfos ?? {};

  const { cart } = useCart();

  const total =
    cart.value?.products.reduce((total, p) => total + p.ValorDesconto, 0) ?? 0;

  if (!activate || !baseValue || baseValue <= 0) {
    return null;
  }

  const percentage = Math.min(100, (total * 100) / baseValue);

  const warningText = `${beforeText ?? "Faltam"} ${
    formatPrice(baseValue - total)
  } ${afterText ?? "para ganhar seu brinde!"}`;

  return (
    <div className="bg-white">
      <div className="max-w-[1320px] w-[85%] lg:w-[95%] mx-auto relative my-3">
        {percentage < 95 && (
          <img
            src="/image/gift.png"
            alt="Brinde"
            width={36}
            height={36}
            className="absolute top-[35%] -translate-y-1/2 right-0"
          />
        )}
        <div className="w-full h-6 rounded-xl shadow-[inset_0_0_9px_rgba(0,0,0,0.15)]" />
        <div
          className="w-full h-6 rounded-xl bg-slot-primary-500 absolute left-0 top-0 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
        <div
          className="size-10 rounded-full bg-slot-primary-500 absolute top-1/2 -translate-y-1/2 -translate-x-1/2 text-white text-sm font-bold flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.25)] z-10 transition-all duration-500"
          style={{ left: `${percentage}%` }}
        >
          {percentage.toFixed(0)}%
        </div>

        <span
          className={clx(
            percentage === 100
              ? "text-grayscale-0 -translate-x-1/2"
              : percentage >= 60
              ? "text-grayscale-0 -translate-x-[calc(100%+32px)]"
              : "text-slot-primary-500 translate-x-8",
            "font-medium text-xs md:text-base absolute top-1/2 -translate-y-1/2 whitespace-nowrap",
          )}
          style={{ left: `${percentage === 100 ? 50 : percentage}%` }}
        >
          {percentage === 100
            ? (successText || "Parabéns você ganhou um brinde!")
            : warningText}
        </span>
      </div>
    </div>
  );
};
