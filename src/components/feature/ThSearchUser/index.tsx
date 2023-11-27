import { Typography } from '@mui/material'
import NextLink from 'next/link'
import { useEffect } from 'react'

import ThButton from '@/components/ui/ThButton'
import ThSlider from '@/components/ui/ThSlider'
import ThTextfield from '@/components/ui/ThTextField'
import { useQueryState } from '@/context/QueryFilter'

export default function ThHomePage() {
  const { keyword, pageSize, setKeyword, setPageSize, resetQueries } =
    useQueryState()

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    setKeyword(value)
  }

  const onSliderChange = (value: number | number[]) => {
    setPageSize(typeof value === 'number' ? value : 10)
  }

  const generateSearchUrl = () => {
    const url = 'results'
    // &page=1&pageSize=${pageSize}

    if (keyword !== '') return `${url}?keyword=${keyword}`
    else return url
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
        <Typography variant="h1">Search</Typography>

        <ThTextfield
          className="!tw-mt-6"
          label=""
          placeholder="Keyword"
          name="keyword"
          value={keyword}
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
          {pageSize} <Typography variant="subtitle1Reg">Results</Typography>
        </Typography>

        <ThSlider value={pageSize ?? 0} onChange={onSliderChange} />
      </section>

      <div className="tw-border tw-border-gray-50/10 tw-my-12" />

      <section className="tw-mt-auto">
        <NextLink href={generateSearchUrl()}>
          <ThButton variant="primary" className="md:!tw-max-w-[343px]">
            SEARCH
          </ThButton>
        </NextLink>
      </section>
    </>
  )
}
