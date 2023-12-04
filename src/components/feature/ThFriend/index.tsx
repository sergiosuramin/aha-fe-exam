import { Typography } from '@mui/material'

import ThButton from '@/components/ui/ThButton'
import ThImageLoader from '@/components/ui/ThImageLoader'
import { FriendInterface } from '@/models'
// import { FriendInterface } from '@/models'

interface FriendContainerProps {
  friend: FriendInterface
  onFollowClick: (friendId: string) => void
}

const ThFriend = ({ friend, onFollowClick }: FriendContainerProps) => {
  const buttonVariant = friend.isFollowing ? 'contained' : 'outlined'

  return (
    <>
      <div className="tw-flex tw-gap-x-4">
        <div className="tw-w-[40px] tw-h-[40px]">
          <ThImageLoader
            alt="frd-pp"
            width={40}
            height={40}
            src="/assets/img/friend_default_pp.webp"
          />
        </div>

        <div className="tw-flex tw-flex-col">
          <Typography variant="subtitle2Reg" className="tw-line-clamp-1">
            {friend.name}
          </Typography>
          <Typography
            variant="subtitle2Reg"
            className="tw-opacity-50 tw-line-clamp-1"
          >
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
    </>
  )
}

export default ThFriend
