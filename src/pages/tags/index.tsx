import { Typography } from '@mui/material'
import { GetStaticProps } from 'next'
import { useEffect, useState } from 'react'

import ThTagsList from '@/components/feature/ThTagsList'
import ThSkeletonLoading from '@/components/ui/ThSkeletonLoading'
import { useScreenSize } from '@/context/MediaQuery'
import { useQueryState } from '@/context/QueryFilter'
import useQueryParams from '@/hooks/queryParams'
import { TagInterface } from '@/models'

export default function TagsPage({ API_URL }: { API_URL: string }) {
  const { isSmallScreen, isMediumScreen, isLargeScreen, isExtraLargeScreen } =
    useScreenSize()
  const { page, pageSize, resetQueries } = useQueryState()
  const { setQueryFilter } = useQueryParams()
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [tagList, setTagList] = useState<TagInterface[]>([])

  const skeletonToShow = isSmallScreen
    ? 2
    : isMediumScreen
      ? 3
      : isLargeScreen && !isExtraLargeScreen
        ? 4
        : isExtraLargeScreen
          ? 5
          : 1

  const didmount = () => {
    // reset query filter on page visit
    resetQueries()
  }

  useEffect(() => {
    didmount()
    // didmount only, safe to ignore hooks warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = `${API_URL}/tags${setQueryFilter({
        page,
        pageSize,
      })}`

      setIsFetching(true)
      try {
        const tagsResponse = await fetch(endpoint)
        const data = await tagsResponse.json()

        setTagList(data)
        setIsFetching(false)
      } catch (error) {
        setIsFetching(false)
      }
    }

    fetchData()

    // no changes in the query, safe to ignnore the hooks warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderTags = () => {
    if (tagList.length > 0) {
      return <ThTagsList list={tagList} />
    }

    return (
      <Typography variant="subtitle2">
        There is no tags available right now.
      </Typography>
    )
  }

  return (
    <div className="md:tw-pl-16">
      <div className="tw-container tw-mx-auto tw-pb-16 tw-pt-4 tw-px-6 md:tw-px-[88px] md:tw-py-[84px] xl:tw-max-w-[1000px]">
        <div className="tw-mb-4">
          <Typography variant={isSmallScreen ? 'h1' : 'display3'}>
            Tags
          </Typography>
        </div>

        {isFetching ? (
          <ThSkeletonLoading tagsSkeleton skeletonToShow={skeletonToShow} />
        ) : (
          renderTags()
        )}
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  return {
    props: {
      API_URL,
    },
  }
}
