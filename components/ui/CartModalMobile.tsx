import AddToCartButton from "deco-sites/otica-isabela/islands/AddToCartButton.tsx";
import ChooseLensButton from "deco-sites/otica-isabela/islands/ChooseLensButton.tsx";
import { useEffect } from "preact/hooks";

export interface Props {
  chooseLensUrl: string;
  addToCard: AddToCart;
  labels?: Labels;
  currentCategory: string;
  observableElement: ObservableElement;
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

interface ObservableElement {
  type: "Tag" | "Id";
  value: string;
}

const setup = ({ value, type }: ObservableElement) => {
  const observableElement = type === "Tag"
    ? document.getElementsByTagName(value)?.item(0)
    : document.getElementById(value);

  if (!observableElement) {
    console.warn(
      "Missing necessary slider attributes. It will not work as intended. Necessary elements:",
      { observableElement },
    );
    return;
  }
  const cartElement = document.getElementById("cart-modal-mobile");
  const observer = new IntersectionObserver(
    (elements) =>
      elements.forEach((item) => {
        if (item.isIntersecting) {
          cartElement!.classList.add("hidden");
        } else {
          cartElement!.classList.remove("hidden");
        }
      }),
    { threshold: 0.1 },
  );

  observer.observe(observableElement);
};

function CartModalMobile(
  { chooseLensUrl, addToCard, labels, currentCategory, observableElement }:
    Props,
) {
  useEffect(
    () => setup(observableElement),
    [observableElement],
  );
  return (
    <div
      class="fixed bottom-0 left-0 w-full p-4 z-10 bg-white border border-gray-600 lg:hidden animate-fadeIn 0.2s ease-in-out"
      id="cart-modal-mobile"
    >
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
