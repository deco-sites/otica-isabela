import Coupon, {
  Props as CouponProps,
} from "deco-sites/otica-isabela/components/ui/CouponList/Coupon.tsx";
import CouponListScript from "deco-sites/otica-isabela/components/ui/CouponList/CouponListScript.tsx";

interface Props {
  /**
   * @default Header
   */
  header: string;
  coupons: CouponProps[];
}

export default function CouponList({ header, coupons }: Props) {
  return (
    <div class="container">
      <div class="p-5 md:px-0 md:py-10">
        <h1 class="text-3xl md:text-4xl font-bold">{header}</h1>
        <ul class="divide-zinc-300 divide-y">
          {coupons.map((coupon, index) => (
            <Coupon key={index} {...coupon} />
          ))}
        </ul>
      </div>
      <CouponListScript />
    </div>
  );
}
