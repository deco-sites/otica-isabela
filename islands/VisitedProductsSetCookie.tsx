import { useEffect } from "preact/compat";
import { setCookie } from "std/http/mod.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";

const VisitedProductsSetCookie = ({ productId }: { productId: string }) => {
  useEffect(() => {
    if (!IS_BROWSER) {
      return;
    }

    const currentCookies: { [key: string]: string } = document.cookie.split(";")
      .reduce(
        (cookies, cookie) => {
          const [name, value] = cookie.split("=").map((c) => c.trim());
          return { ...cookies, [name]: value };
        },
        {},
      );

    const currentProductsString: string = currentCookies["visited_products"] ||
      "";
    const currentProductsIds: string[] = currentProductsString.split(":");

    const updatedProducts = [...currentProductsIds];

    const index = currentProductsIds.indexOf(productId);
    if (index !== -1) {
      updatedProducts.splice(index, 1);
    }

    updatedProducts.unshift(productId);

    document.cookie = `visited_products=${updatedProducts.join(":")}; path=/`;
  }, []);

  return <></>;
};

export default VisitedProductsSetCookie;
