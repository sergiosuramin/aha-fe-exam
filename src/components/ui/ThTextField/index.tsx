import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import { SxProps } from '@mui/system'
import { useState, ReactNode } from 'react'

interface ThTextfieldProps {
  label: string
  defaultValue?: string
  disabled?: boolean
  password?: boolean
  multiline?: boolean
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
  sx?: SxProps
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
  startAdornment,
  endAdornment,
  onChange,
  onKeyDown = () => {},
  variant = 'outlined',
  disableUnderline = false,
  className = '',
  // onBlur,
  ...rest
}: ThTextfieldProps) {
  const [hidePassword, setHidePassword] = useState(password)

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
          {hidePassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      )
    } else {
      return endAdornment
    }
  }

  // to handle disable underline in searchbar. Don't define it implicitly in the InputProps
  const isDisableUnderline = variant !== 'outlined' && disableUnderline
  const additionalInputProps = isDisableUnderline ? { disableUnderline } : null

  return (
    <div>
      {label && (
        <div>
          <Typography
            variant="labelBig"
            className="!tw-text-white !tw-uppercase"
          >
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
        // label={label}
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
        {...rest}
      />
    </div>
  )
}

export default ThTextfield
