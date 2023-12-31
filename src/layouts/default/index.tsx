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
      <main>
        <ThSimpleMenu />

        {isSmallScreen && <ThMobileHeader />}

        <div className="tw-grow">{children}</div>
      </main>
    </>
  )
}

export default Defaultlayout
