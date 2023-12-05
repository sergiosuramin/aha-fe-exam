import { Box, Typography } from '@mui/material'
import { DatePicker, DatePickerToolbarProps } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs, { Dayjs } from 'dayjs'
import { useState } from 'react'

import { useScreenSize } from '@/context/MediaQuery'
import { checkDateValidity } from '@/utils/functions'

type DatePickerActions = 'clear' | 'today'

interface DatePickerProps {
  name: string
  label: string
  value: string
  onDateChange: (name: string, newValue: Dayjs | null) => void
  toolbarLabel?: string
  orientation?: 'portrait' | 'landscape'
  disableFuture?: boolean
  disablePast?: boolean
  className?: string
  helperText?: string
  disabled?: boolean
  isFieldReadOnly?: boolean
  moreActions?: DatePickerActions[]
}

export default function ThDatePicker({
  name,
  label,
  value,
  onDateChange,
  toolbarLabel = 'Select Date',
  orientation = 'portrait',
  disableFuture = false,
  disablePast = false,
  className = '',
  helperText = '',
  disabled = false,
  isFieldReadOnly = false,
  moreActions = [],
}: DatePickerProps) {
  const { isSmallScreen } = useScreenSize()
  const [open, setOpen] = useState<boolean>(false)
  /** force portrait orientation on mobile for straightforward experience */
  const pickerOrientation = isSmallScreen ? 'portrait' : orientation

  const handleSetOpen = () => {
    setOpen(!open)
  }

  // DatePickerToolbar
  const CustomToolbar = (props: DatePickerToolbarProps<Dayjs>) => {
    const { className, value } = props
    const isLandscape = orientation === 'landscape'

    const renderToolbarValue = () => {
      const isDateValid = checkDateValidity(dayjs(value))
      if (!value || !isDateValid) return '-- --'
      else {
        return dayjs(value).format('MMM DD, YYYY')
      }
    }

    return (
      <Box
        // Pass the className to the root element to get correct layout
        className={`tw-mx-6 tw-pt-4 ${className}`}
      >
        <div className="tw-flex tw-flex-col tw-h-[100%]">
          <Typography variant="subtitle1Reg" className="tw-mb-3">
            {toolbarLabel}
          </Typography>

          <div className={isLandscape ? 'tw-my-auto' : ''}>
            <Typography variant="display2">{renderToolbarValue()}</Typography>
          </div>
        </div>
      </Box>
    )
  }

  return (
    <div className="tw-w-full">
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-au">
        <DatePicker
          className={`tw-w-[100%] ${className}`}
          label={label}
          value={value ? dayjs(value) : null}
          slots={{
            toolbar: CustomToolbar,
          }}
          slotProps={{
            actionBar: {
              actions: [...moreActions, 'cancel', 'accept'],
            },
            textField: {
              helperText: helperText,
            },
            field: {
              readOnly: isFieldReadOnly,
            },
          }}
          showDaysOutsideCurrentMonth
          disableFuture={disableFuture}
          disablePast={disablePast}
          orientation={pickerOrientation}
          onChange={(newValue) => {
            onDateChange(name, newValue) // to accomodate change from keyboard input
          }}
          onAccept={(newValue) => {
            onDateChange(name, newValue) // handle on date change onAccept Click
            handleSetOpen()
          }}
          open={open}
          onOpen={() => handleSetOpen()}
          onClose={() => handleSetOpen()}
          closeOnSelect={false} // keep the datepicker open until user interacts with actions
          disabled={disabled}
        />
      </LocalizationProvider>
    </div>
  )
}
