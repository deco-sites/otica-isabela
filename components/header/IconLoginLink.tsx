import type { LoaderReturnType } from "$live/types.ts";
import { AuthData } from "$store/packs/types.ts";

export interface IconLoginLinkProps {
  callToActionText?: string;
  customer?: LoaderReturnType<AuthData>;
}

export const IconLoginLink = (
  { callToActionText, customer }: IconLoginLinkProps,
) => {
  // const isLogged = !!customer?.customerName;
  return (
    <a href={"/identificacao"} className="hidden lg:flex" aria-label="Log in">
      <div className="flex gap-x-2 items-center w-max">
        {!customer?.customerName
          ? (
            <div className="hidden lg:flex flex-col items-start text-white text-xs">
              <span className="text-grayscale-700 underline text-base hover:text-blue-200 whitespace-nowrap font-normal">
                {callToActionText ?? "Entrar"}
              </span>
            </div>
          )
          : (
            <div className="hidden lg:flex flex-col items-start text-white text-xs">
              <span className="hover:text-blue-200 whitespace-nowrap font-normal">
                OLÁ, {customer?.customerName.toUpperCase()}!
              </span>
            </div>
          )}
      </div>
    </a>
  );
};
