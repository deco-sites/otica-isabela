/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */

import { useEffect, useRef } from "preact/compat";
import Icon from "$store/components/ui/Icon.tsx";
import { useAutocomplete } from "deco-sites/std/packs/vtex/hooks/useAutocomplete.ts";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import Spinner from "$store/components/ui/Spinner.tsx";

// Editable props
export interface EditableProps {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /s
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;
  /**
   * TODO: Receive querystring from parameter in the server-side
   */
  query?: string;
}

export type Props = EditableProps;

function Searchbar({
  placeholder = "What are you looking for?",
  action = "/s",
  name = "q",
  query,
}: EditableProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { setSearch, suggestions, loading } = useAutocomplete();
  const hasProducts = Boolean(suggestions.value?.products?.length);
  const suggestionProducts = suggestions.value?.products;

  useEffect(() => {
    if (!searchInputRef.current) {
      return;
    }

    searchInputRef.current.focus();
  }, []);

  return (
    <>
      <div class="flex bg-white w-full h-10  rounded-lg">
        <div class="flex items-center w-full ">
          <form
            id="searchbar"
            action={action}
            class="group flex flex-row justify-center items-center border border-none w-full"
          >
            <input
              ref={searchInputRef}
              id="search-input"
              class="flex outline-none placeholder-shown:sibling:hidden font-extralight text-sm text-start p-2 w-4/5"
              name={name}
              defaultValue={query}
              onInput={(e) => {
                const inputValue = e.currentTarget.value;

                if (inputValue) {
                  sendEvent({
                    name: "search",
                    params: { search_term: inputValue },
                  });
                }
                if (inputValue.length >= 3) {
                  setSearch(inputValue);
                }
              }}
              placeholder={placeholder}
              role="combobox"
              aria-controls="search-suggestion"
              autocomplete="off"
            />

            <Icon
              class="text-black"
              id="Magnifier"
              size={25}
              strokeWidth={0.01}
            />
          </form>
          {loading.value && <Spinner />}
        </div>
      </div>
      {hasProducts && (
        <div class="relative w-full">
          <div class="absolute flex flex-col top-2 left-0 bg-white border border-blue-200 rounded-lg  w-full p-4 z-50">
            <h1 class="text-base text-secondary mb-5">Sugestões de óculos</h1>
            <div class=" flex flex-wrap  w-full gap-y-4 ">
              {suggestionProducts?.map(({ image, name, url, offers }) => {
                image?.[0].url;
                return (
                  <a
                    src={url}
                    class="w-1/2 flex flex-col justify-center items-center text-center "
                  >
                    <img src={image?.[0].url ?? ""} width={100} />
                    <span class="text-secondary font-bold text-xs line-clamp-3">
                      {name}
                    </span>
                    <span class="text-xs text-blue-200 font-medium mt-3">
                      {formatPrice(offers?.highPrice)}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Searchbar;
