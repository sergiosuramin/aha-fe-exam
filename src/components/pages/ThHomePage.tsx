import { Typography } from '@mui/material'
import { useState } from 'react'

import ThSlider from '@/components/ui/ThSlider'
import ThTextfield from '@/components/ui/ThTextField'

import ThButton from '../ui/ThButton'

interface StateProps {
  keyword: string | ''
  limit?: number | number[] | 0
}

export default function ThHomePage() {
  const [queryState, setState] = useState<StateProps>({
    keyword: '',
    limit: 10, // default limit
  })

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const onSliderChange = (value: number | number[]) => {
    setState((prev) => ({
      ...prev,
      limit: value,
    }))
  }

  return (
    <>
      <section>
        <Typography variant="h1">Search</Typography>

        <ThTextfield
          className="!tw-mt-6"
          label=""
          placeholder="Keyword"
          name="keyword"
          value={queryState.keyword}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onChange(event)
          }
        />
      </section>

      <div className="tw-border tw-border-gray-50/10 tw-my-12" />

      <section>
        <Typography variant="h1" className="!tw-mb-4">
          # of results per page
        </Typography>

        <Typography variant="display1" className="!tw-font-bold">
          {queryState.limit}{' '}
          <Typography variant="subtitle1Reg">Results</Typography>
        </Typography>

        <ThSlider value={queryState.limit ?? 0} onChange={onSliderChange} />
      </section>

      <div className="tw-border tw-border-gray-50/10 tw-my-12" />

      <section className="tw-mt-auto">
        <ThButton variant="primary" className="md:!tw-max-w-[343px]">
          SEARCH
        </ThButton>
      </section>
    </>
  )
}
