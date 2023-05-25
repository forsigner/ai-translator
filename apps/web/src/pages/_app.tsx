import { ToastContainer } from 'bone-ui'
import type { AppProps } from 'next/app'
import { Fragment, useEffect } from 'react'
import { EasyModalProvider } from '@ai-translator/easy-modal'
import { injectGlobalStyle } from '@fower/core'
import { SessionProvider } from '@ai-translator/shared'
import { ChatProvider, LANGUAGE_KEY } from '@ai-translator/chat'
import { init, initFomir } from '@ai-translator/widgets'
import { useTranslation, withTranslation } from 'react-i18next'
import { getCookie } from 'cookies-next'
import '../styles/globals.scss'
import { LoginSuccessPayload } from '@ai-translator/api-sdk'

interface Props<T> extends AppProps<T> {
  // Component: AppProps<T>['Component'] & { Layout: any }
  Component: any
}

init()
initFomir()

injectGlobalStyle({
  a: {
    color: 'brand400',
    textDecoration: 'none',
    cursor: 'pointer',
  },
})

function MyApp({ Component, pageProps }: Props<{ payload: LoginSuccessPayload }>) {
  const Layout = Component.Layout ? Component.Layout : Fragment

  const { i18n } = useTranslation('common')

  useEffect(() => {
    const lang = getCookie(LANGUAGE_KEY) as string

    if (lang && lang !== i18n.language) {
      i18n.changeLanguage(lang)
    }
  }, [i18n])

  return (
    <SessionProvider session={pageProps?.payload}>
      <ChatProvider>
        <EasyModalProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </EasyModalProvider>
        <ToastContainer></ToastContainer>
      </ChatProvider>
    </SessionProvider>
  )
}

export default withTranslation()(MyApp)
