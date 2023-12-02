import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'

import ThFriend from '@/components/feature/ThFriend'
import ThInfiniteScroll from '@/components/feature/ThInfiniteScroll'
import ThSkeletonLoading from '@/components/ui/ThSkeletonLoading'
import useQueryParams from '@/hooks/queryParams'
import { FriendInterface } from '@/models'
import { SKELETON_TO_SHOW } from '@/utils/constants'
import { filterIsFollowing, toggleFollowingStatus } from '@/utils/functions'

interface FriendListProps {
  following?: boolean
}
const ThFriendList = ({ following = false }: FriendListProps) => {
  const { setQueryFilter } = useQueryParams()

  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [friendList, setFriendList] = useState<FriendInterface[]>([])
  const [page, setPage] = useState<number>(1) // doesn't need page context for fetching friends
  const [pageSize] = useState<number>(20) // doesn't need page context for fetching friends
  const [totalPages, setTotalPages] = useState<number>(0) // doesn't need page context for fetching friends

  const fetchData = async () => {
    const endpoint = `${
      process.env.NEXT_PUBLIC_API_URL
    }/users/friends${setQueryFilter({
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
        if (following) {
          const tempList = filterIsFollowing(users)
          setFriendList(tempList)
        } else {
          setFriendList(users)
        }
      } else {
        if (following) {
          const tempList = filterIsFollowing(users)
          setFriendList((prev) => [...prev, ...tempList])
        } else {
          setFriendList((prev) => [...prev, ...users])
        }
      }

      // save total pages for infinite scroll event
      if (totalPages === 0) {
        // this statement indicates it is the first time data fetch
        setTotalPages(data.totalPages ?? 0)
      }

      setIsFetching(false)
    } catch (error) {
      setIsFetching(false)
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()

    // no changes in the query, safe to ignnore the hooks warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const onFollowClick = async (friendId: string) => {
    // because there is no API to update follow status, let's handle it in FE side to simulate it
    // important to note because lack of APIs, the updated list won't be persists.
    const updatedFriends = await toggleFollowingStatus(friendId, friendList)
    setFriendList(updatedFriends)
  }

  const renderFriends = () => {
    if (friendList.length > 0) {
      return (
        <ThInfiniteScroll
          data={friendList}
          itemClassName="tw-flex tw-justify-between tw-items-center tw-mb-[22px]"
          setNewLimit={() => {
            // make sure we dont set new page once it reach the last page
            if (page < totalPages) setPage(page + 1)
          }}
        >
          {(friend: FriendInterface, index: number) => (
            <ThFriend
              key={index}
              friend={friend}
              onFollowClick={(friendId: string) => onFollowClick(friendId)}
            />
          )}
        </ThInfiniteScroll>
      )
    }

    return (
      <Typography variant="subtitle2">
        {/* You don&apos;t have any friends yet. */}
        Failed to load data.{' '}
        <Typography variant="textButton" onClick={() => fetchData()}>
          Retry
        </Typography>
      </Typography>
    )
  }

  return (
    <div>
      {isFetching ? (
        <ThSkeletonLoading
          friendsSkeleton
          skeletonToShow={SKELETON_TO_SHOW.FRIENDS.DEFAULT}
        />
      ) : (
        renderFriends()
      )}
    </div>
  )
}

export default ThFriendList
