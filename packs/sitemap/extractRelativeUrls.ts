/**
 * Script para extrair URLs relativas (href e url) de arquivos JSON
 * URLs relativas são aquelas que NÃO começam com http:// ou https://
 */

interface UrlEntry {
  key: string;
  value: string;
  path: string;
}

/**
 * Verifica se uma string é uma URL relativa (não começa com http)
 */
function isRelativeUrl(value: string): boolean {
  return (
    typeof value === "string" &&
    value.length > 0 &&
    !value.startsWith("http://") &&
    !value.startsWith("https://") &&
    !value.startsWith("//") &&
    value !== "/" // ignora apenas a raiz
  );
}

/**
 * Percorre recursivamente um objeto JSON procurando por campos "href" ou "url"
 */
function extractRelativeUrls(
  obj: any,
  path: string = "root",
  results: UrlEntry[] = []
): UrlEntry[] {
  if (typeof obj !== "object" || obj === null) {
    return results;
  }

  // Se for array, percorre cada elemento
  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      extractRelativeUrls(item, `${path}[${index}]`, results);
    });
    return results;
  }

  // Percorre todas as chaves do objeto
  for (const [key, value] of Object.entries(obj)) {
    const currentPath = `${path}.${key}`;

    // Se a chave é "href" ou "url", verifica se é uma URL relativa
    if ((key === "href" || key === "url") && typeof value === "string") {
      if (isRelativeUrl(value)) {
        results.push({
          key,
          value,
          path: currentPath,
        });
      }
    }

    // Continua a busca recursiva
    if (typeof value === "object" && value !== null) {
      extractRelativeUrls(value, currentPath, results);
    }
  }

  return results;
}

/**
 * Agrupa URLs por padrões comuns
 */
function groupUrlsByPattern(urls: UrlEntry[]): Map<string, string[]> {
  const groups = new Map<string, string[]>();

  urls.forEach((entry) => {
    const url = entry.value;
    
    // Define o padrão baseado no primeiro segmento da URL
    const firstSegment = url.split("/")[1] || "root";
    const pattern = `/${firstSegment}/*`;

    if (!groups.has(pattern)) {
      groups.set(pattern, []);
    }
    groups.get(pattern)!.push(url);
  });

  return groups;
}

/**
 * Remove URLs duplicadas
 */
function getUniqueUrls(urls: UrlEntry[]): string[] {
  const uniqueSet = new Set(urls.map((entry) => entry.value));
  return Array.from(uniqueSet).sort();
}

/**
 * Função principal para processar um arquivo JSON
 */
export async function extractRelativeUrlsFromFile(
  filePath: string
): Promise<UrlEntry[]> {
  try {
    console.log(`📂 Lendo arquivo: ${filePath}\n`);

    // Lê o arquivo JSON
    const content = await Deno.readTextFile(filePath);
    const data = JSON.parse(content);

    // Extrai as URLs relativas
    const results = extractRelativeUrls(data);

    console.log(`✅ Total de URLs relativas encontradas: ${results.length}\n`);

    return results;
  } catch (error) {
    console.error(`❌ Erro ao processar arquivo:`, error);
    throw error;
  }
}

/**
 * Gera relatório formatado das URLs encontradas
 */
function generateReport(urls: UrlEntry[]): void {
  // URLs únicas
  const uniqueUrls = getUniqueUrls(urls);
  console.log("📋 URLs RELATIVAS ÚNICAS:\n");
  console.log("=".repeat(60));
  uniqueUrls.forEach((url, index) => {
    console.log(`${(index + 1).toString().padStart(3, " ")}. ${url}`);
  });

  // Agrupamento por padrão
  console.log("\n\n📊 AGRUPAMENTO POR CATEGORIA:\n");
  console.log("=".repeat(60));
  const groups = groupUrlsByPattern(urls);
  
  for (const [pattern, groupUrls] of groups.entries()) {
    const uniqueGroupUrls = Array.from(new Set(groupUrls)).sort();
    console.log(`\n${pattern} (${uniqueGroupUrls.length} URLs)`);
    uniqueGroupUrls.forEach((url) => {
      console.log(`  - ${url}`);
    });
  }

  // Estatísticas
  console.log("\n\n📈 ESTATÍSTICAS:\n");
  console.log("=".repeat(60));
  console.log(`Total de ocorrências: ${urls.length}`);
  console.log(`URLs únicas: ${uniqueUrls.length}`);
  console.log(`Categorias: ${groups.size}`);
}

/**
 * Salva as URLs em um arquivo de texto
 */
async function saveUrlsToFile(urls: string[], filename: string): Promise<void> {
  const content = urls.join("\n");
  await Deno.writeTextFile(filename, content);
  console.log(`\n💾 URLs salvas em: ${filename}`);
}

/**
 * Gera um sitemap XML com as URLs relativas
 */
function generateSitemapForRelativeUrls(
  urls: string[],
  baseUrl: string
): string {
  const urlEntries = urls
    .map((url) => {
      const fullUrl = `${baseUrl}${url}`;
      const lastmod = new Date().toISOString().split("T")[0];
      return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

// Execução via CLI
if (import.meta.main) {
  const args = Deno.args;
  
  if (args.length === 0) {
    console.error("❌ Uso: deno run --allow-read --allow-write extractRelativeUrls.ts <caminho-do-arquivo-json> [--save] [--sitemap]");
    console.log("\nExemplo:");
    console.log('  deno run --allow-read --allow-write packs/sitemap/extractRelativeUrls.ts ".deco/blocks/Header - 01.json" --save --sitemap');
    Deno.exit(1);
  }

  const filePath = args[0];
  const shouldSave = args.includes("--save");
  const shouldGenerateSitemap = args.includes("--sitemap");

  try {
    // Extrai as URLs
    const results = await extractRelativeUrlsFromFile(filePath);

    // Gera o relatório
    generateReport(results);

    // URLs únicas
    const uniqueUrls = getUniqueUrls(results);

    // Salva em arquivo se solicitado
    if (shouldSave) {
      await saveUrlsToFile(uniqueUrls, "relative-urls.txt");
    }

    // Gera sitemap se solicitado
    if (shouldGenerateSitemap) {
      const baseUrl = "https://www.oticaisabeladias.com.br";
      const xml = generateSitemapForRelativeUrls(uniqueUrls, baseUrl);
      await Deno.writeTextFile("static/categories.xml", xml);
      console.log("💾 Sitemap XML salvo em: categories.xml");
    }

    console.log("\n✨ Processo concluído com sucesso!");
  } catch (error) {
    console.error("❌ Erro:", error);
    Deno.exit(1);
  }
}

// Exporta as funções para uso programático
export {
  extractRelativeUrls,
  getUniqueUrls,
  groupUrlsByPattern,
  generateSitemapForRelativeUrls,
};

