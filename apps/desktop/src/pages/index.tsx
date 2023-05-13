import dynamic from 'next/dynamic'

const DynamicHome = dynamic(() => import('../components/PageHome'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
})

export default function PageHome() {
  return <DynamicHome />
}
