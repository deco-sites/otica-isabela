import Icon from "site/components/ui/Icon.tsx";

interface Props {
  ratingValue: number;
}

function Ratings({ ratingValue }: Props) {
  const totalRatings = 5;
  const ratings = Array.from({ length: 5 }, (_, index) => index);
  const percentage = (ratingValue / totalRatings) * 100;

  return (
    <div class="relative inline-block">
      <div
        class="absolute top-0 left-0 whitespace-nowrap overflow-hidden"
        style={{ width: `${percentage}%` }}
      >
        {ratings.map(() => {
          return (
            <Icon
              class="inline"
              id="Ratings"
              size={21}
              style={{ color: "#F37121" }}
            />
          );
        })}
      </div>
      <div>
        {ratings.map(() => {
          return (
            <Icon
              class="inline"
              id="UnfilledRatings"
              size={21}
              style={{ color: "#666463" }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Ratings;
