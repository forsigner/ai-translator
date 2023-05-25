import { Fragment } from 'react'
import type { AppProps } from 'next/app'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { ToastContainer } from 'bone-ui'
import { EasyModalProvider } from '@ai-translator/easy-modal'
import { init, initFomir } from '@ai-translator/widgets'
import '../styles/globals.css'
import { ChatProvider } from '@ai-translator/chat'

init()
initFomir()

interface Props extends AppProps {
  Component: AppProps['Component'] & { Layout: any }
}

export default function App({ Component, pageProps }: Props) {
  const Layout = Component.Layout ? Component.Layout : Fragment

  return (
    <ChatProvider>
      <EasyModalProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </EasyModalProvider>
      <ToastContainer />
    </ChatProvider>
  )
}
