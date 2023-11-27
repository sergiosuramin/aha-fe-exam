import { ReactNode } from 'react'

import ThMobileHeader from '@/components/feature/ThMobileHeader'
import ThSimpleMenu from '@/components/feature/ThSimpleMenu'

interface LayoutProps {
  children: ReactNode
}

const Defaultlayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div>
        <ThSimpleMenu />

        <div className="tw-block md:tw-hidden">
          <ThMobileHeader />
        </div>

        <main className="tw-grow">{children}</main>
      </div>
    </>
  )
}

export default Defaultlayout
