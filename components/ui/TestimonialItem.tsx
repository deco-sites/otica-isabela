import Icon from "$store/components/ui/Icon.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import { useId } from "deco-sites/otica-isabela/sdk/useId.ts";

import { Review } from "deco-sites/otica-isabela/packs/types.ts";

export interface MembershipBadgeProps {
  label: string;
  bagde: { desktop: LiveImage; mobile?: LiveImage };
  badgeDescription: string;
}

export const UserInfos = ({
  authorName,
  ratingValue,
  membershipBadge,
}: {
  authorName: string;
  ratingValue: number;
  membershipBadge?: MembershipBadgeProps;
}) => {
  const { badgeDescription, bagde } = membershipBadge ?? {};
  const { desktop, mobile } = bagde ?? {};

  return (
    <div class="flex flex-col w-full">
      <p class="w-full text-xs lg:text-base font-semibold flex items-center justify-around h-12 lg:h-20 gap-x-3 py-4 capitalize">
        {authorName}
        {desktop && (
          <Picture>
            <Source
              media="(max-width: 983px)"
              src={mobile ?? desktop}
              width={45}
              height={50}
            />
            <Source
              media="(min-width: 984px)"
              src={desktop}
              width={68}
              height={75}
            />
            <img src={mobile ?? desktop} alt={badgeDescription} />
          </Picture>
        )}
      </p>
      {!!ratingValue && ratingValue <= 5 && (
        <div class="flex mb-0 lg:mb-3  gap-x-0  lg:gap-x-3">
          {Array.from({ length: ratingValue }).map((_, index) => (
            <Icon
              key={`ratingStar-${index}`}
              width={21}
              height={21}
              id="RatingStar"
              style={{ color: "#F37121" }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const TestimonialItem = ({
  membershipBadges,
  review,
}: {
  review: Review;
  membershipBadges?: MembershipBadgeProps[];
}) => {
  const {
    additionalImage,
    authorCity,
    authorName,
    productLink,
    productName,
    productPhoto,
    ratingValue,
    reviewDescription,
    memberLevel,
  } = review;

  const id = useId();
  const memberBadge = membershipBadges?.find(
    (item) => item.label === memberLevel,
  );

  const descriptionSplit = reviewDescription.split(" ");
  const hasLineClamp = descriptionSplit.length > 24;
  const firstPart = descriptionSplit.slice(0, 24).join(" ");
  const secondPart = descriptionSplit.slice(24).join(" ");

  return (
    <div class="flex border border-blue-300 rounded-xl px-3 py-5 ">
      <div class="flex justify-around gap-x-2">
        <div class="flex flex-col h-full">
          {additionalImage && (
            <Image
              class="rounded-xl h-[205px] xxxs:min-w-[152px] sm:min-w-[197px] lg:min-w-[152px] object-cover"
              src={additionalImage}
              alt={productName}
              width={114}
              height={205}
            />
          )}

          <div class="flex flex-col items-start">
            <span class="text-xs text-blue-200 flex items-center justify-center gap-x-2 font-semibold mt-3 ">
              <Icon
                width={15}
                height={18}
                id="Locale"
                style={{ color: "#D92027" }}
              />
              {authorCity}
            </span>
            <div class="flex lg:hidden w-full">
              <UserInfos
                membershipBadge={memberBadge}
                authorName={authorName}
                ratingValue={ratingValue}
              />
            </div>
          </div>
        </div>
        <div class="flex flex-col items-center">
          <div class="hidden lg:flex w-full">
            <UserInfos
              authorName={authorName}
              ratingValue={ratingValue}
              membershipBadge={memberBadge}
            />
          </div>
          <label
            for={id}
            class="text-sm text-start w-full font-normal min-h-[95px] text-black border-b border-b-blue-300 pb-8 mb-2.5"
          >
            <input
              type="checkbox"
              name={id}
              id={id}
              class="peer hidden"
              frameBorder="none"
            />
            {firstPart}

            {hasLineClamp && (
              <>
                <span class="font-bold ml-1 inline-block peer-checked:hidden">
                  Mostrar mais...
                </span>
                <span class="hidden ml-1 peer-checked:inline">
                  {secondPart}
                </span>
              </>
            )}
          </label>
          <a
            href={productLink}
            class="flex flex-col justify-center items-center "
          >
            <span class="mb-4 mt-1 font-semibold text-[15px] text-black underline text-center">
              {productName}
            </span>

            <Image
              src={productPhoto}
              alt={`Imagem-${productName}`}
              width={150}
              height={60}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TestimonialItem;
