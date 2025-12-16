import { asset, Head } from "$fresh/runtime.ts";

function GlobalTags() {
  return (
    <Head>
      <style
        dangerouslySetInnerHTML={{
          __html: `
@font-face {
    font-family: 'Outfit';
    src: url(${asset("/fonts/Outfit-Thin.woff2")}) format('woff2'),
        url(${asset("/fonts/Outfit-Thin.woff")}) format('woff');
    font-weight: 100;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Outfit';
    src: url(${asset("/fonts/Outfit-ExtraLight.woff2")}) format('woff2'),
        url(${asset("/fonts/Outfit-ExtraLight.woff")}) format('woff');
    font-weight: 200;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Outfit';
    src: url(${asset("/fonts/Outfit-Light.woff2")}) format('woff2'),
        url(${asset("/fonts/Outfit-Light.woff")}) format('woff');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Outfit';
    src: url(${asset("/fonts/Outfit-Regular.woff2")}) format('woff2'),
        url(${asset("/fonts/Outfit-Regular.woff")}) format('woff');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Outfit';
    src: url(${asset("/fonts/Outfit-Medium.woff2")}) format('woff2'),
        url(${asset("/fonts/Outfit-Medium.woff")}) format('woff');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Outfit';
    src: url(${asset("/fonts/Outfit-SemiBold.woff2")}) format('woff2'),
        url(${asset("/fonts/Outfit-SemiBold.woff")}) format('woff');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Outfit';
    src: url(${asset("/fonts/Outfit-Bold.woff2")}) format('woff2'),
        url(${asset("/fonts/Outfit-Bold.woff")}) format('woff');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Outfit';
    src: url(${asset("/fonts/Outfit-ExtraBold.woff2")}) format('woff2'),
        url(${asset("/fonts/Outfit-ExtraBold.woff")}) format('woff');
    font-weight: 800;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Outfit';
    src: url(${asset("/fonts/Outfit-Black.woff2")}) format('woff2'),
        url(${asset("/fonts/Outfit-Black.woff")}) format('woff');
    font-weight: 900;
    font-style: normal;
    font-display: swap;
}
				`,
        }}
      />

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
    </Head>
  );
}

export default GlobalTags;
