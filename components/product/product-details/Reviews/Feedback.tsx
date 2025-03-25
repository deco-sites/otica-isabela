import Ratings from "site/components/product/product-details/Ratings.tsx";
import type { MemberLevel } from "site/components/product/product-details/Reviews/Review.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import { Review } from "site/packs/types.ts";

interface Props {
  review: Review;
  images?: MemberLevel[];
}

function Feedback(
  {
    review: {
      ratingValue,
      reviewDescription,
      authorName,
      memberLevel,
    },
    images,
  }: Props,
) {
  const imgObj = images?.reduce((acc: { [key: string]: string }, curr) => {
    acc[curr.level] = curr.image;
    return acc;
  }, {});

  return (
    <div class="border-b flex flex-col gap-5">
      {/* Rating Goes Here */}
      <div class="flex items-center gap-1">
        <Ratings ratingValue={ratingValue} />
        {memberLevel !== "default" && (
          <Image
            alt={memberLevel}
            src={imgObj?.[memberLevel as keyof typeof images]!}
            width={50}
            height={50}
          />
        )}
      </div>
      <div id="description">
        <span class="text-sm text-[#212529]">
          {reviewDescription}
        </span>
      </div>
      <div id="name">
        <span class="text-sm text-[#212529]">{authorName}</span>
      </div>
    </div>
  );
}

export default Feedback;
