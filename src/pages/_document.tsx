import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class ThDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="title" content="AHA FE Exam - Sergio Suramin" />
          <meta
            name="description"
            content="AHA Exam for Frontend Position By Sergio Suramin"
          ></meta>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/logo.png" />
          <meta name="theme-color" content="#121212" />
          <meta name="robots" content="index, follow" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
