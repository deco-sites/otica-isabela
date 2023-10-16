import Icon from "deco-sites/otica-isabela/components/ui/Icon.tsx";
import ShowMore from "deco-sites/otica-isabela/islands/ShowMore.tsx";
import Feedback from "deco-sites/otica-isabela/components/product/product-details/Review/Feedback.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Image from "deco-sites/std/components/Image.tsx";

const reviews = [
  {
    rating: 5,
    image:
      "https://www.oticaisabeladias.com.br/Images/Blob/Avaliacoes/webp/cb18fdd408fe43b09d67f3ba1b2df8dc.webp",
    description: "Óculos de muita qualidade, recomendo muito!",
    highlited: "",
    name: "Felipe",
    vip: true,
  },
  {
    rating: 5,
    image:
      "https://www.oticaisabeladias.com.br/Images/Blob/Avaliacoes/webp/1491c2f4c8504e99ad07e1017ef078be.webp",
    description: "Maravilhosooooo",
    highlited: "",
    name: "Karolina",
    vip: false,
  },
  {
    rating: 5,
    image:
      "https://www.oticaisabeladias.com.br/Images/Blob/Avaliacoes/webp/815bcd855b1c435ab695d764cc427f3d.webp",
    description:
      "Encontrei a ótica Isabela Dias no Instagram em meio a propagandas, fiquei receosa, mas o valor chamou a atenção perto de alguns orçamentos que eu já tinha feito... Arrisquei e simplesmente AMEI minha compra, veio perfeito, chegou 1 dia antes do previsto. Em breve voltarei a comprar... Super recomendo!",
    highlited: "",
    name: "Angelica",
    vip: false,
  },
  {
    rating: 5,
    image:
      "https://www.oticaisabeladias.com.br/Images/Blob/Avaliacoes/webp/32ae6ebb342e48aabbc407f935a836e7.webp",
    description:
      "Óculos muito bonito, armação de qualdiade e acabamento Perfeito. Comprado através do experimentador digital e ficou conforme imagem.",
    highlited: "",
    name: "Erika",
    vip: false,
  },
  {
    rating: 5,
    description:
      "Já é a segunda vez que compro meu óculos na ótica Isabela dias e estou simplesmente pela qualidade, perfeição define???? comprem sem medo",
    highlited: "",
    name: "Daniela",
    vip: false,
  },
];

function Review() {
  const id = "review-image-slider";

  return (
    <div class="mt-12">
      {/* Overview */}
      <div id="title-and-rating" class="bg-[#f8f8f8] py-[70px]">
        <h1 class="text-xl font-bold text-center px-[15px]">
          Nos sentimentos felizes por fazer a diferença na saúde visual de
          milhares de pessoas
        </h1>
        <div class="flex justify-center">
          <h1 class="text-[64px] font-bold text-orange-500">5,0</h1>
          <Icon id="Star" size={39} />
        </div>
        <h1 class="text-lg text-center">Pontuação geral</h1>

        {/* Images */}
        <div class="w-full flex flex-col gap-0 md:gap-12 lg:gap-16 mt-8">
          <div id={id} class="container flex flex-col px-0 sm:px-5">
            <Slider class="carousel carousel-center sm:carousel-end gap-0 md:gap-6 col-span-full row-start-2 row-end-5">
              {reviews?.map((review, index) => (
                review.image &&
                (
                  <div class="flex flex-col">
                    <Slider.Item
                      index={index}
                      class="carousel-item w-full lg:first:pl-0 first:pl-4 last:pr-4 lg:last:pr-0"
                    >
                      <Image
                        class="rounded-[9px]"
                        src={review.image!}
                        alt={review.description}
                        width={157}
                        height={205}
                      />
                    </Slider.Item>
                  </div>
                )
              ))}
            </Slider>

            <SliderJS
              itemsPerPage={{
                desktop: { 0: 4 },
                mobile: { 0: 1.5 },
              }}
              rootId={id}
              perPageDots
            />
          </div>
        </div>
      </div>

      {/* Feedbacks */}
      <div id="reviews" class="flex flex-col gap-8 my-12 px-[15px]">
        {/* First Review */}
        <Feedback review={reviews[0]} />

        {/* Second Review */}
        {reviews.length >= 2 && <Feedback review={reviews[1]} />}

        {/* Show more */}
        {reviews.length >= 3 && (
          <ShowMore reviews={reviews.slice(2, reviews.length)} />
        )}
      </div>
    </div>
  );
}

export default Review;
