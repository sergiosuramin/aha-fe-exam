import BlockIcon from '@mui/icons-material/Block'
import { Badge } from '@mui/material'
import {
  MobileDatePicker,
  PickersDay,
  PickersDayProps,
} from '@mui/x-date-pickers'
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
  shouldDisableDate?: (date: Dayjs) => boolean
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
  shouldDisableDate = () => false,
  className = '',
}: DatePickerProps) {
  const { isSmallScreen } = useScreenSize()
  /** force portrait orientation on mobile for straightforward experience */
  const pickerOrientation = isSmallScreen ? 'portrait' : orientation

  const CustomPickersDay = (props: PickersDayProps<Dayjs>) => {
    const { day, disabled } = props
    const isDayDisabled = disabled ?? false

    return (
      <Badge
        key={day.toString()}
        overlap="circular"
        badgeContent={
          isDayDisabled ? (
            <BlockIcon className="tw-text-danger-500 tw-w-2.5 tw-h-2.5" />
          ) : undefined
        }
      >
        <PickersDay {...props} />
      </Badge>
    )
  }

  return (
    <div className="tw-w-full">
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-au">
        <MobileDatePicker
          className={`tw-w-[100%] ${className}`}
          slots={{
            day: CustomPickersDay,
          }}
          label={label}
          value={value ? dayjs(value) : null}
          showDaysOutsideCurrentMonth
          disableFuture={disableFuture}
          disablePast={disablePast}
          shouldDisableDate={shouldDisableDate}
          orientation={pickerOrientation}
          onAccept={(newValue) => {
            onDateChange(name, newValue) // handle on date change onAccept Click
          }}
        />
      </LocalizationProvider>
    </div>
  )
}
