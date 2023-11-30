import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import { useState, ReactNode } from 'react'

import ThImageLoader from '@/components/ui/ThImageLoader'
import { PASSWORD_STRENGTH } from '@/utils/constants'
import { checkPasswordStrength } from '@/utils/functions'

interface PasswordStrength {
  [key: string]: boolean
}

interface ThTextfieldProps {
  label: string
  defaultValue?: string
  disabled?: boolean
  password?: boolean
  multiline?: boolean
  isFocused?: boolean
  placeholder?: string
  name: string
  value: string | number
  helperText?: string
  error?: boolean
  startAdornment?: ReactNode
  endAdornment?: ReactNode
  variant?: 'filled' | 'outlined' | 'standard'
  disableUnderline?: boolean
  className?: string
  isMuiDefault?: boolean
  onFocus?: (name: string) => void
  onBlur?: (name: string) => void
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void // Fix the function type
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  // onBlur?: () => void
}

function ThTextfield({
  label,
  placeholder,
  name,
  value,
  helperText,
  error = false,
  password = false,
  defaultValue,
  disabled = false,
  multiline = false,
  isFocused = false,
  startAdornment,
  endAdornment,
  onChange,
  onKeyDown = () => {},
  onFocus = () => {},
  onBlur = () => {},
  variant = 'outlined',
  disableUnderline = false,
  className = '',
  isMuiDefault = false,
  // onBlur,
  ...rest
}: ThTextfieldProps) {
  const [hidePassword, setHidePassword] = useState<boolean>(password)

  const handleClickHidePassword = () => setHidePassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const countMultiline = () => {
    if (multiline) return 4
    else return 1
  }

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event)
  }

  const getEndAdornment = () => {
    if (password) {
      return (
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickHidePassword}
          onMouseDown={handleMouseDownPassword}
          edge="end"
        >
          {hidePassword ? (
            <Visibility className="tw-text-white" />
          ) : (
            <VisibilityOff className="tw-text-white" />
          )}
        </IconButton>
      )
    } else {
      return endAdornment
    }
  }

  // to handle disable underline in contained textfield. Don't define it implicitly in the InputProps
  const isDisableUnderline = variant !== 'outlined' && disableUnderline
  const additionalInputProps = isDisableUnderline ? { disableUnderline } : null
  const passwordStrength: PasswordStrength = password
    ? checkPasswordStrength(value as string)
    : {}
  return (
    <div>
      {label && !isMuiDefault && (
        <div>
          <Typography variant="labelBig" className="tw-text-white tw-uppercase">
            {label}
          </Typography>
        </div>
      )}

      <TextField
        fullWidth
        className={className}
        variant={variant}
        // type={type}
        type={hidePassword ? 'password' : 'text'}
        label={label}
        name={name}
        value={value}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
        helperText={helperText}
        error={error}
        multiline={multiline}
        rows={countMultiline()}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onHandleChange(event)
        }}
        // onBlur={onBlur}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">{startAdornment}</InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">{getEndAdornment()}</InputAdornment>
          ),
          ...additionalInputProps,
        }}
        onKeyDown={onKeyDown}
        onFocus={() => onFocus(name)}
        onBlur={() => onBlur(name)}
        {...rest}
      />

      {/* render this to let user know their password condition */}
      {isFocused && password && (
        <div className="tw-rounded-xl tw-shadow-xl tw-bg-black-400 tw-p-2 tw-mt-4">
          {PASSWORD_STRENGTH.map((rule, index) => {
            const strength = passwordStrength[rule.key] ?? false
            return (
              <div
                key={`password-rule-${index + 1}`}
                className="tw-flex tw-gap-x-5 tw-items-center tw-my-3"
              >
                <div className="tw-w-[20px] tw-h-[20px]">
                  <ThImageLoader
                    alt="check-ic"
                    width={20}
                    height={20}
                    src={strength ? rule.icon_on : rule.icon_off}
                  />
                </div>

                <Typography variant="subtitle2Reg">{rule.title}</Typography>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ThTextfield
