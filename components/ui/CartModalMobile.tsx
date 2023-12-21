import AddToCartButton from "deco-sites/otica-isabela/islands/AddToCartButton.tsx";
import ChooseLensButton from "deco-sites/otica-isabela/islands/ChooseLensButton.tsx";
import { useEffect } from "preact/hooks";

export interface Props {
  chooseLensUrl: string;
  addToCard: AddToCart;
  labels?: Labels;
  currentCategory: string;
  observableTag: string;
}

interface AddToCart {
  idProduct: number;
  sku: number;
  price: number;
  name: string;
}

interface Labels {
  [key: string]: string;
}

const setup = (observableTag: string) => {
  const elements = document.getElementsByTagName(observableTag);
  const header = elements?.item(0);
  if (!elements || !header) {
    console.warn(
      "Missing necessary slider attributes. It will not work as intended. Necessary elements:",
      { elements, header },
    );
    return;
  }
  const observer = new IntersectionObserver(
    (elements) =>
      elements.forEach((item) => {
        if (item.isIntersecting) {
          /* console.log("na tela"); */
        } else {
          /* console.log("não tá na tela"); */
        }
      }),
    { threshold: 0.1 },
  );

  observer.observe(header);
};

function CartModalMobile(
  { chooseLensUrl, addToCard, labels, currentCategory, observableTag }: Props,
) {
  useEffect(
    () => setup(observableTag),
    [observableTag],
  );
  return (
    <div class="fixed bottom-0 left-0 w-full p-4 z-10 bg-white border border-gray-600 lg:hidden">
      <div class="mt-2 lg:max-w-[80%] w-full mx-auto">
        <a href={chooseLensUrl}>
          <ChooseLensButton {...addToCard} />
        </a>
      </div>
      <div class="mt-4 lg:max-w-[80%] w-full flex items-center mx-auto">
        <AddToCartButton
          {...addToCard}
          label={labels?.[currentCategory!]}
        />
      </div>
    </div>
  );
}

export default CartModalMobile;
