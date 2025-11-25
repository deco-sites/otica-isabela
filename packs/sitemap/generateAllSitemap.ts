/**
 * Script para gerar sitemap completo com produtos e categorias
 * Gera 3 arquivos:
 * - sitemap.xml (sitemap index principal)
 * - products.xml (sitemap de produtos)
 * - categories.xml (sitemap de categorias)
 */

import { generateSitemap, generateSitemapXML } from "./generateSitemap.ts";
import {
  extractRelativeUrlsFromFile,
  getUniqueUrls,
  generateSitemapForRelativeUrls,
} from "./extractRelativeUrls.ts";
import { StoreProps } from "$store/apps/site.ts";

/**
 * Interface para configuração do gerador de sitemap
 */
interface SitemapConfig {
  baseUrl: string;
  outputDir: string;
  storeProps: StoreProps;
  headerJsonPath: string;
}

/**
 * Gera o sitemap index XML que aponta para os sitemaps de produtos e categorias
 */
function generateSitemapIndex(baseUrl: string): string {
  const lastmod = new Date().toISOString().split("T")[0];

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/products.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/categories.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
</sitemapindex>`;
}

/**
 * Gera todos os sitemaps (produtos, categorias e index)
 */
export async function generateAllSitemaps(config: SitemapConfig) {
  const { baseUrl, outputDir, storeProps, headerJsonPath } = config;

  console.log("🗺️  Gerando sitemaps completos...\n");
  console.log("=".repeat(60));

  try {
    // 1. Gera sitemap de produtos
    console.log("\n📦 1. Gerando sitemap de produtos...");
    console.log("-".repeat(60));

    const productsResult = await generateSitemap(storeProps, {
      pageSize: 50,
      orderBy: "mais-vendidos",
    });

    const productsXml = generateSitemapXML(productsResult.products, baseUrl);
    const productsPath = `${outputDir}/products.xml`;
    await Deno.writeTextFile(productsPath, productsXml);

    console.log(`✅ Sitemap de produtos gerado!`);
    console.log(`   - Total de produtos: ${productsResult.totalProducts}`);
    console.log(`   - Arquivo: ${productsPath}`);

    // 2. Gera sitemap de categorias
    console.log("\n📁 2. Gerando sitemap de categorias...");
    console.log("-".repeat(60));

    const categoriesUrls = await extractRelativeUrlsFromFile(headerJsonPath);
    const uniqueCategoryUrls = getUniqueUrls(categoriesUrls);
    const categoriesXml = generateSitemapForRelativeUrls(
      uniqueCategoryUrls,
      baseUrl
    );

    const categoriesPath = `${outputDir}/categories.xml`;
    await Deno.writeTextFile(categoriesPath, categoriesXml);

    console.log(`✅ Sitemap de categorias gerado!`);
    console.log(`   - Total de categorias: ${uniqueCategoryUrls.length}`);
    console.log(`   - Arquivo: ${categoriesPath}`);

    // 3. Gera sitemap index
    console.log("\n🗂️  3. Gerando sitemap index...");
    console.log("-".repeat(60));

    const sitemapIndexXml = generateSitemapIndex(baseUrl);
    const indexPath = `${outputDir}/sitemap.xml`;
    await Deno.writeTextFile(indexPath, sitemapIndexXml);

    console.log(`✅ Sitemap index gerado!`);
    console.log(`   - Arquivo: ${indexPath}`);

    // 4. Resumo final
    console.log("\n");
    console.log("=".repeat(60));
    console.log("✨ RESUMO FINAL\n");
    console.log(`📦 Produtos: ${productsResult.totalProducts} URLs`);
    console.log(`📁 Categorias: ${uniqueCategoryUrls.length} URLs`);
    console.log(
      `🌐 Total: ${productsResult.totalProducts + uniqueCategoryUrls.length} URLs`
    );
    console.log("\n📂 Arquivos gerados:");
    console.log(`   1. ${indexPath} (sitemap principal)`);
    console.log(`   2. ${productsPath}`);
    console.log(`   3. ${categoriesPath}`);
    console.log("\n" + "=".repeat(60));

    return {
      products: {
        count: productsResult.totalProducts,
        file: productsPath,
      },
      categories: {
        count: uniqueCategoryUrls.length,
        file: categoriesPath,
      },
      index: {
        file: indexPath,
      },
      totalUrls: productsResult.totalProducts + uniqueCategoryUrls.length,
    };
  } catch (error) {
    console.error("\n❌ Erro ao gerar sitemaps:", error);
    throw error;
  }
}

// Execução via CLI
if (import.meta.main) {
  const config: SitemapConfig = {
    baseUrl: Deno.env.get("BASE_URL") ||
      "https://www.oticaisabeladias.com.br",
    outputDir: Deno.env.get("OUTPUT_DIR") || "static",
    storeProps: {
      token: Deno.env.get("STORE_TOKEN") || "",
      publicUrl: Deno.env.get("PUBLIC_URL") || "",
    },
    headerJsonPath: Deno.env.get("HEADER_JSON_PATH") ||
      ".deco/blocks/Header%20-%2001.json",
  };

  // Valida as configurações obrigatórias
  if (!config.storeProps.token || !config.storeProps.publicUrl) {
    console.error(
      "❌ Erro: Configure as variáveis de ambiente STORE_TOKEN e PUBLIC_URL"
    );
    console.log("\nExemplo de uso:");
    console.log(
      'STORE_TOKEN=seu_token PUBLIC_URL=https://sua-loja.com.br deno run --allow-net --allow-read --allow-write packs/sitemap/generateAllSitemap.ts'
    );
    Deno.exit(1);
  }

  try {
    await generateAllSitemaps(config);

    console.log("\n🎉 Sitemaps gerados com sucesso!");
    console.log(
      `\n💡 Dica: Adicione ${config.baseUrl}/sitemap.xml ao Google Search Console`
    );
  } catch (error) {
    console.error("❌ Falha ao gerar sitemaps:", error);
    Deno.exit(1);
  }
}