import { Typography } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import { useState } from 'react'

import ThFormLayout from '@/components/layout/ThFormLayout'
import ThButton from '@/components/ui/ThButton'
import ThDatePicker from '@/components/ui/ThDatePicker'
import ThDialog from '@/components/ui/ThDialog'
import ThTextfield from '@/components/ui/ThTextField'
import { checkPasswordStrength } from '@/utils/functions'

/**
 * Since this page is made for demo,
 * 1. No Formik / RHF / other form library used here
 * 2. No Zod / Yup used here
 * 3. 100% pure FE handling
 */
interface FormProps {
  birthday: string
  password: string
}

interface FocusProps {
  birthday: boolean
  password: boolean
}

const InterfacePage = () => {
  const [isFocused, setIsFocused] = useState<FocusProps>({
    birthday: false,
    password: false,
  }) // used for demo only
  const [formState, setFormState] = useState<FormProps>({
    birthday: '',
    password: '',
  })
  const [open, setOpen] = useState<boolean>(false)

  const onResetForm = () => {
    setFormState({
      birthday: '',
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

    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const onDateChange = (name: string, value: Dayjs | null) => {
    setFormState((prev) => ({
      ...prev,
      [name]: dayjs(value).format('DD MMM YYYY'),
    }))

    onBlurChange(name)
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
        <ThButton onClick={() => onResetForm()} className="!tw-max-w-[100px]">
          Clear
        </ThButton>

        <ThButton onClick={() => onOpenChange()} className="!tw-max-w-[100px]">
          Save
        </ThButton>
      </>
    )
  }

  return (
    <>
      <div className="md:tw-pl-16">
        <div className="tw-container tw-mx-auto tw-pb-16 tw-pt-4 tw-px-6 md:tw-px-[88px] md:tw-py-[84px] tw-max-w-[512px]">
          <ThFormLayout>
            <Typography variant="h3">UI/UX Demo</Typography>

            <ThDatePicker
              label="Birthday"
              name="birthday"
              value={formState.birthday}
              isFocused={isFocused.birthday}
              onDateChange={onDateChange}
              onFocus={onFocusChange}
              onBlur={onBlurChange}
              disableFuture // because this is birthday picker
            />

            <ThTextfield
              isMuiDefault
              name="password"
              label="Password"
              placeholder="Password"
              password
              value={formState.password}
              onChange={onFormChange}
              isFocused={isFocused.password}
              onFocus={onFocusChange}
              onBlur={onBlurChange}
            />

            <ThButton
              variant="secondary"
              disabled={submitButtonEligibility()}
              onClick={() => onSubmit()}
            >
              Submit
            </ThButton>
          </ThFormLayout>
        </div>
      </div>

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
              Birthday: {formState.birthday}
            </Typography>

            <Typography variant="subtitle2">
              Password: {formState.password}
            </Typography>
          </ThFormLayout>
        </div>
      </ThDialog>
    </>
  )
}

export default InterfacePage
