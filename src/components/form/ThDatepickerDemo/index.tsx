import { Typography } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import { useState } from 'react'

import ThFormLayout from '@/components/layout/ThFormLayout'
import ThButton from '@/components/ui/ThButton'
import ThDatePickerMobile from '@/components/ui/ThDatePickerMobile'
import ThDatePickerStatic from '@/components/ui/ThDatePickerStatic'
import ThDialog from '@/components/ui/ThDialog'

/**
 * Since this page is made for demo,
 * 1. No Formik / RHF / other form library used here
 * 2. No Zod / Yup used here
 * 3. 100% pure FE handling
 */
interface FormProps {
  birthday: string
  graduateDate: string
  marriageDate: string
}

interface FocusProps {
  birthday: boolean
}

const ThDatepickerFormDemo = () => {
  const [isFocused, setIsFocused] = useState<FocusProps>({
    birthday: false,
  })
  const [formState, setFormState] = useState<FormProps>({
    birthday: '',
    graduateDate: '',
    marriageDate: '',
  })
  const [open, setOpen] = useState<boolean>(false)

  const onResetForm = () => {
    setFormState({
      birthday: '',
      graduateDate: '',
      marriageDate: '',
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

  const onDateChange = (name: string, value: Dayjs | null) => {
    setFormState((prev) => ({
      ...prev,
      [name]: dayjs(value).format('DD MMM YYYY'),
    }))

    onBlurChange(name)
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
          DatePicker
        </Typography>

        <div>
          <Typography variant="subtitle1Reg">
            Static Date Picker With Textfield
          </Typography>

          <ThDatePickerStatic
            className="tw-mt-4"
            label="Birthday"
            name="birthday"
            value={formState.birthday}
            isFocused={isFocused.birthday}
            onDateChange={onDateChange}
            onFocus={onFocusChange}
            onBlur={onBlurChange}
            disableFuture // because this is birthday picker
          />
        </div>

        <div>
          <Typography variant="subtitle1Reg">
            Mobile Date Picker - Portrait
          </Typography>

          <ThDatePickerMobile
            className="tw-mt-4"
            label="Graduate"
            name="graduateDate"
            value={formState.graduateDate}
            onDateChange={onDateChange}
          />
        </div>

        <div>
          <Typography variant="subtitle1Reg">
            Mobile Date Picker - Landscape
          </Typography>

          <ThDatePickerMobile
            className="tw-mt-4"
            label="Marriage"
            name="marriageDate"
            orientation="landscape"
            value={formState.marriageDate}
            onDateChange={onDateChange}
          />
        </div>

        <ThButton
          variant="secondary"
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
              Birthday: {formState.birthday ?? '-'}
            </Typography>

            <Typography variant="subtitle2">
              Graduate: {formState.graduateDate ?? '-'}
            </Typography>

            <Typography variant="subtitle2">
              Marriage: {formState.marriageDate ?? '-'}
            </Typography>
          </ThFormLayout>
        </div>
      </ThDialog>
    </>
  )
}

export default ThDatepickerFormDemo