import { Typography } from '@mui/material'

import ThTagsPage from '@/components/pages/ThTagsPage'

export default function TagsPage() {
  return (
    <div className="tw-container md:tw-h-screen xl:tw-max-w-max tw-mx-auto tw-grow tw-pb-16 tw-px-8 md:tw-p-16">
      <div className="tw-mb-4">
        <Typography variant="h1">Tags</Typography>
      </div>
      <ThTagsPage />
    </div>
  )

  // return (
  //   <div className="tw-flex">
  //     {/* <div className="md:tw-w-[625px] lg:tw-w-[825px] md:tw-h-screen md:tw-mx-auto tw-p-8"> */}
  //     <div className="tw-container md:tw-h-screen xl:tw-max-w-7xl tw-mx-auto tw-grow tw-pb-16 tw-px-8 md:tw-p-16">
  //       <ThHomePage />
  //     </div>

  //     <div className="tw-bg-white tw-hidden xl:tw-block tw-w-[375px]">hehe</div>
  //   </div>
  // )
}
