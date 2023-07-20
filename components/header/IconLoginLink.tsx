import Icon from "$store/components/ui/Icon.tsx";

export interface IconLoginLinkProps {
  loginLink?: string;
  primaryText?: string;
  secondary?: string;
}

export const IconLoginLink = (
  { loginLink, primaryText, secondary }: IconLoginLinkProps,
) => {
  return (
    <a href={loginLink ?? "/login"} aria-label="Log in">
      <div className="flex gap-x-2 items-center pt-[7px]">
        <Icon id="User" width={26} height={24} strokeWidth={0.4} />

        <div className="hidden lg:flex flex-col font-sans items-start text-white text-xs">
          <span className="hover:text-blue-200 font-normal">
            {primaryText ?? "Olá, bem-vindo!"}
          </span>
          <span className="hover:text-blue-200 font-semibold">
            {secondary ?? "Login ou cadastre-se"}
          </span>
        </div>
      </div>
    </a>
  );
};
