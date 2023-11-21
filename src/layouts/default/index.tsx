import { ReactNode } from 'react'

import ThMenuItem from '@/components/feature/ThMenuItem'
import ThMobileHeader from '@/components/feature/ThMobileHeader'

interface LayoutProps {
  children: ReactNode
}

const Defaultlayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="md:tw-flex tw-h-screen">
      <ThMobileHeader />
      {/* <ThSimpleMenu /> */}

      <div className="tw-h-[100%] tw-hidden md:tw-block tw-absolute tw-bg-[#181818]/50 tw-left-0 tw-bottom-0 tw-w-[80px] tw-bg-[#1B1B1B]">
        <ThMenuItem />
      </div>
      <main className="tw-grow tw-w-full tw-min-h-screen tw-p-8 md:tw-ml-[80px] md:tw-overflow-y-auto">
        {children}
      </main>

      {/* ThSimpleMenu will be sticky at the bottom for sm */}
      <div className="tw-block md:tw-hidden tw-sticky tw-bottom-0 tw-left-0 tw-right-0 tw-bg-[#181818]/50">
        <ThMenuItem />
      </div>
    </div>
  )
}

export default Defaultlayout
