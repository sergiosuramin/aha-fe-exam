import { Button } from '@mui/material'
import { ReactNode } from 'react'

type ThButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outlined'
  | 'contained'
  | 'text'

interface ThButtonProps {
  children: ReactNode
  startIcon?: ReactNode
  endIcon?: ReactNode
  disabled?: boolean
  variant?: ThButtonVariant
  className?: string
  type?: 'submit' | 'button'
  onClick?: () => void
}

function ThButton({
  children,
  startIcon,
  endIcon,
  disabled = false,
  variant = 'primary',
  className = '',
  type = 'button',
  onClick = () => {},
}: ThButtonProps) {
  return (
    <Button
      type={type}
      variant={variant}
      className={className}
      onClick={() => onClick()}
      startIcon={startIcon}
      endIcon={endIcon}
      disabled={disabled}
    >
      {children}
    </Button>
  )
}

export default ThButton
