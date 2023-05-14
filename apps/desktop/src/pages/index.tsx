import { BotProvider } from '@ai-translator/shared'
import dynamic from 'next/dynamic'

const DynamicHome = dynamic(() => import('../components/PageHome'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
})

export default function PageHome() {
  return (
    <BotProvider>
      <DynamicHome />
    </BotProvider>
  )
}
