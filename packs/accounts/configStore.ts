import type { Account as AccountBlock } from "$live/blocks/account.ts";
import type { FnContext } from "$live/types.ts";
import type { Manifest } from "deco-sites/std/live.gen.ts";

export interface Account extends AccountBlock {
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

export type Context = FnContext<{
  configStore?: Account;
}, Manifest>;

function account(acc: Account) {
  return acc;
}

export default account;
