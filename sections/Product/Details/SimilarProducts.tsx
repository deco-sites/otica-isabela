import Section from "../../../components/ui/Section.tsx";

export { default, loader } from "$store/islands/SimilarProducts.tsx";

export const LoadingFallback = () => <Section.PlaceholderShelf class="bg-gray-scale-100" height="400px" />;
