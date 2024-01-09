import Image from "deco-sites/std/components/Image.tsx";
import type { IThirdBlock as ThirdBlockProps } from "./Footer.tsx";

export const ThirdBlock = (
  { securityInformation, hideThirdBlock, logo, payments, support }:
    ThirdBlockProps,
) => {
  const { methods, label: paymentsTitle = "" } = payments ?? {};
  const { links: suportLink, openingHours, label: supportTile = "" } =
    support ?? {};
  const { certificates, label: certificatesTitle = "" } = securityInformation ??
    {};

  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const currentDate = `${day}/${month}/${date.getFullYear()}`;

  if (hideThirdBlock) {
    return null;
  }

  return (
    <section class="container w-full flex flex-col lg:flex-row mt-8 gap-y-8  pb-8">
      <div class="w-full lg:w-1/4 flex flex-col gap-y-3 ">
        <h2 class="font-bold text-center lg:text-start text-base  text-blue-300 uppercase w-full ">
          {supportTile}
        </h2>

        {suportLink?.map(({ href, image, label }) => {
          return (
            <a class="flex items-center gap-x-3 pl-6 lg:pl-0" href={href}>
              {image && (
                <Image width={20} height={20} src={image} alt={label} />
              )}
              <span class="text-white font-normal text-xs">{label}</span>
            </a>
          );
        })}

        <div class="flex flex-col text-center lg:text-start text-white">
          <span class="text-base font-medium">
            {openingHours?.hours?.primaryLabel}
          </span>
          <span class="text-base font-medium">
            {openingHours?.hours?.secondaryLabel}
          </span>
          <span class="text-xs font-normal">
            {openingHours?.observation}
          </span>
        </div>
      </div>

      <div class="flex flex-col items-center lg:items-start w-full lg:w-1/4 gap-y-4 ">
        <h2 class="font-bold text-center lg:text-start text-base text-blue-300 uppercase w-full">
          {certificatesTitle}
        </h2>
        <div class=" w-5/6 flex  justify-center lg:justify-between items-center">
          {certificates?.map(({ label, image, height, width, href }) => {
            if (!image) return null;
            return (
              <a href={href ?? ""}>
                <Image
                  width={width ?? 0}
                  height={height ?? 0}
                  src={image}
                  alt={label}
                />
              </a>
            );
          })}
        </div>
        <span class=" w-full text-xs font-normal text-center lg:text-start  text-white">
          {currentDate}
        </span>
      </div>

      <div class="flex flex-col items-center w-full lg:w-1/4  ">
        <h2 class="font-bold text-center lg:text-start text-base text-blue-300 uppercase w-full">
          {paymentsTitle}
        </h2>

        {methods?.image && (
          <div class="w-full flex justify-center lg:justify-start items-center">
            <Image
              width={230}
              height={150}
              src={methods?.image}
              alt={methods?.alt}
            />
          </div>
        )}
      </div>

      <div class=" flex justify-center lg:justify-start items-start w-full lg:w-1/4">
        {logo?.image && (
          <Image
            width={300}
            height={74}
            src={logo?.image}
            alt={logo?.description}
          />
        )}
      </div>
    </section>
  );
};
