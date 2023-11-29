import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import { ReactNode } from 'react'

interface CustomDialogProps {
  open: boolean
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  fullWidth?: boolean
  fullScreen?: boolean
  handleClose?: () => void
  children: ReactNode
  title?: string
  actionNode?: ReactNode
  isCenter?: boolean
}

function ThDialog({
  maxWidth = 'sm',
  open = false,
  fullWidth = true,
  fullScreen = false,
  handleClose,
  children,
  title,
  actionNode,
  isCenter = false,
}: CustomDialogProps) {
  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={open}
      onClose={handleClose}
    >
      {title && (
        <DialogTitle className="!tw-text-center !tw-font-bold">
          {title}
        </DialogTitle>
      )}
      <DialogContent
        className={`!tw-py-2 ${isCenter && '!tw-flex tw-mx-auto'}`}
      >
        {children}
      </DialogContent>
      {actionNode && <DialogActions className="">{actionNode}</DialogActions>}
    </Dialog>
  )
}

export default ThDialog
