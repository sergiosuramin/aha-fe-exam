import { MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs, { Dayjs } from 'dayjs'

import { useScreenSize } from '@/context/MediaQuery'
import 'dayjs/locale/en-au'

interface DatePickerProps {
  name: string
  label: string
  value: string
  disableFuture?: boolean
  disablePast?: boolean
  orientation?: 'portrait' | 'landscape'
  onDateChange: (name: string, newValue: Dayjs | null) => void
  className?: string
}

export default function ThDatePickerMobile({
  name,
  label,
  value,
  disableFuture = false,
  disablePast = false,
  orientation = 'portrait',
  onDateChange,
  className = '',
}: DatePickerProps) {
  const { isSmallScreen } = useScreenSize()
  /** force portrait orientation on mobile for straightforward experience */
  const pickerOrientation = isSmallScreen ? 'portrait' : orientation

  return (
    <div className="tw-w-full">
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-au">
        <MobileDatePicker
          className={`tw-w-[100%] ${className}`}
          label={label}
          value={value ? dayjs(value) : null}
          showDaysOutsideCurrentMonth
          disableFuture={disableFuture}
          disablePast={disablePast}
          orientation={pickerOrientation}
          onAccept={(newValue) => {
            onDateChange(name, newValue) // handle on date change onAccept Click
          }}
        />
      </LocalizationProvider>
    </div>
  )
}
