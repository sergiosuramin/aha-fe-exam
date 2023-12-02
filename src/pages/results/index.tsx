import { Typography } from '@mui/material'
import { GetServerSideProps } from 'next'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'

import ThInfiniteScroll from '@/components/feature/ThInfiniteScroll'
import ThUserCard from '@/components/feature/ThUserCard'
import ThImageLoader from '@/components/ui/ThImageLoader'
import ThModal from '@/components/ui/ThModal'
import ThSkeletonLoading from '@/components/ui/ThSkeletonLoading'
import { useScreenSize } from '@/context/MediaQuery'
import { useQueryState } from '@/context/QueryFilter'
import useQueryParams from '@/hooks/queryParams'
import { DynamicInterface, FriendInterface } from '@/models'
import { SKELETON_TO_SHOW } from '@/utils/constants'

interface ResultProps {
  API_URL: string
  params?: DynamicInterface
  query?: DynamicInterface
}

export default function ResultPage({ query, API_URL }: ResultProps) {
  const { isSmallScreen, isMediumScreen } = useScreenSize()
  const { keyword, page, pageSize, setPage, updateDefaultQueries } =
    useQueryState()
  const { setQueryFilter } = useQueryParams()
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [resultList, setResultList] = useState<FriendInterface[]>([])
  const [totalPages, setTotalPages] = useState<number>(0)
  const [isInitialized, setIsInitialized] = useState<boolean>(false)

  //for friend modal
  const [isFriendModalOpen, setFriendModalOpen] = useState<boolean>(false)
  const [selectedFriend, setSelectedFriend] = useState<FriendInterface>({
    id: '',
    name: '',
    username: '',
    avater: '',
    isFollowing: false,
  })

  const skeletonToShow = isSmallScreen
    ? SKELETON_TO_SHOW.RESULTS.SMALL
    : isMediumScreen
      ? SKELETON_TO_SHOW.RESULTS.MEDIUM
      : SKELETON_TO_SHOW.RESULTS.LARGE

  const didmount = () => {
    if (!!query) {
      updateDefaultQueries(query)

      /**
       * This flag prevents redundant refetching scenarios.
       * Without it, multiple useEffects might overlap, potentially leading to
       * API calls with incomplete or non-finalized query values.
       */
      setIsInitialized(true)
    }
  }

  const fetchData = async () => {
    const endpoint = `${API_URL}/users/all${setQueryFilter({
      keyword,
      page,
      pageSize,
    })}`

    if (totalPages === 0) {
      // this statement indicates not the first data fetching
      setIsFetching(true)
    }

    try {
      const resultResponse = await fetch(endpoint)
      const data = await resultResponse.json()

      const users = data.data ?? []

      if (totalPages === 0) {
        setResultList(users)
      } else {
        setResultList((prev) => [...prev, ...users])
      }

      // save total pages for infinite scroll event
      if (totalPages === 0) {
        // this statement indicates it is the first time data fetch
        setTotalPages(data.totalPages ?? 0)
      }

      // setIsFetching(false)
    } catch (error) {
      // setIsFetching(false)
      console.error('Error fetching data:', error)
    }
    setIsFetching(false)
  }

  useEffect(() => {
    didmount()
    // didmount only, safe to ignore
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isInitialized) {
      fetchData()
    }

    // no changes in the query, safe to ignnore the hooks warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, page, pageSize, isInitialized])

  const onCloseFriendModal = () => {
    setFriendModalOpen(false)
    setSelectedFriend({
      id: '',
      name: '',
      username: '',
      avater: '',
      isFollowing: false,
    })
  }

  const onSelectFriend = (user: FriendInterface) => {
    setFriendModalOpen(true)
    setSelectedFriend(user)
  }

  const renderUserList = () => {
    if (resultList.length > 0) {
      return (
        <ThInfiniteScroll
          data={resultList}
          parentClassName="tw-grid tw-place-items-center tw-grid-cols-1 md:tw-grid-cols-2 md:tw-place-items-start lg:tw-grid-cols-3 tw-gap-y-8"
          itemClassName="tw-cursor-pointer"
          setNewLimit={() => {
            // make sure we dont set new page once it reach the last page
            if (page < totalPages) setPage(page + 1)
          }}
          onItemClick={onSelectFriend}
        >
          {(user: FriendInterface, index: number) => (
            <ThUserCard key={index} user={user} />
          )}
        </ThInfiniteScroll>
      )
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
    <div className="xl:tw-flex md:tw-pl-[80px] xl:tw-pr-[375px]">
      <div className="tw-container tw-mx-auto tw-pb-16 tw-pt-4 tw-px-6 md:tw-px-16 md:tw-py-[88px] xl:tw-max-w-[925px]">
        <div className="tw-flex tw-items-center tw-gap-x-6 tw-mb-4 md:-tw-ml-6 md:tw-mb-6">
          <NextLink href="/" className="tw-hidden md:tw-block">
            <div className="tw-cursor-pointer">
              <ThImageLoader
                alt="left-cv"
                src="/assets/svg/chevron_left.svg"
                width={26}
                height={26}
              />
            </div>
          </NextLink>

          <Typography variant={isSmallScreen ? 'h1' : 'display2'}>
            Results
          </Typography>
        </div>

        {isFetching ? (
          <ThSkeletonLoading usersSkeleton skeletonToShow={skeletonToShow} />
        ) : (
          renderUserList()
        )}
      </div>

      <ThModal open={isFriendModalOpen} onClose={onCloseFriendModal}>
        <ThUserCard user={selectedFriend} isOnView />
      </ThModal>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const { query } = context
  return {
    props: {
      API_URL,
      query,
      withFriend: true,
    }, // will be passed to the page component as props
  }
}
