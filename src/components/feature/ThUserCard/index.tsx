import { Typography } from '@mui/material'
import { useEffect, useRef } from 'react'

import ThImageLoader from '@/components/ui/ThImageLoader'
import { useScreenSize } from '@/context/MediaQuery'
import { FriendInterface } from '@/models'

interface UserCardProps {
  user: FriendInterface
  totalPages: number
  isLast: boolean
  setNewLimit: () => void
}

const ThUserCard = ({ user, isLast, setNewLimit }: UserCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const { isSmallScreen } = useScreenSize()

  useEffect(() => {
    if (!cardRef?.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (isLast && entry.isIntersecting) {
          setNewLimit()
          observer.unobserve(entry.target)
        }
      },
      { threshold: 1 }
    )

    observer.observe(cardRef.current)
    // only observe islast
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLast])

  return (
    <div ref={cardRef}>
      <div className="tw-mb-8 md:tw-mb-4 tw-w-[335] tw-h-[222px] md:tw-w-[219px] md:tw-h-[146px]">
        <ThImageLoader
          alt="user-pp"
          width={isSmallScreen ? 335 : 219}
          height={isSmallScreen ? 222 : 146}
          src={'/assets/img/dog_default_pp.webp'}
        />
      </div>

      <Typography variant="subtitle2">{user.name}</Typography>
      <Typography variant="labelSmall" className="tw-text-gray-300">
        By {user.username}
      </Typography>
    </div>
  )
}

export default ThUserCard
