import { ThemeProvider } from '@mui/material'
import { Analytics } from '@vercel/analytics/react'
import type { AppProps } from 'next/app'
import { Ubuntu } from 'next/font/google'

import '@/styles/globals.css'
import { ScreenSizeProvider } from '@/context/MediaQuery'
import { QueryStateProvider } from '@/context/QueryFilter'
import DefaultLayout from '@/layouts/default'
import WithFriendLayout from '@/layouts/withFriend'
import { theme } from '@/lib/MuiTheme'

const ubuntuFont = Ubuntu({ weight: '400', subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  const isWithFriend = pageProps.withFriend ?? false

  // using ternary on the conditinal render of the layout will prevent any unecessary re-render
  return (
    <div className={`tw-min-h-screen ${ubuntuFont.className}`}>
      <ThemeProvider theme={theme}>
        <QueryStateProvider>
          <ScreenSizeProvider>
            {isWithFriend ? (
              <WithFriendLayout>
                <Component {...pageProps} />
              </WithFriendLayout>
            ) : (
              <DefaultLayout>
                <Component {...pageProps} />
              </DefaultLayout>
            )}
          </ScreenSizeProvider>
        </QueryStateProvider>
      </ThemeProvider>
      <Analytics />
    </div>
  )
}
