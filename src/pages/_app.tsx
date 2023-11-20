import { Analytics } from '@vercel/analytics/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import '@/styles/globals.css'
import { default as Defaultlayout } from '@/layouts/default'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="tw-min-h-screen">
        <Head>
          <title>Aha FE Exam - Sergio Suramin</title>
        </Head>
        <Defaultlayout>
          <Component {...pageProps} />
        </Defaultlayout>
      <Analytics />
    </div>
  )
}
