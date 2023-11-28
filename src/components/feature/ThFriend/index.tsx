import { Typography } from '@mui/material'
import { useEffect, useRef } from 'react'

import ThButton from '@/components/ui/ThButton'
import ThImageLoader from '@/components/ui/ThImageLoader'
import { FriendInterface } from '@/models'
// import { FriendInterface } from '@/models'

interface FriendContainerProps {
  friend: FriendInterface
  totalPages: number
  isLast: boolean
  setNewLimit: () => void
  onFollowClick: (friendId: string) => void
}

const ThFriend = ({
  friend,
  isLast,
  setNewLimit,
  onFollowClick,
}: FriendContainerProps) => {
  const friendCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!friendCardRef?.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (isLast && entry.isIntersecting) {
          setNewLimit()
          observer.unobserve(entry.target)
        }
      },
      { threshold: 1 }
    )

    observer.observe(friendCardRef.current)
    // only observe islast
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLast])

  const buttonVariant = friend.isFollowing ? 'contained' : 'outlined'

  return (
    <div
      ref={friendCardRef}
      className="tw-flex tw-justify-between tw-items-center"
    >
      <div className="tw-flex tw-gap-x-2">
        <div className="tw-w-[40px] tw-h-[40px]">
          <ThImageLoader
            alt="frd-pp"
            width={40}
            height={40}
            src="/assets/img/friend_default_pp.webp"
          />
        </div>

        <div className="tw-flex tw-flex-col">
          <Typography variant="subtitle2Reg" className="!tw-line-clamp-1">
            {friend.name}
          </Typography>
          <Typography variant="subtitle2Reg" className="!tw-line-clamp-1">
            @{friend.username}
          </Typography>
        </div>
      </div>

      <div className="tw-flex">
        <ThButton
          variant={buttonVariant}
          onClick={() => onFollowClick(friend.id)}
        >
          {friend.isFollowing ? 'Following' : 'Follow'}
        </ThButton>
      </div>
    </div>
  )
}

export default ThFriend
