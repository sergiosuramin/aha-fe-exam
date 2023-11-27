import { ThemeProvider } from '@mui/material'
import { Analytics } from '@vercel/analytics/react'
import type { AppProps } from 'next/app'
import { Ubuntu } from 'next/font/google'

import '@/styles/globals.css'
import { ScreenSizeProvider } from '@/context/MediaQuery'
import { QueryStateProvider } from '@/context/QueryFilter'
import { default as Defaultlayout } from '@/layouts/default'
import { theme } from '@/lib/MuiTheme'

const ubuntuFont = Ubuntu({ weight: '400', subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`tw-min-h-screen ${ubuntuFont.className}`}>
      <ThemeProvider theme={theme}>
        <QueryStateProvider>
          <ScreenSizeProvider>
            <Defaultlayout>
              <Component {...pageProps} />
            </Defaultlayout>
          </ScreenSizeProvider>
        </QueryStateProvider>
      </ThemeProvider>
      <Analytics />
    </div>
  )
}
