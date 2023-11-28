import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'

import ThFriend from '@/components/feature/ThFriend'
import ThSkeletonLoading from '@/components/ui/ThSkeletonLoading'
import useQueryParams from '@/hooks/queryParams'
import { FriendInterface } from '@/models'
import { filterIsFollowing, toggleFollowingStatus } from '@/utils/functions'

interface FriendListProps {
  following?: boolean
}
const ThFriendList = ({ following = false }: FriendListProps) => {
  const { setQueryFilter } = useQueryParams()

  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [resultList, setResultList] = useState<FriendInterface[]>([])
  const [page, setPage] = useState<number>(1) // doesn't need page context for fetching friends
  const [pageSize] = useState<number>(20) // doesn't need page context for fetching friends
  const [totalPages, setTotalPages] = useState<number>(0) // doesn't need page context for fetching friends

  useEffect(() => {
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
            setResultList(tempList)
          } else {
            setResultList(users)
          }
        } else {
          if (following) {
            const tempList = filterIsFollowing(users)
            setResultList((prev) => [...prev, ...tempList])
          } else {
            setResultList((prev) => [...prev, ...users])
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

    fetchData()

    // no changes in the query, safe to ignnore the hooks warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const onFollowClick = async (friendId: string) => {
    // because there is no API to update follow status, let's handled it in FE side to simulate it
    // important to note because lack of APIs, the updated list won't be persists.
    const updatedFriends = await toggleFollowingStatus(friendId, resultList)
    setResultList(updatedFriends)
  }

  const renderFriends = () => {
    if (resultList.length === 0) {
      return (
        <Typography variant="subtitle2">
          You don&apos;t have any friends yet.
        </Typography>
      )
    }

    return (
      <div>
        {resultList.map((friend, index) => (
          <ThFriend
            key={index}
            friend={friend}
            totalPages={totalPages}
            isLast={index === resultList.length - 1}
            setNewLimit={() => {
              setPage(page + 1)
            }}
            onFollowClick={(friendId: string) => onFollowClick(friendId)}
          />
        ))}
      </div>
    )
  }

  return (
    <div>
      {isFetching ? (
        <ThSkeletonLoading friendsSkeleton skeletonToShow={10} />
      ) : (
        renderFriends()
      )}
    </div>
  )
}

export default ThFriendList
