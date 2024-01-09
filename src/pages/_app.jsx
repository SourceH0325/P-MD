import '@/styles/globals.css';
import React from 'react';
import Layout from './components/layout';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SessionProvider } from 'next-auth/react';
import ReactGA from 'react-ga4';

ReactGA.initialize(process.env.NEXT_PUBLIC_GA_ID)

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  React.useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
  }, []);

  return (
    <>
      <SpeedInsights />
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  );
}
