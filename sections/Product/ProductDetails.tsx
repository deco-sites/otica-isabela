export { default, loader } from "$store/components/product/ProductDetails.tsx";
import Section from "$store/components/ui/Section.tsx";

export function LoadingFallback() {
  return <Section.PlaceholderProductDetails class="bg-gray-100" />;
}