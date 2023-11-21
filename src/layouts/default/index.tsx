import { ReactNode } from 'react'

import ThMenuItem from '@/components/feature/ThMenuItem'
import ThMobileHeader from '@/components/feature/ThMobileHeader'
import { useScreenSize } from '@/context/MediaQuery'

interface LayoutProps {
  children: ReactNode
}

const Defaultlayout: React.FC<LayoutProps> = ({ children }) => {
  const { isSmallScreen } = useScreenSize()
  const parentClass = isSmallScreen
    ? 'tw-flex tw-min-h-screen tw-flex-col'
    : 'tw-flex tw-min-h-screen'

  return (
    <>
      <div className={parentClass}>
        <div className="tw-hidden md:tw-block">
          <ThMenuItem />
        </div>

        <div className="tw-block md:tw-hidden">
          <ThMobileHeader />
        </div>

        <main className="tw-grow">{children}</main>

        <div className="tw-sticky tw-bottom-0 tw-left-0 tw-block md:tw-hidden tw-z-50">
          <ThMenuItem />
        </div>
      </div>
    </>
  )
}

export default Defaultlayout
