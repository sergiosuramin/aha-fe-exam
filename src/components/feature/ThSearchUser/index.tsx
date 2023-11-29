import { Typography } from '@mui/material'
import NextLink from 'next/link'
import { useEffect } from 'react'

import ThButton from '@/components/ui/ThButton'
import ThSlider from '@/components/ui/ThSlider'
import ThTextfield from '@/components/ui/ThTextField'
import { useQueryState } from '@/context/QueryFilter'

export default function ThSearchUser() {
  const { keyword, pageSize, setKeyword, setPageSize, resetQueries } =
    useQueryState()

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    setKeyword(value)
  }

  const onSliderChange = (value: number | number[]) => {
    setPageSize(typeof value === 'number' ? value : 10)
  }

  const didmount = () => {
    resetQueries()
  }

  useEffect(() => {
    didmount()
    // didmount only, safe to ignore
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <section>
        <Typography variant="h1" className="md:!tw-mt-1 tw-mb-4 md:!tw-mb-6">
          Search
        </Typography>

        <ThTextfield
          label=""
          placeholder="Keyword"
          name="keyword"
          value={keyword}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onChange(event)
          }
        />
      </section>

      <div className="tw-border tw-border-gray-50/10 tw-mt-6 tw-mb-1 md:tw-mb-9" />

      <section>
        <Typography variant="h1" className="!tw-mb-3 md:!tw-mb-4">
          # Of Results Per Page
        </Typography>

        <Typography variant="display1" className="!tw-font-bold">
          {pageSize} <Typography variant="subtitle1Reg">Results</Typography>
        </Typography>

        <ThSlider value={pageSize ?? 0} onChange={onSliderChange} />
      </section>

      <div className="tw-border tw-border-gray-50/10 tw-mt-6 tw-mb-10" />

      <section className="tw-mt-56 md:tw-mt-auto">
        <NextLink href={`/results?keyword=${keyword}&pageSize=${pageSize}`}>
          <ThButton variant="primary" className="md:!tw-max-w-[343px]">
            SEARCH
          </ThButton>
        </NextLink>
      </section>
    </>
  )
}
