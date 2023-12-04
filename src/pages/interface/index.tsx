import { Typography } from '@mui/material'

import ThDatepickerFormDemo from '@/components/form/ThDatepickerDemo'
import ThTextfieldFormDemo from '@/components/form/ThTextfieldDemo'

const InterfacePage = () => {
  return (
    <>
      <div className="md:tw-pl-16">
        <div className="tw-container tw-mx-auto tw-pb-16 tw-pt-4 tw-px-6 md:tw-px-[88px] md:tw-py-[84px] tw-max-w-7xl">
          <Typography variant="display2" className="tw-mb-8 tw-pl-3">
            UI/UX Components Demo
          </Typography>

          <div className="tw-grid lg:tw-grid-cols-2 tw-gap-6 tw-rounded-xl tw-rounded-white-500 tw-p-4">
            <div>
              <ThDatepickerFormDemo />
            </div>

            <div>
              <ThTextfieldFormDemo />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default InterfacePage
