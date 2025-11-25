import paths from "$store/packs/utils/paths.ts";
import { StoreProps } from "$store/apps/site.ts";
import { fetchAPI } from "apps/utils/fetch.ts";
import { Product, Facets } from "$store/packs/v2/types.ts";

/**
 * Interface para a resposta da API de listagem de produtos
 */
export interface PLPResponseDTO {
  dateTime: string;
  pageSize: number;
  totalCount: number;
  data: Product[];
  facets: Facets;
  pageCount: number;
}

/**
 * Interface para as opções de busca
 */
interface SearchOptions {
  orderBy?: string;
  pageSize?: number;
}

/**
 * Busca todos os produtos usando o termo "*" (busca universal)
 * @param storeProps - Configurações da loja (token e publicUrl)
 * @param options - Opções de busca (orderBy e pageSize)
 * @returns Lista de todos os produtos encontrados
 */
export async function searchAllProducts(
  storeProps: StoreProps,
  options: SearchOptions = {}
): Promise<Product[]> {
  const { orderBy = "mais-vendidos", pageSize = 50 } = options;

  const pathsInstance = paths(storeProps);
  const allProducts: Product[] = [];
  let currentPage = 1;
  let totalPages = 1;

  console.log("🔍 Iniciando busca de produtos com termo '*'...");
  console.log(`📊 Configuração: OrderBy=${orderBy}, PageSize=${pageSize}`);

  try {
    do {
      const searchUrl = pathsInstance.v2.product.search(
        "*",
        orderBy,
        currentPage,
        pageSize
      );

      console.log(`📄 Buscando página ${currentPage}/${totalPages}...`);
      console.log(searchUrl);
      const response = await fetchAPI<PLPResponseDTO>(searchUrl, {
        method: "GET",
        headers: {
          Token: storeProps.token || "",
        },
      });

      // Atualiza o total de páginas na primeira iteração
      if (currentPage === 1) {
        totalPages = response.pageCount;
        console.log(
          `📦 Total de produtos encontrados: ${response.totalCount} (${totalPages} páginas)`
        );
      }

      // Adiciona os produtos da página atual
      if (response.data && response.data.length > 0) {
        allProducts.push(...response.data);
        console.log(
          `✅ Página ${currentPage}/${totalPages} - ${response.data.length} produtos adicionados`
        );
      } else {
        console.warn(`⚠️  Página ${currentPage} sem produtos`);
        break;
      }

      currentPage++;
    } while (currentPage <= totalPages);

    console.log(`✨ Busca concluída! Total de produtos: ${allProducts.length}`);
    return allProducts;
  } catch (error) {
    console.error(`❌ Erro ao buscar produtos na página ${currentPage}:`, error);
    throw error;
  }
}

/**
 * Extrai apenas os slugs dos produtos
 * @param products - Lista de produtos
 * @returns Array com os slugs dos produtos
 */
export function extractProductSlugs(products: Product[]): string[] {
  return products.map((product) => product.slug);
}

/**
 * Extrai URLs completas dos produtos
 * @param products - Lista de produtos
 * @param baseUrl - URL base do site
 * @returns Array com as URLs completas dos produtos
 */
export function extractProductUrls(
  products: Product[],
  baseUrl: string
): string[] {
  console.log("baseUrl", baseUrl);
  return products.map((product) => `${baseUrl}/produto/${product.slug}`);
}

/**
 * Gera sitemap com todos os produtos
 * @param storeProps - Configurações da loja
 * @param options - Opções de busca
 * @returns Objeto com informações do sitemap gerado
 */
export async function generateSitemap(
  storeProps: StoreProps,
  options: SearchOptions = {}
) {
  try {
    console.log("🗺️  Gerando sitemap de produtos...\n");

    // Busca todos os produtos
    const products = await searchAllProducts(storeProps, options);

    // Extrai os slugs dos produtos
    const slugs = extractProductSlugs(products);

    // Extrai as URLs completas
    const urls = extractProductUrls(products, "https://www.oticaisabeladias.com.br/");
    console.log("\n📋 Resumo do Sitemap:");
    console.log(`   Total de produtos: ${products.length}`);
    console.log(`   Total de URLs: ${urls.length}`);

    // Log dos primeiros 10 slugs como exemplo
    if (slugs.length > 0) {
      console.log("\n📌 Primeiros slugs encontrados:");
      slugs.slice(0, 10).forEach((slug, index) => {
        console.log(`   ${index + 1}. ${slug}`);
      });
      if (slugs.length > 10) {
        console.log(`   ... e mais ${slugs.length - 10} produtos`);
      }
    }

    return {
      products,
      totalProducts: products.length,
      generatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("❌ Erro ao gerar sitemap:", error);
    throw error;
  }
}

/**
 * Gera XML do sitemap
 * @param products - Lista de produtos
 * @param baseUrl - URL base do site
 * @returns String com o XML do sitemap
 */
export function generateSitemapXML(
  products: Product[],
  baseUrl: string
): string {
  const urls = products
    .map((product) => {
      const url = `${baseUrl}/produto/${product.slug}`;
      const lastmod = new Date().toISOString().split("T")[0];
      return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

// Execução direta via CLI
if (import.meta.main) {
  const storeProps: StoreProps = {
    token: Deno.env.get("STORE_TOKEN") || "",
    publicUrl: Deno.env.get("PUBLIC_URL") || "",
  };

  if (!storeProps.token || !storeProps.publicUrl) {
    console.error(
      "❌ Erro: Configure as variáveis de ambiente STORE_TOKEN e PUBLIC_URL"
    );
    console.log("\nExemplo de uso:");
    console.log(
      "STORE_TOKEN=seu_token PUBLIC_URL=https://sua-loja.com.br deno run --allow-net packs/sitemap/generateSitemap.ts"
    );
    Deno.exit(1);
  }

  const result = await generateSitemap(storeProps);

  // Gera o XML do sitemap
  const xml = generateSitemapXML(result.products, "https://www.oticaisabeladias.com.br");

  // Salva o XML em um arquivo
  const filename = "products.xml";
  await Deno.writeTextFile("../../static/" + filename, xml);
  console.log(`\n💾 Sitemap XML salvo em: ${filename}`);
}