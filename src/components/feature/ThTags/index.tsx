import { Typography } from '@mui/material'

import { TagInterface } from '@/models'

interface TagsProps {
  tag: TagInterface
}

const ThTags = ({ tag }: TagsProps) => {
  return (
    <div>
      <div className="tw-flex tw-w-[150px] tw-h-[150px] tw-rounded-[10px] tw-bg-white-500/6 tw-p-2">
        <div className="tw-mt-auto tw-border-[4px] tw-rounded-[8px] tw-p-2 tw-max-w-[136px]">
          <Typography variant="h3" className="tw-font-bold tw-line-clamp-1">
            {tag.name ?? ''}
          </Typography>
        </div>
      </div>

      <div className="tw-mt-4 md:tw-mt-2 tw-flex tw-flex-col">
        <div className="tw-max-w-[136px]">
          <Typography variant="subtitle1Reg" className="tw-line-clamp-1">
            {tag.name ?? ''}
          </Typography>
        </div>
        <Typography variant="subtitle2Reg" className="tw-text-gray-300">
          {tag.count ?? ''} Questions
        </Typography>
      </div>
    </div>
  )
}

export default ThTags
