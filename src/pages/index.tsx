import { Typography } from '@mui/material'
import { useState } from 'react'

import ThTextfield from '@/components/ui/ThTextField'

interface StateProps {
  keyword: string | ''
  limit?: number | 0
}

export default function HomePage() {
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

  return (
    <div className="tw-max-w-[725px] tw-mx-auto tw-p-8 md:tw-pl-[80px]">
      <section>
        <Typography variant="subtitle1Reg">Search</Typography>

        <ThTextfield
          className="!tw-mt-8"
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
        <Typography variant="h3" className="!tw-mb-8">
          # of results per page
        </Typography>

        <Typography variant="h1">{queryState.limit} Results</Typography>
      </section>
    </div>
  )
}
