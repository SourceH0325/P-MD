import '@/styles/globals.css'
import Layout from './components/layout'
import { Analytics } from '@vercel/analytics/react'
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Analytics />
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  )
}
