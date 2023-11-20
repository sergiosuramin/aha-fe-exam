import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

const Defaultlayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="tw-flex tw-flex-col tw-min-h-screen">
      {/* <PfHeader /> */}
      <main
        className="tw-grow tw-px-8 md:tw-px-0"
      >
        {children}
      </main>
      {/* <PfFooter /> */}
    </div>
  )
}

export default Defaultlayout
