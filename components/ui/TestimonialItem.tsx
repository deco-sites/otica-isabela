import Icon from "$store/components/ui/Icon.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import type { Image as ImageType } from "deco-sites/std/components/types.ts";

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
            <p class="text-xs font-semibold ">{authorName}</p>
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
        </div>
        <a href={productLink} class="w-2/3 flex flex-col items-center">
          <p class="text-sm text-start font-normal text-black border-b border-b-blue-300 pb-8">
            {reviewDescription}
          </p>
          <div class="flex flex-col justify-center items-center ">
            <span class="my-4 font-semibold text-base text-black underline ">
              {productName}
            </span>

            <Image
              src={productPhoto}
              alt={productName}
              width={150}
              height={60}
            />
          </div>
        </a>
      </div>
    </div>
  );
};

export default TestimonialItem;
