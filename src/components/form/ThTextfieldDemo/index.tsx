import { Typography } from '@mui/material'
import { useState } from 'react'

import ThFormLayout from '@/components/layout/ThFormLayout'
import ThButton from '@/components/ui/ThButton'
import ThDialog from '@/components/ui/ThDialog'
import ThPhoneCodeMenu from '@/components/ui/ThPhoneCode'
import ThTextfield from '@/components/ui/ThTextField'
import { CheckIsNumeric, checkPasswordStrength } from '@/utils/functions'

/**
 * Since this page is made for demo,
 * 1. No Formik / RHF / other form library used here
 * 2. No Zod / Yup used here
 * 3. 100% pure FE handling
 */
interface FormProps {
  name: string
  description: string
  withHelper: string
  withError: string
  amount: string
  countryCode: string
  phoneNumber: string
  experience: string
  password: string
}

interface FocusProps {
  password: boolean
}

const ThTextfieldFormDemo = () => {
  const [isFocused, setIsFocused] = useState<FocusProps>({
    password: false,
  })
  const [formState, setFormState] = useState<FormProps>({
    name: '',
    description: '',
    withHelper: '',
    withError: '',
    amount: '',
    countryCode: '+62',
    phoneNumber: '',
    experience: '',
    password: '',
  })
  const [open, setOpen] = useState<boolean>(false)

  const onResetForm = () => {
    setFormState({
      name: '',
      description: '',
      withHelper: '',
      withError: '',
      amount: '',
      countryCode: '+62',
      phoneNumber: '',
      experience: '',
      password: '',
    })

    setOpen(false)
  }

  const onOpenChange = () => {
    setOpen(!open)
  }

  const onFocusChange = (name: string) => {
    setIsFocused((prev) => ({
      ...prev,
      [name]: true,
    }))
  }

  const onBlurChange = (name: string) => {
    setIsFocused((prev) => ({
      ...prev,
      [name]: false,
    }))
  }

  const onFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    if (name === 'amount' || name === 'phoneNumber' || name === 'experience') {
      if (value === '') {
        // accept empty value
        setFormState((prev) => ({ ...prev, [name]: value }))
      } else {
        // check is numeric if value exists
        const isNumeric = CheckIsNumeric(value)

        if (isNumeric) {
          setFormState((prev) => ({ ...prev, [name]: value }))
        }
      }
    } else {
      // For other fields, update the state directly
      setFormState((prev) => ({ ...prev, [name]: value }))
    }
  }

  const onCountryCodeChange = (value: string) => {
    setFormState((prev) => ({
      ...prev,
      countryCode: value,
    }))
  }

  const submitButtonEligibility = () => {
    const { isStrongPassword } = checkPasswordStrength(formState.password)

    if (!isStrongPassword) return true
    else return false
  }

  const onSubmit = () => {
    onOpenChange()
  }

  const dialogActionButton = () => {
    return (
      <>
        <ThButton onClick={() => onResetForm()} className="tw-max-w-[100px]">
          Clear
        </ThButton>

        <ThButton onClick={() => onOpenChange()} className="tw-max-w-[100px]">
          Save
        </ThButton>
      </>
    )
  }

  return (
    <>
      <ThFormLayout>
        <Typography variant="h3" className="tw-font-bold">
          Text Field
        </Typography>

        <div>
          <Typography variant="subtitle1Reg">Default</Typography>
          <ThTextfield
            className="tw-mt-3"
            isMuiDefault
            name="name"
            label="Name"
            placeholder="Name"
            value={formState.name}
            onChange={onFormChange}
          />
        </div>

        <div>
          <Typography variant="subtitle1Reg">Multiline</Typography>
          <ThTextfield
            className="tw-mt-3"
            isMuiDefault
            name="description"
            label="Description"
            placeholder="Description"
            value={formState.description}
            onChange={onFormChange}
            multiline
          />
        </div>

        <div>
          <Typography variant="subtitle1Reg">With Helper</Typography>
          <ThTextfield
            className="tw-mt-3"
            isMuiDefault
            name="withHelper"
            label="Helper"
            placeholder="Helper"
            value={formState.withHelper}
            onChange={onFormChange}
            helperText="Textfield with helper text"
          />
        </div>

        <div>
          <Typography variant="subtitle1Reg">With Error</Typography>
          <ThTextfield
            className="tw-mt-3"
            isMuiDefault
            name="withError"
            label="Error"
            placeholder="Error"
            value={formState.withError}
            onChange={onFormChange}
            helperText="Textfield with error text"
            error
          />
        </div>

        <Typography variant="h3" className="tw-font-bold tw-mt-6">
          With Start Adornment
        </Typography>

        <div>
          <Typography variant="subtitle1Reg">Currency: number only</Typography>
          <ThTextfield
            className="tw-mt-3"
            isMuiDefault
            name="amount"
            label="Amount"
            placeholder="Amount"
            value={formState.amount}
            onChange={onFormChange}
            startAdornment={<div>$</div>}
          />
        </div>

        <div>
          <Typography variant="subtitle1Reg">Interactive</Typography>
          <ThTextfield
            className="tw-mt-3"
            isMuiDefault
            name="phoneNumber"
            label="Phone Number"
            placeholder="Phone Number"
            value={formState.phoneNumber}
            onChange={onFormChange}
            startAdornment={
              <ThPhoneCodeMenu
                value={formState.countryCode}
                onChange={onCountryCodeChange}
              />
            }
          />
        </div>

        <Typography variant="h3" className="tw-font-bold tw-mt-6">
          With End Adornment
        </Typography>

        <div>
          <Typography variant="subtitle1Reg">Year: number only</Typography>
          <ThTextfield
            className="tw-mt-3"
            isMuiDefault
            name="experience"
            label="Experience"
            placeholder="Experience"
            value={formState.experience}
            onChange={onFormChange}
            endAdornment={<div>Year</div>}
          />
        </div>

        <div>
          <Typography variant="subtitle1Reg">
            Interactive (With Validation)
          </Typography>
          <ThTextfield
            className="tw-mt-3"
            isMuiDefault
            name="password"
            label="Password *"
            placeholder="Password *"
            password
            value={formState.password}
            onChange={onFormChange}
            isFocused={isFocused.password}
            onFocus={onFocusChange}
            onBlur={onBlurChange}
          />
        </div>

        <ThButton
          variant="secondary"
          disabled={submitButtonEligibility()}
          onClick={() => onSubmit()}
          className="tw-w-[80px] tw-mt-4"
        >
          Submit
        </ThButton>
      </ThFormLayout>

      <ThDialog
        open={open}
        handleClose={onOpenChange}
        isCenter
        title="Form Submission"
        actionNode={dialogActionButton()}
      >
        <div>
          <ThFormLayout>
            <Typography variant="subtitle2">
              Name: {!!formState.name ? `${formState.name}` : '-'}
            </Typography>

            <Typography variant="subtitle2">
              Description:{' '}
              {!!formState.description ? `${formState.description}` : '-'}
            </Typography>

            <Typography variant="subtitle2">
              amount: {!!formState.amount ? `$${formState.amount}` : '-'}
            </Typography>

            <Typography variant="subtitle2">
              Phone Number:{' '}
              {!!formState.phoneNumber
                ? `${formState.countryCode}-${formState.phoneNumber}`
                : '-'}
            </Typography>

            <Typography variant="subtitle2">
              Experience:{' '}
              {!!formState.experience
                ? `${formState.experience} ${
                    Number(formState.experience) > 1 ? 'Years' : 'Year'
                  }`
                : '-'}
            </Typography>

            <Typography variant="subtitle2">
              Password: {formState.password ?? '-'}
            </Typography>
          </ThFormLayout>
        </div>
      </ThDialog>
    </>
  )
}

export default ThTextfieldFormDemo
