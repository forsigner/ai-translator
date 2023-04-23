import { ToastContainer } from 'bone-ui'
import type { AppProps } from 'next/app'
import { Fragment, useEffect } from 'react'
import { EasyModalProvider } from '@langpt/easy-modal'
import { injectGlobalStyle } from '@fower/core'
import { LANGUAGE_KEY, SessionProvider, init } from '@langpt/shared'
import { useTranslation, withTranslation } from 'react-i18next'
import { getCookie } from 'cookies-next'
import '../styles/globals.scss'
import { LoginSuccessPayload } from '@langpt/api-sdk'

interface Props<T> extends AppProps<T> {
  Component: AppProps<T>['Component'] & { Layout: any }
}

init()

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
      <EasyModalProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </EasyModalProvider>
      <ToastContainer></ToastContainer>
    </SessionProvider>
  )
}

export default withTranslation()(MyApp)
