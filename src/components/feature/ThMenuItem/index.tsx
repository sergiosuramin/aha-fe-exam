import { Typography } from '@mui/material'
import { useRouter } from 'next/router'

import ThImageLoader from '@/components/ui/ThImageLoader'
import { LOGO_ICON, MENU_ITEMS } from '@/utils/constants'

function ThMenuItem() {
  const router = useRouter()

  const onRoutePush = (path: string) => {
    router.push(path)
  }

  return (
    <div className="md:tw-h-[100%] tw-flex tw-justify-center tw-gap-x-16 tw-items-start md:tw-flex-col md:tw-justify-start md:tw-items-center tw-bg-[#181818]">
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
        const isActive = router.pathname === menu.path

        if (isActive) {
          return (
            <div
              key={index}
              className="md:tw-w-[100%] tw-h-[60px] tw-flex tw-relative tw-justify-center tw-items-center"
            >
              <div
                className="tw-cursor-pointer"
                onClick={() => onRoutePush(menu.path)}
              >
                <ThImageLoader
                  alt="menu"
                  width={24}
                  height={24}
                  src={menu.icon_url_on}
                  priority
                />
              </div>

              <div className="tw-absolute tw-bottom-0 tw-text-center">
                <Typography variant="labelSmall">{menu.name ?? ''}</Typography>
              </div>
            </div>
          )
        }

        return (
          <div
            key={index}
            className="tw-h-[60px] tw-cursor-pointer tw-flex tw-justify-center tw-items-center"
          >
            <div onClick={() => onRoutePush(menu.path)}>
              <ThImageLoader
                alt="menu"
                width={24}
                height={24}
                src={menu.icon_url_off}
                priority
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ThMenuItem
