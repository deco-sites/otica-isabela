import Ratings from "deco-sites/otica-isabela/components/product/product-details/Ratings.tsx";
import { Review } from "deco-sites/otica-isabela/packs/types.ts";

interface Props {
  review: Review;
}

function Feedback(
  { review: { ratingValue, reviewDescription, authorName, memberLevel } }:
    Props,
) {
  return (
    <div class="border-b flex flex-col gap-5">
      {/* Rating Goes Here */}
      <Ratings ratingValue={ratingValue} />
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
