import { ReactNode } from 'react'

import ThMobileHeader from '@/components/feature/ThMobileHeader'
import ThSimpleMenu from '@/components/feature/ThSimpleMenu'
import ThFriendlistTabsLayout from '@/components/layout/ThFriendlistTabsLayout'
import { useScreenSize } from '@/context/MediaQuery'

interface LayoutProps {
  children: ReactNode
}

const WithFriendLayout: React.FC<LayoutProps> = ({ children }) => {
  const { isSmallScreen } = useScreenSize()

  return (
    <>
      <main>
        <ThSimpleMenu />

        {isSmallScreen && <ThMobileHeader />}

        <div>{children}</div>

        <ThFriendlistTabsLayout />
      </main>
    </>
  )
}

export default WithFriendLayout
