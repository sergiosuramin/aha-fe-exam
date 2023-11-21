import { ReactNode } from 'react'

import ThSimpleMenu from '@/components/layout/ThSimpleMenu'

interface LayoutProps {
  children: ReactNode
}

const Defaultlayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <ThSimpleMenu />
      <main className="tw-min-h-screen tw-w-[100%]">{children}</main>
    </>
  )
}

export default Defaultlayout
