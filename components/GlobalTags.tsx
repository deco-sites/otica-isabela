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

      <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html: `@font-face {
              font-family: "Bebas Neue";
              src: ${
            asset("../static/fonts/BebasNeue-Regular.ttf")
          } format("truetype");
              font-style: normal;
              font-weight: normal;
          }`,
        }}
      />
    </Head>
  );
}

export default GlobalTags;
