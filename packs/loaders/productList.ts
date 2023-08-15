import { Context } from "$store/packs/accounts/configStore.ts";
import { fetchAPI } from "deco-sites/std/utils/fetch.ts";
import { paths } from "$store/packs/utils/path.ts";
import { Products } from "$store/packs/types.ts";

const loader = async (
  _props: null,
  _req: Request,
  ctx: Context,
): Promise<Products> => {
  const { configStore: config } = ctx;
  const path = paths(config!);

  const product = await fetchAPI<Products>(
    path.product.getProduct(),
    {
      method: "POST",
    },
  );

  console.log("Products", product);

  return product;
};

export default loader;
