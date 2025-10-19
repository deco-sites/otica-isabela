import type { IFourthBlock as FourthBlockProps } from "./Footer.tsx";

export const FourthBlock = (
  { address, socialName, hideFourthBlock }: FourthBlockProps,
) => {
  if (hideFourthBlock) {
    return null;
  }

  return (
    <section class="w-full bg-base-500">
      <div class="container pb-5 pt-5 text-white text-center flex flex-col lg:flex-row lg:justify-between items-center text-xs font-bold gap-y-4">
        <span>{socialName}</span>
        <span>{address}</span>
      </div>
    </section>
  );
};
