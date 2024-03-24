import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useWishlist } from "$store/packs/hooks/useWishlist.ts";
import type { LoaderReturnType } from "$live/types.ts";
import { AuthData } from "$store/packs/types.ts";
import { useSignal } from "@preact/signals";

interface Props {
  productID: string;
  variant?: "icon" | "full";
  customer?: LoaderReturnType<AuthData>;
}

function WishlistButton(
  { variant = "icon", productID, customer }: Props,
) {
  const { loading, addItem, removeItem } = useWishlist();
  const fetching = useSignal(false);
  const isAdded = useSignal(customer?.customerWishlist?.includes(String(productID)));
  const isUserLoggedIn = !!customer?.customerName;

  return (
    <Button
      class={variant === "icon"
        ? "btn-circle hover:bg-[#c1ebff] border-none gap-2 h-auto bg-transparent"
        : "btn-primary btn-outline gap-2"}
      loading={fetching.value}
      aria-label="Add to wishlist"
      onClick={async (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (!isUserLoggedIn) {
          window.location.href = "/identificacao";
          return;
        }

        if (loading.value) {
          return;
        }

        try {
          fetching.value = true;

          if (isAdded.value) {
            await removeItem({ idProduct: Number(productID) }!);
            isAdded.value = false;
          } else {
            await addItem({ idProduct: Number(productID) }!);
            isAdded.value = true;
          }
        } finally {
          fetching.value = false;
        }
      }}
    >
      {isAdded.value === true
        ? <Icon id="AddedHeart" size={35} strokeWidth={1} />
        : <Icon id="Heart" size={35} strokeWidth={1} />}
    </Button>
  );
}

export default WishlistButton;
