import { signal } from "@preact/signals";
import { debounce } from "std/async/debounce.ts";
import { withManifest } from "$live/clients/withManifest.ts";
import type { Manifest } from "../../manifest.gen.ts";
import { SuggestionLoaderResponse } from "site/packs/v2/loaders/suggestions.ts";

//@ts-ignore Um erro bizarro acontecendo quando remove o ts-ignore
const Runtime = withManifest<Manifest>();
const payload = signal<SuggestionLoaderResponse | null>(null);
const loading = signal<boolean>(false);

const suggestions = Runtime.create("site/loaders/product/suggestions.ts");

const setSearch = debounce(async (search: string, count: number) => {
  try {
    payload.value = await suggestions({ Term: search, PageSize: count });
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
