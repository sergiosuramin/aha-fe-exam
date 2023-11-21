import ThImageLoader from '@/components/ui/ThImageLoader'
import { LOGO_ICON } from '@/utils/constants'

function ThMobileHeader() {
  return (
    <div className="tw-container tw-mx-auto tw-p-8">
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