/**
 * This file takes care of global app side effects,
 * like clicking on add to cart and the cart modal being displayed
 */

import { signal } from "@preact/signals";

const displayCart = signal(false);
const displayMobileMenu = signal(false);
const displaySearchbar = signal(false);
const displayVideoModal = signal<null | string>(null);

const state = {
  displayCart,
  displayMobileMenu,
  displaySearchbar,
  displayVideoModal,
};

export const useUI = () => state;
