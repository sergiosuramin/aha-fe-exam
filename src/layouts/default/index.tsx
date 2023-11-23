import { ReactNode } from 'react'

import ThMenuItem from '@/components/feature/ThMenuItem'
import ThMobileHeader from '@/components/feature/ThMobileHeader'

interface LayoutProps {
  children: ReactNode
}

const Defaultlayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div>
        <ThMenuItem />

        <div className="tw-block md:tw-hidden">
          <ThMobileHeader />
        </div>

        <main className="tw-grow">{children}</main>
      </div>
    </>
  )
}

export default Defaultlayout
