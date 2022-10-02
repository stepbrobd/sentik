import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

const Document = () => {
  return (
    <Html>
      <Head>
        <meta charSet="UTF-8" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans&display=swap"
          rel="stylesheet"
        />

        <link rel="preconnect" href="https://static.cloudflareinsights.com" />
        <link rel="preconnect" href="https://plausible.io" />

        <Script
          defer
          id="plausible-analytics"
          strategy="afterInteractive"
          data-domain="hackmit22.vercel.app"
          src={"https://plausible.io/js/plausible.js"}
        />
      </Head>
      <body lang="en-US">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
