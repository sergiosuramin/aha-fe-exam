import { Typography } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import { useState } from 'react'

import ThFormLayout from '@/components/layout/ThFormLayout'
import ThButton from '@/components/ui/ThButton'
import ThDatePicker from '@/components/ui/ThDatePicker'
import ThDatePickerMobile from '@/components/ui/ThDatePickerMobile'
import ThDialog from '@/components/ui/ThDialog'
import { checkBirthdayValidity, checkDateValidity } from '@/utils/functions'

/**
 * Since this page is made for demo,
 * 1. No Formik / RHF / other form library used here
 * 2. No Zod / Yup used here
 * 3. 100% pure FE handling
 */
interface FormProps {
  birthday: string
  default: string
  disableSunday: string
  disableSpecificDay: string
  examDate: string
  landscape: string
  graduateDate: string
  marriageDate: string
  readOnly: string
}

const ThDatepickerFormDemo = () => {
  const [formState, setFormState] = useState<FormProps>({
    birthday: '',
    default: '',
    disableSunday: '',
    disableSpecificDay: '',
    examDate: '',
    landscape: '',
    graduateDate: '',
    marriageDate: '',
    readOnly: '',
  })
  const [open, setOpen] = useState<boolean>(false)

  const onResetForm = () => {
    setFormState({
      birthday: '',
      default: '',
      disableSunday: '',
      disableSpecificDay: '',
      examDate: '',
      landscape: '',
      graduateDate: '',
      marriageDate: '',
      readOnly: '',
    })

    setOpen(false)
  }

  const onOpenChange = () => {
    setOpen(!open)
  }

  const onDateChange = (name: string, value: Dayjs | null) => {
    setFormState((prev) => ({
      ...prev,
      [name]: !!value ? dayjs(value).format('DD MMM YYYY') : '',
    }))
  }

  const handleDisableSunday = (date: Dayjs) => {
    // disable sunday
    return date.day() === 0
  }

  const handleDisableSpecificDay = (date: Dayjs) => {
    // disable specific array of dates
    const disabledDates = [
      '2023-12-07',
      '2023-12-25',
      '2023-12-31',
      '2024-01-01',
    ]

    return disabledDates.some((disabledDate) =>
      dayjs(disabledDate).isSame(date, 'day')
    )
  }

  const submitButtonEligibility = () => {
    const requiredFields: (keyof FormProps)[] = ['birthday', 'examDate']

    const isAllRequiredDateValid = requiredFields.every((fieldName) => {
      const value = formState[fieldName] as string // assert the value
      const isDateValid = checkDateValidity(dayjs(value))

      if (!value || !isDateValid) {
        return false // Return false if the value is falsy or not a valid date
      }

      if (fieldName === 'birthday') {
        // Additional check for 'birthday' field
        const isBirthdayValid = checkBirthdayValidity(dayjs(value)) // Check if birthday is today or in the past

        return isBirthdayValid
      }

      return true // For other fields, consider them valid
    })

    return !isAllRequiredDateValid
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

  const renderHelperText = (name: string, value: string | null) => {
    // general check: if empty
    if (!value) return ''

    const isDateValid = checkDateValidity(dayjs(value))
    // general check: if date is invalid
    if (!isDateValid) {
      return 'Date should be in DD/MM/YYYY format'
    }

    // check if birthday valid
    if (name === 'birthday') {
      const isBirthdayValid = checkBirthdayValidity(dayjs(value)) // Check if birthday is today or in the past
      if (!isBirthdayValid) return 'Birthday must not exceed today'
    }
  }

  return (
    <>
      <ThFormLayout>
        <Typography variant="h3" className="tw-font-bold">
          Date Picker (With Custom Toolbar)
        </Typography>

        <div>
          <Typography variant="subtitle1Reg">Default</Typography>

          <ThDatePicker
            className="tw-mt-3"
            label="Default"
            toolbarLabel="Select Date"
            name="default"
            value={formState.default}
            onDateChange={onDateChange}
            helperText={renderHelperText('default', formState.default)}
          />
        </div>

        <div>
          <Typography variant="subtitle1Reg">
            Birthday (Disable Future)
          </Typography>

          <ThDatePicker
            className="tw-mt-3"
            label="Birthday *"
            toolbarLabel="When is your birthday?"
            name="birthday"
            value={formState.birthday}
            onDateChange={onDateChange}
            disableFuture // because this is birthday picker
            helperText={renderHelperText('birthday', formState.birthday)}
          />
        </div>

        <div>
          <Typography variant="subtitle1Reg">With More Action</Typography>

          <ThDatePicker
            className="tw-mt-3"
            label="Final Exam *"
            toolbarLabel="Set your exam reminder"
            name="examDate"
            value={formState.examDate}
            onDateChange={onDateChange}
            moreActions={['clear', 'today']}
            helperText={renderHelperText('examDate', formState.examDate)}
          />
        </div>

        <div>
          <Typography variant="subtitle1Reg">Landscape (Responsive)</Typography>

          <ThDatePicker
            className="tw-mt-3"
            label="Landscape"
            toolbarLabel="Landscape datepicker"
            name="landscape"
            orientation="landscape"
            value={formState.landscape}
            onDateChange={onDateChange}
            moreActions={['clear', 'today']}
            helperText={renderHelperText('landscape', formState.landscape)}
          />
        </div>

        <div>
          <Typography variant="subtitle1Reg">
            Interact from calendar button, read-only textfield
          </Typography>

          <ThDatePicker
            className="tw-mt-3"
            label="Read Only"
            toolbarLabel="Hi There!"
            name="readOnly"
            value={formState.readOnly}
            onDateChange={onDateChange}
            isFieldReadOnly
          />
        </div>

        <div>
          <Typography variant="subtitle1Reg">Disable Specific Day</Typography>

          <ThDatePicker
            className="tw-mt-3"
            label="Read Only"
            toolbarLabel="We are closed on Sunday"
            name="disableSunday"
            value={formState.disableSunday}
            onDateChange={onDateChange}
            shouldDisableDate={handleDisableSunday}
          />
        </div>

        <div>
          <Typography variant="subtitle1Reg">Disable Specific Dates</Typography>

          <ThDatePicker
            className="tw-mt-3"
            label="Read Only"
            toolbarLabel="We are closed on Sunday"
            name="disableSunday"
            value={formState.disableSunday}
            onDateChange={onDateChange}
            shouldDisableDate={handleDisableSpecificDay}
          />
        </div>

        <Typography variant="h3" className="tw-font-bold tw-mt-6">
          Mobile Date Picker
        </Typography>

        <div>
          <Typography variant="subtitle1Reg">Default - Portrait</Typography>

          <ThDatePickerMobile
            className="tw-mt-3"
            label="Graduate"
            name="graduateDate"
            value={formState.graduateDate}
            onDateChange={onDateChange}
          />
        </div>

        <div>
          <Typography variant="subtitle1Reg">
            Default - Landscape (Responsive)
          </Typography>

          <ThDatePickerMobile
            className="tw-mt-3"
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
          disabled={submitButtonEligibility()}
          className="tw-w-[80px] tw-mt-4"
        >
          Submit
        </ThButton>
      </ThFormLayout>

      <Typography variant="labelSmall" className="tw-text-gray-300">
        Required fields: Birthday & Final Exam
      </Typography>

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
              Birthday: {!!formState.birthday ? formState.birthday : '-'}
            </Typography>

            <Typography variant="subtitle2">
              Exam: {!!formState.examDate ? formState.examDate : '-'}
            </Typography>

            <Typography variant="subtitle2">
              Graduate:{' '}
              {!!formState.graduateDate ? formState.graduateDate : '-'}
            </Typography>

            <Typography variant="subtitle2">
              Marriage:{' '}
              {!!formState.marriageDate ? formState.marriageDate : '-'}
            </Typography>
          </ThFormLayout>
        </div>
      </ThDialog>
    </>
  )
}

export default ThDatepickerFormDemo
