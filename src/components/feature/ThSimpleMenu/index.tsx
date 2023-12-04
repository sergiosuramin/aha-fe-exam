import { Typography } from '@mui/material'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

import ThImageLoader from '@/components/ui/ThImageLoader'
import { useScreenSize } from '@/context/MediaQuery'
import { LOGO_ICON, MENU_ITEMS } from '@/utils/constants'

function ThSimpleMenu() {
  const { isSmallScreen } = useScreenSize()
  const router = useRouter()

  return (
    <div
      className={`tw-fixed tw-left-0 tw-bottom-0 md:tw-top-0 tw-z-50 ${
        isSmallScreen && 'tw-right-0'
      }`}
    >
      <div className="md:tw-h-[100%] tw-flex tw-justify-center tw-gap-x-16 tw-items-start md:tw-flex-col md:tw-justify-start md:tw-items-center tw-bg-black-350">
        <div className="tw-hidden tw-w-[80px] tw-h-[66px] md:tw-h-[88px] md:tw-flex md:tw-justify-center md:tw-items-center">
          <ThImageLoader
            alt="logo"
            width={35}
            height={15}
            src={LOGO_ICON}
            priority
          />
        </div>

        {MENU_ITEMS.map((menu, index) => {
          /**
           * to make sure /results will make sure "Home" in simple menu flagged as active.
           * this is much more reasonable than making ternary statement in home page.
           */
          const isActive =
            router.pathname === menu.path ||
            (menu.path === '/' && router.pathname.startsWith('/results'))

          if (isActive) {
            return (
              <div
                key={index}
                className="md:tw-w-[100%] tw-h-[60px] md:tw-h-[50px] tw-flex tw-relative tw-justify-center tw-items-center md:tw-mb-3"
              >
                <NextLink href={`${menu.path}`} className="tw-cursor-pointer">
                  <div className="md:tw-mb-3">
                    <ThImageLoader
                      alt="menu"
                      width={24}
                      height={24}
                      src={menu.icon_url_on}
                      priority
                    />
                  </div>
                </NextLink>

                <div className="tw-absolute tw-bottom-0 tw-text-center">
                  <Typography variant="labelSmall">
                    {menu.name ?? ''}
                  </Typography>
                </div>
              </div>
            )
          }

          return (
            <div
              key={index}
              className="tw-h-[60px] md:tw-h-[50px] tw-cursor-pointer tw-flex tw-justify-center tw-items-center md:tw-mb-3"
            >
              <NextLink href={`${menu.path}`} className="tw-cursor-pointer">
                <div className="md:tw-mb-3">
                  <ThImageLoader
                    alt="menu"
                    width={24}
                    height={24}
                    src={menu.icon_url_off}
                    priority
                  />
                </div>
              </NextLink>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ThSimpleMenu
