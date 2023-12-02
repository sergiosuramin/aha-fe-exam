import { Typography } from '@mui/material'

import ThImageLoader from '@/components/ui/ThImageLoader'
import { useScreenSize } from '@/context/MediaQuery'
import { FriendInterface } from '@/models'

interface UserCardProps {
  user: FriendInterface
  isOnView?: boolean
}

const ThUserCard = ({ user, isOnView = false }: UserCardProps) => {
  const { isSmallScreen } = useScreenSize()

  return (
    <>
      {isOnView ? (
        <div className="tw-mb-8 md:tw-mb-4 tw-min-w-[335] tw-h-auto tw-max-w-[400px]">
          <ThImageLoader
            alt="user-pp"
            className="tw-w-full tw-h-auto"
            src={'/assets/img/dog_default_pp.webp'}
          />
        </div>
      ) : (
        <div className="tw-mb-8 md:tw-mb-4 tw-w-[335] tw-h-[222px] md:tw-w-[219px] md:tw-h-[146px]">
          <ThImageLoader
            alt="user-pp"
            width={isSmallScreen ? 335 : 219}
            height={isSmallScreen ? 222 : 146}
            src={'/assets/img/dog_default_pp.webp'}
          />
        </div>
      )}

      <Typography variant="subtitle2">{user.name}</Typography>
      <Typography variant="labelSmall" className="tw-text-gray-300">
        {isOnView ? '@' : 'By '}
        {user.username}
      </Typography>

      {isOnView && (
        <Typography variant="subtitle2Reg" className="tw-line-clamp-1">
          {user.isFollowing
            ? 'You are following this user'
            : 'You have not follow this user'}
        </Typography>
      )}
    </>
  )
}

export default ThUserCard
