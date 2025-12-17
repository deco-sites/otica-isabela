import Seo, {
  renderTemplateString,
  SEOSection,
} from "$store/components/SEO/SEO.tsx";
import { canonicalFromBreadcrumblist } from "apps/commerce/utils/canonical.ts";
import { AppContext } from "apps/commerce/mod.ts";
import type { ProductListingPage } from "apps/commerce/types.ts";

export interface ConfigJsonLD {
  /**
   * @title Remove videos
   * @description Remove product videos from structured data
   */
  removeVideos?: boolean;
  /**
   * @title Ignore Structured Data
   * @description By default, Structured Data is sent to everyone. Use this to prevent Structured Data from being sent to your customers, it will still be sent to crawlers and bots. Be aware that some integrations may not work if Structured Data is not sent.
   */
  ignoreStructuredData?: boolean;
}

export interface Props {
  /** @title Data Source */
  jsonLD: ProductListingPage | null;
  /** @title Title Override */
  title?: string;
  /** @title Description Override */
  description?: string;
  /** @hide true */
  canonical?: string;
  /**
   * @title Disable indexing
   * @description In testing, you can use this to prevent search engines from indexing your site
   */
  noIndexing?: boolean;
  configJsonLD?: ConfigJsonLD;
}

export function loader(_props: Props, _req: Request, ctx: AppContext) {
  const props = _props as Partial<Props>;
  const url = new URL(_req.url);
  const isSearch= url.search !== "";

  const {
    titleTemplate = "",
    descriptionTemplate = "",
    ...seoSiteProps
  } = ctx.seo ?? {};
  const {
    title: titleProp,
    description: descriptionProp,
    jsonLD,
    configJsonLD,
  } = props;

  const title = titleProp || jsonLD?.seo?.title || ctx.seo?.title || "";

  const description = descriptionProp || jsonLD?.seo?.description || ctx.seo?.description || "";

  const canonical = props.canonical
    ? props.canonical
    : jsonLD?.seo?.canonical
    ? jsonLD.seo.canonical
    : jsonLD?.breadcrumb
    ? canonicalFromBreadcrumblist(jsonLD?.breadcrumb)
    : undefined;

  const noIndexing = props.noIndexing ||
    !jsonLD ||
    !jsonLD.products.length ||
    jsonLD.seo?.noIndexing;

  if (props.configJsonLD?.removeVideos) {
    jsonLD?.products.forEach((product) => {
      product.video = undefined;
      product.isVariantOf?.hasVariant.forEach((variant) => {
        variant.video = undefined;
      });
    });
  }

  const jsonLDs = (configJsonLD?.ignoreStructuredData && !ctx.isBot) || !jsonLD
    ? []
    : [jsonLD];

  return {
    ...seoSiteProps,
    title,
    description,
    canonical,
    jsonLDs,
    noIndexing,
    isSearch,
  };
}

function Section(props: Props): SEOSection {
  return <Seo {...props} />;
}

export function LoadingFallback(props: Partial<Props>) {
  return <Seo {...props} />;
}

export default Section;
