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

const coupon: CouponProps = {
  button: {
    href: "#",
    label: "Get Coupon",
  },
  code: "123456",
  header: "Coupon",
  modal: {
    content: "<p>Modal content</p>",
    label: "Terms & Conditions",
  },
};

export default function CouponList({
  header = "Header",
  coupons = [coupon, coupon, coupon],
}: Props) {
  return (
    <div class="container">
      <div class="p-5 md:px-0 md:py-10">
        <h1 class="text-3xl md:text-4xl font-bold">{header}</h1>
        <ul class="divide-zinc-300 divide-y">
          {coupons.map((coupon, index) => <Coupon key={index} {...coupon} />)}
        </ul>
      </div>
      <CouponListScript />
    </div>
  );
}
