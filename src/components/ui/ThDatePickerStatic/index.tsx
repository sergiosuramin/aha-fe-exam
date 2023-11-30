import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/en-au'

import ThTextfield from '@/components/ui/ThTextField'

/**
 * We are using a text field and static date picker for this component
 * limit of static date picker:
 * 1. onAccept wont be triggered if the newValue match the prevValue, hence
 * 2. the picker won't close when trying to accept the value.
 * 3. So i added a temporary workaround on onClose props for when cancelling the date selection.(temporary
 * because it is marked as deprecated).
 * 4. Declaring an additional state to handle the case won't make any sense either.
 * 5. Suggestion: using Mobile Variant Date Picker is the most feasible approach.
 *  note: Static Date Picker is simply wasn't meant to be implemented like this.
 */

interface DatePickerProps {
  name: string
  label: string
  value: string
  isFocused: boolean
  disableFuture?: boolean
  disablePast?: boolean
  onDateChange: (name: string, newValue: Dayjs | null) => void
  onFocus?: (name: string) => void
  onBlur?: (name: string) => void
  className?: string
}

export default function ThDatePickerStatic({
  name,
  label,
  value,
  isFocused,
  disableFuture = false,
  disablePast = false,
  onDateChange,
  onFocus,
  onBlur,
  className = '',
}: DatePickerProps) {
  return (
    <div className={`tw-relative ${className}`}>
      <ThTextfield
        isMuiDefault
        name={name}
        label={label}
        placeholder={label}
        value={value}
        onChange={() => {}} // handle the change event from datepicker
        isFocused={isFocused}
        onFocus={onFocus}
      />

      {isFocused && (
        <div className="tw-absolute tw-mt-2 tw-z-30 tw-left-0 tw-right-0 tw-rounded-xl tw-shadow-invert-xl tw-bg-white">
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="en-au"
          >
            <StaticDatePicker
              value={dayjs(value)}
              showDaysOutsideCurrentMonth
              disableFuture={disableFuture}
              disablePast={disablePast}
              orientation="portrait"
              onAccept={(newValue) => {
                onDateChange(name, newValue) // handle on date change onAccept Click
              }}
              onClose={() => onBlur && onBlur(name)}
            />
          </LocalizationProvider>
        </div>
      )}
    </div>
  )
}
