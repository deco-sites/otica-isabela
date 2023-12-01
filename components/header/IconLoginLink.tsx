import Icon from "$store/components/ui/Icon.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import { AuthData } from "$store/packs/types.ts";
import Image from "deco-sites/std/components/Image.tsx";

export interface IconLoginLinkProps {
  greetingText?: string;
  callToActionText?: string;
  customer?: LoaderReturnType<AuthData>;
}

export const IconLoginLink = (
  { greetingText, callToActionText, customer }: IconLoginLinkProps,
) => {
  const isLogged = !!customer?.customerName;
  return (
    <a href={"/identificacao"} aria-label="Log in">
      <div className="flex gap-x-2 items-center w-max">
        {isLogged && !!customer?.customerImage
          ? (
            <Image
              src={customer!.customerImage}
              alt="Icon"
              width={26}
              height={24}
              style={{ color: "#F8F8F8" }}
              loading="lazy"
              class="rounded-full"
            />
          )
          : (
            <Icon
              id="User"
              width={26}
              height={24}
              strokeWidth={0.4}
              style={{ color: "#F8F8F8" }}
            />
          )}

        {!customer?.customerName
          ? (
            <div className="hidden lg:flex flex-col items-start text-white text-xs">
              <span className="hover:text-blue-200 whitespace-nowrap font-normal">
                {greetingText ?? "Olá, bem-vindo!"}
              </span>
              <span className="hover:text-blue-200 whitespace-nowrap font-semibold">
                {callToActionText ?? "Login ou cadastre-se"}
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
