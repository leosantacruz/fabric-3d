import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head />

      <body>
        <Script
          src="https://static.sketchfab.com/api/sketchfab-viewer-1.10.1.js"
          strategy="beforeInteractive"
        ></Script>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
