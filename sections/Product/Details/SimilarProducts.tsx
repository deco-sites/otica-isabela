import Section from "../../../components/ui/Section.tsx";

export { default, loader } from "$store/islands/SimilarProducts.tsx";

export const LoadingFallback = () => <Section.PlaceholderShelf height="400px" />;
