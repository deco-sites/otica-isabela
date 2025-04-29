import Ratings from "$store/components/product/product-details/Ratings.tsx";
import type { MemberLevel } from "$store/components/product/product-details/Reviews/Review.tsx";
import Image from "apps/website/components/Image.tsx";
import { Review } from "$store/packs/types.ts";

interface Props {
  review: Review;
  images?: MemberLevel[];
}

function Feedback(
  {
    review: {
      ratingQuality,
      ratingPrice,
      ratingService,
      reviewPhrase,
      reviewDescription,
      authorName,
      memberLevel,
      additionalImage,
    },
    images,
  }: Props,
) {
  const imgObj = images?.reduce((acc: { [key: string]: string }, curr) => {
    acc[curr.level] = curr.image;
    return acc;
  }, {});

  const maxRating = Math.max(ratingQuality, ratingPrice, ratingService);

  return (
    <div class="flex flex-col gap-4 bg-[#f8f8f8] rounded-lg p-[15px]">
      {/* Rating Goes Here */}
      <div class="flex items-center justify-between">
        <div class="flex flex-col md:flex-row w-full md:items-center gap-1.5 text-grayscale-700">
          <Ratings ratingValue={maxRating} />
          <div class="flex flex-col md:w-2/4 gap-1.5 md:items-center w-full md:flex-row">
            <span class="text-grayscale-700 font-semibold font-outfit text-sm">
              Atendimento: {ratingQuality}
            </span>
            <span class="hidden md:block">•</span>
            <span class="text-grayscale-700 font-semibold font-outfit text-sm">
              Qualidade e Preço: {ratingPrice}
            </span>
            <span class="hidden md:block">•</span>
            <span class="text-grayscale-700 font-semibold font-outfit text-sm">
              Indicaria para um amigo: {ratingService}
            </span>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <div id="name">
            <span class="text-sm text-[#212529] font-semibold">
              {authorName}
            </span>
          </div>
          {memberLevel !== "default" && (
            <Image
              alt={memberLevel}
              src={imgObj?.[memberLevel as keyof typeof images]!}
              width={50}
              height={50}
            />
          )}
        </div>
      </div>
      {reviewPhrase && (
        <div id="description-title">
          <span class="text-sm text-[#212529]">
            {reviewPhrase}
          </span>
        </div>
      )}
      <div id="description">
        <span class="text-sm text-[#212529]">
          {reviewDescription}
        </span>
      </div>
      <div id="additionalImage">
        {additionalImage &&
          (
            <Image
              class="rounded-[9px]"
              src={additionalImage}
              alt={reviewDescription}
              width={100}
              height={100}
            />
          )}
      </div>
    </div>
  );
}

export default Feedback;
