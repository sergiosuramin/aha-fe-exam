import { Container } from '@mui/material'
import { ReactNode } from 'react'

interface ThContainerProps {
  children: ReactNode
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false
  className?: string
}

function ThContainer({
  children,
  maxWidth = 'lg',
  className = '',
}: ThContainerProps) {
  return (
    <Container maxWidth={maxWidth} className={`${className}`}>
      {children}
    </Container>
  )
}

export default ThContainer
