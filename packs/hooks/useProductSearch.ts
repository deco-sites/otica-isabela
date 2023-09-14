/* import { signal } from "@preact/signals";
import { debounce } from "std/async/debounce.ts";
import type { Suggestion } from "../types.ts";
import { withManifest } from "$live/clients/withManifest.ts";
import type { Manifest } from "../../live.gen.ts";

const Runtime = withManifest<Manifest>()
const payload = signal<Suggestion | null>(null);
const loading = signal<boolean>(false);

const suggestions = Runtime.create(
  "deco-sites/otica-isabela/loaders/product/productSearch.ts",
);

const setSearch = debounce(async (search: string, count: number) => {
  try {
    payload.value = await suggestions({ q: search, offset: count });
  } catch (error) {
    console.error("Something went wrong while fetching suggestions \n", error);
  } finally {
    loading.value = false;
  }
}, 250);

const state = {
  setSearch: (query: string, count = 4) => {
    loading.value = true;
    setSearch(query, count);
  },
  loading,
  suggestions: payload,
};

/**
 * This hook only works if the vtex intelligent search app is installed at VTEX Account.
 */
/*
export const useAutocomplete = () => state;
 */