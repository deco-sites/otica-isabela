import { asset, Head } from "$fresh/runtime.ts";

function GlobalTags() {
  return (
    <Head>
      {/* Enable View Transitions API */}
      <meta name="view-transition" content="same-origin" />

      {/* Tailwind v3 CSS file */}
      <link href={asset("/styles.css")} rel="stylesheet" />

      {/* Web Manifest */}
      <link rel="manifest" href={asset("/site.webmanifest")} />

      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7304468452704360"
        crossorigin="anonymous"
      >
      </script>
      <script
        src="//collect.vendavalida.com.br/push.js"
        async
        type="text/javascript"
      >
      </script>
    </Head>
  );
}

export default GlobalTags;
