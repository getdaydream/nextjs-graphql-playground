import * as React from 'react';
import Document, {
  NextDocumentContext,
  Head,
  Main,
  NextScript,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: NextDocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <html>
        <Head>
          <meta charSet="utf-8" />
          <meta name="renderer" content="webkit" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, viewport-fit=cover"
          />

          {/* Style dependencies */}
          <link
            href="https://unpkg.com/normalize.css@^7.0.0"
            rel="stylesheet"
          />
          {/* Blueprint stylesheets */}
          <link
            href="https://unpkg.com/@blueprintjs/icons@^3.4.0/lib/css/blueprint-icons.css"
            rel="stylesheet"
          />
          <link
            href="https://unpkg.com/@blueprintjs/core@^3.10.0/lib/css/blueprint.css"
            rel="stylesheet"
          />

          {this.props.styles}
        </Head>
        <body id="body">
          <Main />
          <NextScript />
        </body>

        <noscript>You need to enable JavaScript to run this app.</noscript>
      </html>
    );
  }
}
