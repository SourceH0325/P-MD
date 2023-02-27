import '@/styles/globals.css'
import Layout from './layout'
import { Analytics } from '@vercel/analytics/react'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Analytics />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
