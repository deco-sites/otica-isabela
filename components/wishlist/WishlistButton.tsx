import { useComputed, useSignal } from "@preact/signals";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import { useWishlist } from "$store/packs/hooks/useWishlist.ts";

interface Props {
  productID: string;
  variant?: "icon" | "full";
}

function WishlistButton({ variant = "icon", productID }: Props) {
  const { loading, addItem, removeItem } = useWishlist();
  const fetching = useSignal(false);

  /*  const isUserLoggedIn = Boolean(user.value?.email); */
  const inWishlist = false;

  return (
    <Button
      class={variant === "icon"
        ? "btn-circle btn-ghost gap-2 h-auto"
        : "btn-primary btn-outline gap-2"}
      loading={fetching.value}
      aria-label="Add to wishlist"
      onClick={async (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (loading.value) {
          return;
        }

        try {
          fetching.value = true;
          inWishlist
            ? await removeItem({ idProduct: Number(productID) }!)
            : await addItem({ idProduct: Number(productID) }!);
        } finally {
          fetching.value = false;
        }
      }}
    >
      <Icon
        id="WishListHeart"
        size={24}
        strokeWidth={2}
        style={{ color: 'black' }}
        /* fill={inWishlist ? "black" : "none"} */
      />
      {/* {variant === "icon" ? null : inWishlist ? "Remover" : "Favoritar"} */}
    </Button>
  );
}

export default WishlistButton;
