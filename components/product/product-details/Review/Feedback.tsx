import Ratings from "deco-sites/otica-isabela/components/product/product-details/Ratings.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import { Review } from "deco-sites/otica-isabela/packs/types.ts";

interface Props {
  review: Review;
  images?: {
    vip: string;
    gold: string;
  };
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
  return (
    <div class="border-b flex flex-col gap-5">
      {/* Rating Goes Here */}
      <div class="flex items-center gap-1">
        <Ratings ratingValue={ratingValue} />
        {memberLevel !== "default" && (
          <Image
            src={images?.[memberLevel as keyof typeof images]!}
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
