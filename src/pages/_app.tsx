import { ThemeProvider } from '@mui/material'
import { Analytics } from '@vercel/analytics/react'
import type { AppProps } from 'next/app'
import { Ubuntu } from 'next/font/google'

import '@/styles/globals.css'
import { ScreenSizeProvider } from '@/context/MediaQuery'
import { default as Defaultlayout } from '@/layouts/default'
import { theme } from '@/lib/MuiTheme'

const ubuntuFont = Ubuntu({ weight: '400', subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${ubuntuFont.className}`}>
      <ThemeProvider theme={theme}>
        <ScreenSizeProvider>
          <Defaultlayout>
            <Component {...pageProps} />
          </Defaultlayout>
        </ScreenSizeProvider>
      </ThemeProvider>
      <Analytics />
    </div>
  )
}
