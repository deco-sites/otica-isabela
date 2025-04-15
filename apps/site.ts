import { type App, type AppContext as AC } from "@deco/deco";
import std, { Props } from "apps/compat/std/mod.ts";
import manifest, { Manifest } from "../manifest.gen.ts";

type StdApp = ReturnType<typeof std>;

export interface StoreProps extends Props {
  /**
   * @description Oticas Isabela token, used for API authentication.
   */
  token: string;
  /**
   * @title Public store URL
   * @description Domain that is registered on License Manager (e.g: www.mystore.com.br)
   */
  publicUrl?: string;
}

export default function Site(
  state: StoreProps
  //@ts-ignore Um erro bizarro acontecendo quando remove o ts-ignore
): App<Manifest, StoreProps, [StdApp]> {
  return {
    state,
    manifest,
    dependencies: [std(state)],
  };
}

export type Storefront = ReturnType<typeof Site>;
//@ts-ignore Um erro bizarro acontecendo quando remove o ts-ignore
export type AppContext = AC<Storefront>;
export { onBeforeResolveProps } from "apps/compat/$live/mod.ts";
