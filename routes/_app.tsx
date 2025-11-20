// deno-lint-ignore-file no-explicit-any
import CookieConsent from "$store/sections/Miscellaneous/CookieConsent.tsx";
import { AppProps } from "$fresh/server.ts";
import GlobalTags from "$store/components/GlobalTags.tsx";
import Theme from "$store/sections/Theme/Theme.tsx";
import { RenderScripts, SCRIPT_CONTEXT } from "../components/Script.tsx";

const sw = () =>
  addEventListener("load", () =>
    navigator && navigator.serviceWorker &&
    navigator.serviceWorker.register("/sw.js"));

const wasm = () => {
  globalThis.addEventListener("load", () => {
    fetch(
      "/scripts/experimentador/utils/master-tryon.wasm",
    ).then(async (result) => {
      (globalThis as any).objWasm = result.clone();
      await result.arrayBuffer();

      (globalThis as any).arquivosCache = true;
    }).catch((error) => {
      (globalThis as any).arquivosCache = true;
    });
  });
};

function App(props: AppProps) {
  const isHome = props.url.href === (props.url.origin + "/");

  return (
    <>
      {/* Include default fonts and css vars */}
      <Theme />

      {/* Include Icons and manifest */}
      <GlobalTags />

      <SCRIPT_CONTEXT.Provider value={[]}>
        {/* Rest of Preact tree */}
        <props.Component />

        {/* Adicione o consentimento de cookies aqui */}
        <CookieConsent />

        <RenderScripts />
        {/* Include service worker */}
        <script
          type="module"
          dangerouslySetInnerHTML={{ __html: `(${sw})();` }}
        />
        <script
          type="module"
          dangerouslySetInnerHTML={{ __html: `(${wasm})();` }}
        />
      </SCRIPT_CONTEXT.Provider>

      {/* Dados estruturados home */}
      {isHome && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "name": "Ótica Isabela Dias",
                  "url": "https://www.oticaisabeladias.com.br/",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target":
                      "https://www.oticaisabeladias.com.br/?s={search_term_string}",
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "Organization",
                  "name": "Ótica On Line Isabela Dias Comércio de Óculos Ltda",
                  "url": "https://www.oticaisabeladias.com.br/",
                  "logo":
                    "https://www.oticaisabeladias.com.br/live/invoke/website/loaders/image.ts?fit=cover&width=330&height=94&src=https%3A%2F%2Fassets.decocache.com%2Fotica-isabela%2Fed4a9f55-423b-402d-957a-2b13ec4abd34%2Foticaloogaqui2.svg",
                  "sameAs": [
                    "https://www.facebook.com/oticaisabeladias/",
                    "https://www.instagram.com/oticaisabeladias/",
                  ],
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Avenida Orlando Dompieri, 1750, Sala 02",
                    "addressLocality": "Franca",
                    "addressRegion": "SP",
                    "postalCode": "14409-003",
                    "addressCountry": "BR",
                  },
                  "telephone": "+55 16 3761-8684",
                  "email": "suporte@oticaisabeladias.com", // se esse for o e-mail correto
                },
                {
                  "@type": "BreadcrumbList",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Início",
                      "item": "https://www.oticaisabeladias.com.br/",
                    },
                  ],
                },
              ],
            }),
          }}
        />
      )}
    </>
  );
}

export default App;
