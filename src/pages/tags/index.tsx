import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'

import ThTagsList from '@/components/feature/ThTagsList'
import ThSkeletonLoading from '@/components/ui/ThSkeletonLoading'
import { useScreenSize } from '@/context/MediaQuery'
import { TagInterface } from '@/models'

export default function TagsPage() {
  const { isSmallScreen, isMediumScreen, isLargeScreen, isExtraLargeScreen } =
    useScreenSize()
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

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true)
      try {
        const tagsResponse = await fetch(
          'https://avl-frontend-exam.herokuapp.com/api/tags'
        )

        const data = await tagsResponse.json()
        console.log('lala-- data--', data)
        setTagList(data)
        setIsFetching(false)
      } catch (error) {
        setIsFetching(false)
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  console.log('lala-- tagList--', tagList)

  return (
    <div className="tw-container tw-mx-auto tw-pb-16 tw-px-8 md:tw-p-16">
      <div className="tw-mb-4 tw-ml-12">
        <Typography variant="h1">Tags</Typography>
      </div>

      {isFetching ? (
        <ThSkeletonLoading tagsSkeleton skeletonToShow={skeletonToShow} />
      ) : (
        <ThTagsList list={tagList} />
      )}
    </div>
  )
}
