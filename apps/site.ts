import { App, AppContext as AC } from "$live/mod.ts";
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
  state: StoreProps,
): App<Manifest, StoreProps, [
  StdApp,
]> {
  return {
    state,
    manifest,
    dependencies: [
      std(state),
    ],
  };
}

export type Storefront = ReturnType<typeof Site>;
export type AppContext = AC<Storefront>;
export { onBeforeResolveProps } from "apps/compat/$live/mod.ts";
