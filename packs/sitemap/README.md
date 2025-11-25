# 🗺️ Gerador de Sitemaps

Scripts para gerar sitemaps completos (produtos + categorias) para a Ótica Isabela Dias.

## 📁 Arquivos

### 1. `generateSitemap.ts`
Gera sitemap apenas de **produtos** (busca com termo "*").

### 2. `extractRelativeUrls.ts`
Extrai URLs relativas de arquivos JSON e gera sitemap de **categorias**.

### 3. `generateAllSitemap.ts` ⭐
**Script principal** que gera:
- `sitemap.xml` - Sitemap index principal
- `products.xml` - Sitemap de todos os produtos
- `categories.xml` - Sitemap de categorias

## 🚀 Como Usar

### Opção 1: Usando variáveis de ambiente do sistema

```bash
# Defina as variáveis de ambiente
export STORE_TOKEN="seu_token_aqui"
export PUBLIC_URL="https://www.oticaisabeladias.com.br"

# Execute o script
deno task sitemap
```

### Opção 2: Inline (recomendado)

```bash
STORE_TOKEN="seu_token" PUBLIC_URL="https://www.oticaisabeladias.com.br" deno run --allow-all packs/sitemap/generateAllSitemap.ts
```

### Opção 3: Usando credenciais do .deco

Se você tem acesso ao site via deco.cx:

```bash
# Obtenha as credenciais do arquivo .deco/blocks/site.json
# Ou use o AppContext direto em um loader/action

# Exemplo em um loader:
import { generateAllSitemaps } from "$store/packs/sitemap/generateAllSitemap.ts";

export default async function loader(_props: unknown, _req: Request, ctx: AppContext) {
  const result = await generateAllSitemaps({
    baseUrl: "https://www.oticaisabeladias.com.br",
    outputDir: "static",
    storeProps: ctx,
    headerJsonPath: ".deco/blocks/Header%20-%2001.json",
  });
  
  return result;
}
```

## ⚙️ Configuração

O script aceita as seguintes variáveis de ambiente:

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `STORE_TOKEN` | Token de autenticação da API | **Obrigatório** |
| `PUBLIC_URL` | URL pública da loja | **Obrigatório** |
| `BASE_URL` | URL base para o sitemap | `https://www.oticaisabeladias.com.br` |
| `OUTPUT_DIR` | Diretório de saída | `static` |
| `HEADER_JSON_PATH` | Caminho do JSON do header | `.deco/blocks/Header%20-%2001.json` |

## 📊 Output

Após execução bem-sucedida, os seguintes arquivos serão gerados em `static/`:

```
static/
├── sitemap.xml          # Sitemap index (aponta para os outros)
├── products.xml         # Todos os produtos
└── categories.xml       # Todas as categorias
```

### Exemplo de sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://www.oticaisabeladias.com.br/products.xml</loc>
    <lastmod>2025-11-25</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://www.oticaisabeladias.com.br/categories.xml</loc>
    <lastmod>2025-11-25</lastmod>
  </sitemap>
</sitemapindex>
```

## 🛠️ Task no deno.json

Adicione ao seu `deno.json`:

```json
{
  "tasks": {
    "sitemap": "deno run --allow-all packs/sitemap/generateAllSitemap.ts"
  }
}
```

Depois execute:

```bash
deno task sitemap
```

## 📝 Uso Programático

```typescript
import { generateAllSitemaps } from "$store/packs/sitemap/generateAllSitemap.ts";
import type { StoreProps } from "$store/apps/site.ts";

const storeProps: StoreProps = {
  token: "seu_token",
  publicUrl: "https://sua-api.com",
};

const result = await generateAllSitemaps({
  baseUrl: "https://www.oticaisabeladias.com.br",
  outputDir: "static",
  storeProps,
  headerJsonPath: ".deco/blocks/Header%20-%2001.json",
});

console.log(`Total de URLs: ${result.totalUrls}`);
console.log(`Produtos: ${result.products.count}`);
console.log(`Categorias: ${result.categories.count}`);
```

## 🔍 SEO - Google Search Console

Após gerar os sitemaps:

1. Faça upload dos arquivos para o servidor (pasta `static/`)
2. Acesse [Google Search Console](https://search.google.com/search-console)
3. Adicione o sitemap: `https://www.oticaisabeladias.com.br/sitemap.xml`

## ⚡ Scripts Individuais

### Apenas produtos

```bash
STORE_TOKEN="token" PUBLIC_URL="url" deno run --allow-all packs/sitemap/generateSitemap.ts
```

### Apenas categorias

```bash
deno run --allow-read --allow-write packs/sitemap/extractRelativeUrls.ts ".deco/blocks/Header%20-%2001.json" --save --sitemap
```

## 🐛 Troubleshooting

### Erro 404 / Token inválido

Certifique-se de que as credenciais estão corretas. Você pode encontrá-las em:
- `.deco/blocks/site.json`
- Admin do deco.cx

### Erro de permissão

Use `--allow-all` ou as permissões específicas:
```bash
deno run --allow-net --allow-read --allow-write --allow-env --allow-sys packs/sitemap/generateAllSitemap.ts
```

### Categorias vazias

Verifique se o caminho do arquivo JSON do header está correto:
```bash
ls -la ".deco/blocks/Header%20-%2001.json"
```

## 📈 Performance

- **Produtos**: ~2-5 minutos (dependendo da quantidade)
- **Categorias**: Instantâneo
- **Total**: Geralmente < 5 minutos

## 🎯 Próximos Passos

- [ ] Adicionar páginas estáticas ao sitemap
- [ ] Gerar sitemap de imagens
- [ ] Automação via GitHub Actions
- [ ] Cache de produtos para geração incremental

