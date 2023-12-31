import { Typography } from '@mui/material'
import { GetStaticProps } from 'next'
import { useEffect, useState } from 'react'

import ThTagsList from '@/components/feature/ThTagsList'
import ThSkeletonLoading from '@/components/ui/ThSkeletonLoading'
import { useScreenSize } from '@/context/MediaQuery'
import { useQueryState } from '@/context/QueryFilter'
import useQueryParams from '@/hooks/queryParams'
import { TagInterface } from '@/models'
import { SKELETON_TO_SHOW } from '@/utils/constants'

export default function TagsPage({ API_URL }: { API_URL: string }) {
  const { isSmallScreen, isMediumScreen, isLargeScreen, isExtraLargeScreen } =
    useScreenSize()
  const { page, pageSize, resetQueries } = useQueryState()
  const { setQueryFilter } = useQueryParams()
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [tagList, setTagList] = useState<TagInterface[]>([])

  const skeletonToShow = isSmallScreen
    ? SKELETON_TO_SHOW.FRIENDS.SMALL
    : isMediumScreen
      ? SKELETON_TO_SHOW.FRIENDS.MEDIUM
      : isLargeScreen && !isExtraLargeScreen
        ? SKELETON_TO_SHOW.FRIENDS.LARGE
        : isExtraLargeScreen
          ? SKELETON_TO_SHOW.FRIENDS.EXTRA_LARGE
          : SKELETON_TO_SHOW.FRIENDS.DEFAULT

  const didmount = () => {
    // reset query filter on page visit
    resetQueries()
  }

  useEffect(() => {
    didmount()
    // didmount only, safe to ignore hooks warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  useEffect(() => {
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
        {/* There is no user whose name is &quot;{keyword}&quot; */}
        Failed to load data.{' '}
        <Typography variant="textButton" onClick={() => fetchData()}>
          Retry
        </Typography>
      </Typography>
    )
  }

  return (
    <div className="md:tw-pl-16">
      <div className="tw-container tw-mx-auto tw-pb-16 tw-pt-4 tw-px-6 md:tw-px-[88px] md:tw-py-[84px] xl:tw-max-w-[1000px]">
        <div className="tw-mb-4">
          <Typography variant={isSmallScreen ? 'h1' : 'display2'}>
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
