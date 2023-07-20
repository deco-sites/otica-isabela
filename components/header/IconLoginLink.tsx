import Icon from "$store/components/ui/Icon.tsx";

export interface IconLoginLinkProps {
  greetingText?: string;
  callToActionText?: string;
}

export const IconLoginLink = (
  { greetingText, callToActionText }: IconLoginLinkProps,
) => {
  return (
    <a href={"/identificacao"} aria-label="Log in">
      <div className="flex gap-x-2 items-center  pt-[7px]">
        <Icon id="User" width={26} height={24} strokeWidth={0.4} />

        <div className="hidden lg:flex flex-col   items-start text-white text-xs">
          <span className="hover:text-blue-200 whitespace-nowrap font-normal">
            {greetingText ?? "Olá, bem-vindo!"}
          </span>
          <span className="hover:text-blue-200 whitespace-nowrap font-semibold">
            {callToActionText ?? "Login ou cadastre-se"}
          </span>
        </div>
      </div>
    </a>
  );
};
