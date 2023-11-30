import { Typography } from '@mui/material'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

import ThImageLoader from '@/components/ui/ThImageLoader'
import { LOGO_ICON } from '@/utils/constants'

function ThMobileHeader() {
  const router = useRouter()

  const isNotHomePage = router.pathname !== '/'

  if (isNotHomePage) {
    return (
      <div className="tw-container tw-mx-auto tw-px-4 tw-py-5">
        <div className="tw-flex tw-items-center tw-gap-x-4">
          <NextLink href="/">
            <div className="tw-cursor-pointer">
              <ThImageLoader
                alt="left-cv"
                src="/assets/svg/chevron_left.svg"
                width={26}
                height={26}
              />
            </div>
          </NextLink>

          <Typography variant="h1">Home Page</Typography>
        </div>
      </div>
    )
  }

  return (
    <div className="tw-container tw-mx-auto tw-px-4 tw-py-7">
      <ThImageLoader
        alt="logo"
        width={35}
        height={15}
        src={LOGO_ICON}
        priority
      />
    </div>
  )
}

export default ThMobileHeader
