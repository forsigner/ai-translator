import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document'
import { getAtomIds, getCssString } from '@fower/react'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }
  render() {
    const theme = (this.props as any).theme

    return (
      // <Html className="dark">
      <Html lang="en" className={theme || 'light'}>
        <Head>
          <style data-fower={getAtomIds()} dangerouslySetInnerHTML={{ __html: getCssString() }} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
