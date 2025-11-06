import { useEffect, useRef } from "preact/compat";
import Icon from "$store/components/ui/Icon.tsx";
import { useSuggestions } from "$store/packs/hooks/useSuggestions.ts";
import Image from "apps/website/components/Image.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";

export interface Props {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default O que você está procurando?
   */
  placeholder?: string;
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /busca
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default termo
   */
  name?: string;
  /**
   * TODO: Receive querystring from parameter in the server-side
   */
  query?: string;
  /**
   * @hide
   */
  isMobile?: boolean;
}

export default function (
  {
    placeholder = "Digite aqui o que você procura...",
    action = "/busca",
    name = "termo",
    query,
    isMobile,
  }: Props,
) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { setSearch, suggestions, loading } = useSuggestions();
  const hasProducts = Boolean(suggestions.value?.products?.length);
  const suggestionProducts = suggestions.value?.products;

  const debouncedSearch = (value: string) => {
    if (value.length >= 3) {
      setSearch(value);
    }
  };

  useEffect(() => {
    if (!searchInputRef.current) {
      return;
    }

    searchInputRef.current.focus();
  }, []);

  if (isMobile) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const inputValue = searchInputRef.current?.value || "";
          globalThis.location.href = `${action}?${name}=${inputValue}`;
        }}
      >
        <input type="checkbox" id="search" class="peer hidden" />

        <label
          for="search"
          class="group cursor-pointer flex items-center justify-center"
        >
          <Icon
            id="search"
            width={26}
            height={26}
            class="text-slot-primary-600"
          />
        </label>

        <label
          for="search"
          class="fixed top-0 left-0 w-full h-full bg-black/40 z-20 opacity-0 pointer-events-none peer-checked:pointer-events-auto peer-checked:opacity-100"
        />

        <div class="top-0 left-0 absolute z-50 rounded-b-lg bg-white shadow-[0_4px_4px_rgba(0,0,0,0.1)] -translate-y-full pointer-events-none peer-checked:translate-y-0 peer-checked:pointer-events-auto transition-transform duration-300 w-full">
          <div class="p-4 pt-6 flex gap-3 border-b border-b-grayscale-100">
            {
              /* <button type="button" class="flex">
							<Icon
								id="microphone"
								width={24}
								height={24}
								class="text-slot-primary-600"
							/>
						</button> */
            }

            <div class="flex flex-col gap-5 w-full">
              <input
                ref={searchInputRef}
                type="text"
                placeholder={placeholder}
                class="w-full outline-0 border-b border-b-grayscale-300 text-grayscale-700"
                onInput={(e) => {
                  const inputValue = e.currentTarget.value;

                  if (inputValue) {
                    sendEvent({
                      name: "search",
                      params: { search_term: inputValue },
                    });
                  }

                  debouncedSearch(inputValue);
                }}
                defaultValue={query}
                aria-required={true}
                autocomplete="off"
              />
              <div class="flex items-center gap-3">
                <span class="text-grayscale-600">
                  Sugestões para você:
                </span>
              </div>
            </div>

            <label for="search" class="cursor-pointer ml-10">
              <Icon
                id="x"
                width={24}
                height={24}
                class="text-grayscale-700"
              />
            </label>
          </div>

          <div class="flex items-center justify-end w-5 relative pr-1 mx-auto">
            {loading.value && (
              <img
                alt="Loading Gif"
                width="16"
                height="16"
                src="/gif/loadingGif.gif"
              />
            )}
          </div>

          {hasProducts && (
            <div class="px-4 py-7 flex flex-wrap justify-between gap-x-2 gap-y-4 max-h-[515px] overflow-y-auto overscroll-contain">
              {suggestionProducts?.map((suggestion) => {
                const imagesFilter = suggestion.medias?.filter((media) =>
                  !media.tryOn
                );
                return (
                  <a
                    href={`/produto/${suggestion.slug}`}
                    class="flex flex-col gap-2 items-center max-w-[120px]"
                  >
                    <Image
                      src={imagesFilter?.[0].url ?? ""}
                      alt={suggestion.name}
                      width={100}
                      height={100}
                    />

                    <span class="text-gray-700 hover:underline underline-offset-2 overflow-hidden line-clamp-2 text-ellipsis">
                      {suggestion.name}
                    </span>

                    <span class="text-xs text-blue-200 font-bold mt-1">
                      {formatPrice(
                        suggestion.price,
                      )}
                    </span>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </form>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const inputValue = searchInputRef.current?.value || "";
        globalThis.location.href = `${action}?${name}=${inputValue}`;
      }}
    >
      <input type="checkbox" id="search-desktop" class="peer hidden" />

      <label
        for="search-desktop"
        class="group cursor-pointer flex items-center justify-center"
      >
        <Icon
          id="search"
          width={26}
          height={26}
          class="text-slot-primary-600"
        />
        <Icon
          id="search-fill"
          width={25}
          height={25}
          class="text-slot-primary-600 opacity-0 group-hover:opacity-100 transition-opacity absolute"
        />
      </label>

      <div class="top-full left-1/2 -translate-x-1/2 absolute rounded-b-lg bg-white shadow-[0_4px_4px_rgba(0,0,0,0.1)] opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto transition-opacity w-screen max-w-[800px] z-50">
        <div class="p-4 pt-6 flex gap-3 border-b border-b-grayscale-100">
          {
            /* <button type="button" class="flex">
						<Icon
							id="microphone"
							width={24}
							height={24}
							class="text-slot-primary-600"
						/>
					</button> */
          }

          <div class="flex flex-col gap-5 w-full">
            <input
              ref={searchInputRef}
              type="text"
              placeholder={placeholder}
              class="w-full outline-0 border-b border-b-grayscale-300 text-grayscale-700"
              onInput={(e) => {
                const inputValue = e.currentTarget.value;

                if (inputValue) {
                  sendEvent({
                    name: "search",
                    params: { search_term: inputValue },
                  });
                }

                debouncedSearch(inputValue);
              }}
              defaultValue={query}
              aria-required={true}
              autocomplete="off"
            />
            <div class="flex items-center gap-3">
              <span class="text-grayscale-600">
                Sugestões para você:
              </span>
            </div>
          </div>

          <label for="search-desktop" class="cursor-pointer ml-10">
            <Icon
              id="x"
              width={24}
              height={24}
              class="text-grayscale-700"
            />
          </label>
        </div>

        <div class="flex items-center justify-end w-5 relative pr-1 mx-auto">
          {loading.value && (
            <img
              alt="Loading Gif"
              width="16"
              height="16"
              src="/gif/loadingGif.gif"
            />
          )}
        </div>

        {hasProducts && (
          <div class="px-4 py-7 grid grid-cols-4 gap-x-2 gap-y-4 max-h-[515px] overflow-y-auto overscroll-contain">
            {suggestionProducts?.map((suggestion) => {
              const imagesFilter = suggestion.medias?.filter((media) =>
                !media.tryOn
              );
              return (
                <a
                  href={`/produto/${suggestion.slug}`}
                  class="flex flex-col gap-2 items-center max-w-[182px]"
                >
                  <Image
                    src={imagesFilter?.[0].url ?? ""}
                    alt={suggestion.name}
                    width={182}
                    height={133}
                  />

                  <span class="text-gray-700 hover:underline underline-offset-2 overflow-hidden line-clamp-2 text-ellipsis">
                    {suggestion.name}
                  </span>

                  <span class="text-xs text-blue-200 font-bold mt-1">
                    {formatPrice(
                      suggestion.price,
                    )}
                  </span>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </form>
  );
}
