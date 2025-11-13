export { default, loader } from "$store/components/search/SearchResult.tsx";
import Section from "$store/components/ui/Section.tsx";

export function LoadingFallback() {
  return <Section.PlaceholderSearchResult class="bg-gray-100" />;
}
