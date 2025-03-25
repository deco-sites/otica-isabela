import { IS_BROWSER } from "$fresh/runtime.ts";
import { signal } from "@preact/signals";
import { withManifest } from "$live/clients/withManifest.ts";
import type { Manifest } from "../../manifest.gen.ts";
import { OrderForm, WishlistItem } from "$store/packs/types.ts";

interface Context {
  cart: OrderForm;
  wishlist: WishlistItem[];
}

//@ts-ignore Um erro bizarro acontecendo quando remove o ts-ignore
const Runtime = withManifest<Manifest>();
const loading = signal<boolean>(true);
const context = {
  cart: signal<OrderForm | null>(null),
  wishlist: signal<WishlistItem[]>([]),
};

let queue = Promise.resolve();
let abort = () => {};
const enqueue = (
  cb: (signal: AbortSignal) => Promise<Partial<Context>> | Partial<Context>,
) => {
  abort();

  loading.value = true;
  const controller = new AbortController();

  queue = queue.then(async () => {
    try {
      const { cart, wishlist } = await cb(controller.signal);

      if (controller.signal.aborted) {
        throw { name: "AbortError" };
      }

      context.cart.value = { ...context.cart!.value, ...cart! };
      context.wishlist.value = { ...context.wishlist!.value, ...wishlist! };

      loading.value = false;
    } catch (error) {
      if (error.name === "AbortError") return;

      console.error(error);
      loading.value = false;
    }
  });

  abort = () => controller.abort();

  return queue;
};

const load = async (signal: AbortSignal) => {
  const { cart, wishlist } = await Runtime.invoke(
    {
      cart: {
        key: "site/loaders/product/cart.ts",
      },
      wishlist: {
        key: "site/loaders/product/wishlist.ts",
      },
    },
    { signal },
  );

  return {
    cart,
    wishlist,
  };
};

if (IS_BROWSER) {
  enqueue(load);

  document.addEventListener(
    "visibilitychange",
    () => document.visibilityState === "visible" && enqueue(load),
  );
}

export const state = {
  ...context,
  loading,
  enqueue,
};
