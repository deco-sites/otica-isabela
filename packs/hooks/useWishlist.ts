import { WishlistItem } from "$store/packs/types.ts";
import { state as storeState } from "$store/packs/hooks/context.ts";
import { withManifest } from "$live/clients/withManifest.ts";
import type { Manifest } from "$store/manifest.gen.ts";

const { wishlist, loading } = storeState;
//@ts-ignore Um erro bizarro acontecendo quando remove o ts-ignore
const Runtime = withManifest<Manifest>();
const wrap = <T>(
  action: (
    props?: T,
    init?: RequestInit | undefined,
  ) => Promise<WishlistItem[]>,
) =>
(props?: T) =>
  storeState.enqueue(async (signal) => ({
    wishlist: await action(props, { signal }),
    loading: false,
  }));

const addItem = wrap(
  Runtime.create(
    "deco-sites/otica-isabela/loaders/actions/wishlist/addItem.ts",
  ),
);
const removeItem = wrap(
  Runtime.create(
    "deco-sites/otica-isabela/loaders/actions/wishlist/removeItem.ts",
  ),
);

const state = {
  wishlist,
  loading,
  addItem,
  removeItem,
};

export const useWishlist = () => state;
