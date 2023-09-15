import { signal } from "@preact/signals";
import { debounce } from "std/async/debounce.ts";
import type { Suggestion } from "deco-sites/std/commerce/types.ts";
import { withManifest } from "$live/clients/withManifest.ts";
import type { Manifest } from "../../live.gen.ts";

const Runtime = withManifest<Manifest>();
const payload = signal<Suggestion | null>(null);
const loading = signal<boolean>(false);

const suggestions = Runtime.create(
  "deco-sites/otica-isabela/loaders/product/suggestions.ts",
);

const setSearch = debounce(async (search: string, count: number) => {
  try {
    payload.value = await suggestions({ nome: search, offset: count });
  } catch (error) {
    console.error("Something went wrong while fetching suggestions \n", error);
  } finally {
    loading.value = false;
  }
}, 250);

const state = {
  setSearch: (query: string, count?: number) => {
    loading.value = true;
    setSearch(query, count ?? 8);
  },
  loading,
  suggestions: payload,
};

/**
 * This hook uses the Otica Isabela API.
 */
export const useSuggestions = () => state;
