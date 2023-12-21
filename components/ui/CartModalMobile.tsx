import AddToCartButton from "deco-sites/otica-isabela/islands/AddToCartButton.tsx";
import ChooseLensButton from "deco-sites/otica-isabela/islands/ChooseLensButton.tsx";

export interface Props {
  chooseLensUrl: string;
  addToCard: AddToCart;
  labels?: Labels;
  currentCategory: string;
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

function CartModalMobile(
  { chooseLensUrl, addToCard, labels, currentCategory }: Props,
) {
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
