import { Box, Modal } from '@mui/material'
import { ReactNode } from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: ReactNode
}

export default function ThModal({ children, open, onClose }: ModalProps) {
  return (
    <div>
      <Modal open={open} onClose={onClose} className="tw-border-none">
        <Box className="tw-absolute tw-top-[50%] tw-left-[50%] tw-transform tw-translate-x-[-50%] tw-translate-y-[-50%] tw-min-w-[300px] tw-min-h-[300px] tw-max-w-[768px] tw-border-black-300 tw-bg-black-300 tw-shadow-md tw-rounded-xl">
          <div className="tw-p-4">{children}</div>
        </Box>
      </Modal>
    </div>
  )
}
