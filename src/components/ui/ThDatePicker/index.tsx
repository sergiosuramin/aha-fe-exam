import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import dayjs, { Dayjs } from 'dayjs'

import ThTextfield from '@/components/ui/ThTextField'

/**
 * We will use a text field and static date picker for this component
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
}

export default function ThDatePicker({
  name,
  label,
  value,
  isFocused,
  disableFuture = false,
  disablePast = false,
  onDateChange,
  onFocus, // onBlur,
}: DatePickerProps) {
  return (
    <div className="tw-relative">
      <ThTextfield
        isMuiDefault
        name={name}
        label={label}
        placeholder={label}
        value={value}
        onChange={() => {}} // handle the change event from datepicker
        isFocused={isFocused}
        onFocus={onFocus}
        // onBlur={onBlur}
      />

      {isFocused && (
        <div className="tw-absolute tw-mt-2 tw-z-30 tw-left-0 tw-right-0 tw-rounded-xl tw-shadow-invert-xl tw-bg-white">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              value={dayjs(value)}
              showDaysOutsideCurrentMonth
              disableFuture={disableFuture}
              disablePast={disablePast}
              onAccept={(newValue) => {
                onDateChange(name, newValue) // handle on date change onAccept Click
              }}
            />
          </LocalizationProvider>
        </div>
      )}
    </div>
  )
}

// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import { DatePicker } from '@mui/x-date-pickers/DatePicker'
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// import dayjs, { Dayjs } from 'dayjs'

// interface DatePickerProps {
//   label: string
//   name: string
//   value: string
//   onDateChange: (name: string, newValue: Dayjs | null) => void
// }

// export default function ThDatePicker({
//   label,
//   name,
//   value,
//   onDateChange,
// }: DatePickerProps) {
//   // const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DatePicker
//         label={label}
//         value={dayjs(value)}
//         onChange={(newValue) => onDateChange(name, newValue)}
//       />
//     </LocalizationProvider>
//   )
// }
