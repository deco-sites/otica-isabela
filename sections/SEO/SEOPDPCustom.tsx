import {
  renderTemplateString,
  SEOSection,
} from "apps/website/components/Seo.tsx";
import { canonicalFromBreadcrumblist } from "apps/commerce/utils/canonical.ts";
import { AppContext } from "site/apps/site.ts";
import type { LoaderReturnType } from "$live/types.ts";
import type { IsabelaProductDetailsPage } from "site/packs/v2/types.ts";
import Seo from "apps/website/components/Seo.tsx";

export interface Props {
  /** @title Configurações do Loader */
  page: LoaderReturnType<IsabelaProductDetailsPage | null>;
  omitVariants?: boolean;
  /** @title Title Override */
  title?: string;
  /** @title Description Override */
  description?: string;
  /**
   * @title Disable indexing
   * @description In testing, you can use this to prevent search engines from indexing your site
   */
  noIndexing?: boolean;
  /**
   * @title Ignore Structured Data
   * @description By default, Structured Data is sent to everyone. Use this to prevent Structured Data from being sent to your customers, it will still be sent to crawlers and bots. Be aware that some integrations may not work if Structured Data is not sent.
   */
  ignoreStructuredData?: boolean;
  /** @hidden */
  url?: URL;
}

/** @title Product details custom*/
export function loader(_props: Props, _req: Request, ctx: AppContext) {

  const url = new URL(_req.url);

  const props = _props as Partial<Props>;
  const {
    titleTemplate = "",
    descriptionTemplate = "",
    ...seoSiteProps
  } = ctx.seo ?? {};
  const {
    title: titleProp,
    description: descriptionProp,
    page,
    omitVariants,
    ignoreStructuredData,
  } = props;

  console.log(props);

  const { product } = page!;

  const title = renderTemplateString(
    titleTemplate,
    titleProp || product.name|| ctx.seo?.title || "",
  );
  const description = renderTemplateString(
    descriptionTemplate,
    descriptionProp || ctx.seo?.description || "",
  );
  const image = product.medias?.[0]?.url;
  const canonical = product.slug;
  const noIndexing = props.noIndexing || !product;

  const jsonLDs = (ignoreStructuredData && !ctx.isBot) || !product
    ? []
    : [product];

  return {
    ...seoSiteProps,
    title,
    description,
    image,
    canonical,
    noIndexing,
    jsonLDs,
    url: url,
  };
}

function Section(props: Props): SEOSection {
  return <Seo {...props} />;
}

export function LoadingFallback(props: Partial<Props>) {
  return <Seo {...props} />;
}

export { default as Preview } from "apps/website/components/_seo/Preview.tsx";

export default Section;