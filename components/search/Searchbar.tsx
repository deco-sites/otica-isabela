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
import Button from "$store/components/ui/Button.tsx";
import { useAutocomplete } from "deco-sites/std/packs/vtex/hooks/useAutocomplete.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { lazy, Suspense } from "preact/compat";

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
  const { setSearch } = useAutocomplete();

  const sugestions = [{
    "URL":
      "/produto/Armacao-Oculos-Grau-Redondo-Masculino-Lunks-Grafite-Cinza-1400-Izaker",
    "Name": "Armação óculos de grau masculino - Lunks 1400",
    "ImagePath":
      "https://www.oticaisabeladias.com.br/backoffice//Images/Blob/webp_id//edbb2392688a4e6ea1eb8b99f3ba488a-2.webp",
    "Value": "99,99",
    "DateTimeCreator": "\\/Date(1690298963860)\\/",
  }, {
    "URL":
      "/produto/Armacao-Oculos-Grau-Redondo-Masculino-Lunks-Marrom-1400-Izaker",
    "Name": "Armação óculos de grau masculino - Lunks 1400",
    "ImagePath":
      "https://www.oticaisabeladias.com.br/backoffice//Images/Blob/webp_id//edbb2392688a4e6ea1eb8b99f3ba488a-2.webp",
    "Value": "99,99",
    "DateTimeCreator": "\\/Date(1690298934073)\\/",
  }, {
    "URL": "/produto/armacao-oculos-masculino-moderno-Octopus-1057",
    "Name": "Armação óculos de grau masculino - Octopus 1057",
    "ImagePath":
      "https://www.oticaisabeladias.com.br/backoffice//Images/Blob/webp_id//edbb2392688a4e6ea1eb8b99f3ba488a-2.webp",
    "Value": "79,99",
    "DateTimeCreator": "\\/Date(1690389843617)\\/",
  }, {
    "URL": "/produto/armacao-oculos-grau-preto-cinza-isabeladias-willid1025m",
    "Name": "Armação óculos de grau masculino - Will 1025",
    "ImagePath":
      "https://www.oticaisabeladias.com.br/backoffice//Images/Blob/webp_id//edbb2392688a4e6ea1eb8b99f3ba488a-2.webp",
    "Value": "79,99",
    "DateTimeCreator": "\\/Date(1690298192260)\\/",
  }];

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
              class="flex outline-none placeholder-shown:sibling:hidden font-extralight text-sm text-start p-2 w-10/12"
              name={name}
              defaultValue={query}
              onInput={(e) => {
                const value = e.currentTarget.value;

                if (value) {
                  sendEvent({
                    name: "search",
                    params: { search_term: value },
                  });
                }

                setSearch(value);
              }}
              onFocus={() => console.log("ola mundo")}
              onBlur={() => console.log("ola mundo")}
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
        </div>
      </div>
      {!!sugestions?.length && (
        <div class="relative w-full">
          <div class="absolute flex flex-col top-2 left-0 bg-white border border-blue-200 rounded-lg  w-full p-4 z-50">
            <h1 class="text-base text-secondary mb-5">Sugestões de óculos</h1>
            <div class=" flex flex-wrap  w-full gap-y-4 ">
              {sugestions.map(({ ImagePath, Value, Name, URL }) => {
                return (
                  <a
                    src={URL}
                    class="w-1/2 flex flex-col justify-center items-center text-center "
                  >
                    <image src={ImagePath} width={100} />
                    <span class="text-secondary font-bold text-xs line-clamp-3">
                      {Name}
                    </span>
                    <span class="text-xs text-blue-200 font-medium mt-3">{Value}</span>
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
