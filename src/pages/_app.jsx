import '@/styles/globals.css'
import Head from 'next/head'
import React from 'react'
import Layout from './components/layout'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { SessionProvider } from 'next-auth/react'
import ReactGA from 'react-ga4'

ReactGA.initialize(process.env.NEXT_PUBLIC_GA_ID)

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  React.useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname })
  }, [])

  return (
    <>
      <Head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href='https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap' rel='stylesheet' />
      </Head>
      <SpeedInsights />
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  )
}
