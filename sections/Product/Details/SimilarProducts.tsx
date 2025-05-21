import Section from "../../../components/ui/Section.tsx";

export { default, loader } from "$store/islands/SimilarProducts.tsx";

export const LoadingFallback = () => <Section.Placeholder height="400px" />;
