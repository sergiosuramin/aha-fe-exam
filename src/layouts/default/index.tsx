import { ReactNode } from 'react'

import ThMobileHeader from '@/components/feature/ThMobileHeader'
import ThSimpleMenu from '@/components/feature/ThSimpleMenu'
import { useScreenSize } from '@/context/MediaQuery'

interface LayoutProps {
  children: ReactNode
}

const Defaultlayout: React.FC<LayoutProps> = ({ children }) => {
  const { isSmallScreen } = useScreenSize()

  return (
    <>
      <div>
        <ThSimpleMenu />

        {isSmallScreen && <ThMobileHeader />}

        <main className="tw-grow">{children}</main>
      </div>
    </>
  )
}

export default Defaultlayout
