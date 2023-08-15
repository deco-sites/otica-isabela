import Icon from "$store/components/ui/Icon.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import type { Image as ImageType } from "deco-sites/std/components/types.ts";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";

export interface Testimonial {
  user?: {
    name?: string;
    locale?: string;
    productId?: string;
  };
  review?: {
    description?: string;
    ratting?: number;
    image?: {
      src?: ImageType;
      alt?: string;
    };
  };
}

interface Review {
  ratingValue: number;
  authorName: string;
  reviewDescription: string;
  authorCity: string;
  productName: string;
  productPhoto: string;
  productLink: string;
  additionalImage: string;
  membershipBadge?: string;
}

export const UserInfos = (
  { authorName, ratingValue, membershipBadge }: {
    authorName: string;
    ratingValue: number;
    membershipBadge?: string;
  },
) => {
  return (
    <div class="flex flex-col w-full">
      <p class=" w-full text-xs font-semibold flex items-center justify-around gap-x-3  ">
        {authorName}
        {membershipBadge && (
          <Picture>
            <Source
              media="(max-width: 767px)"
              src={membershipBadge}
              width={45}
              height={50}
            />
            <Source
              media="(min-width: 768px)"
              src={membershipBadge}
              width={68}
              height={75}
            />
            <img
              class="object-cover"
              src={membershipBadge}
              alt={"Membership Badge"}
            />
          </Picture>
        )}
      </p>
      {!!ratingValue && ratingValue <= 5 && (
        <div class="flex">
          {Array.from({ length: ratingValue }).map((_, index) => (
            <Icon
              key={`ratingStar${index}`}
              width={21}
              height={21}
              id="RatingStar"
            />
          ))}
        </div>
      )}
    </div>
  );
};

const TestimonialItem = (
  {
    additionalImage,
    authorCity,
    authorName,
    productLink,
    productName,
    productPhoto,
    ratingValue,
    reviewDescription,
    membershipBadge,
  }: Review,
) => {
  return (
    <div class="flex flex-col items-center text-center border border-blue-300 rounded-xl px-3 py-5 ">
      <div class="flex items-start justify-center gap-x-2 ">
        <div class="w-1/3 flex flex-col">
          <Image
            src={additionalImage}
            alt={productName}
            width={140}
            class="rounded-xl"
            height={200}
          />

          <div class="flex flex-col items-start">
            <span class="text-xs text-blue-200 flex items-center justify-center gap-x-2 font-semibold mt-3 ">
              <Icon width={18} height={22} id="Locale" />
              {authorCity}
            </span>
            <div class="flex lg:hidden w-full">
              <UserInfos
                authorName={authorName}
                ratingValue={ratingValue}
                membershipBadge={membershipBadge}
              />
            </div>
          </div>
        </div>
        <div class="w-2/3 flex flex-col items-center">
          <div class="hidden lg:flex w-full">
            <UserInfos
              authorName={authorName}
              ratingValue={ratingValue}
              membershipBadge={membershipBadge}
            />
          </div>
          <p class="text-sm text-start font-normal text-black border-b border-b-blue-300 pb-8">
            {reviewDescription}
          </p>
          <div class="h-full w-full flex place-items-center p-8">
            <div>
              <label for="themeToggler">
                <input
                  type="checkbox"
                  name="themeToggler"
                  id="themeToggler"
                  class="peer hidden"
                  frameBorder="none"
                />
                <span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  eget ante vel nisi euismod laoreet nec a felis.
                </span>
                <span class="flex peer-checked:hidden">Mostrar mais</span>
                <span class="hidden peer-checked:flex">
                  Vestibulum dapibus ex sit amet justo auctor, vel consectetur
                  mi venenatis.
                </span>
              </label>
            </div>
          </div>

          <a
            href={productLink}
            class="flex flex-col justify-center items-center "
          >
            <span class="my-4 font-semibold text-base text-black underline ">
              {productName}
            </span>

            <Image
              src={productPhoto}
              alt={productName}
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
