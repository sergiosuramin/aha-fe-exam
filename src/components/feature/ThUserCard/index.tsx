import { Typography } from '@mui/material'
import { useEffect, useRef } from 'react'

import ThImageLoader from '@/components/ui/ThImageLoader'
import { ResultInterface } from '@/models'

interface UserCardProps {
  user: ResultInterface
  totalPages: number
  isLast: boolean
  setNewLimit: () => void
}

const ThUserCard = ({ user, isLast, setNewLimit }: UserCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef?.current) return

    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        setNewLimit()
        observer.unobserve(entry.target)
      }
    })

    observer.observe(cardRef.current)
    // only observe islast
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLast])

  return (
    <div ref={cardRef} className="tw-w-full">
      <div className="!tw-mb-2 !tw-w-[335] !tw-h-[222px] md:!tw-w-[219px] md:!tw-h-[146px]">
        <ThImageLoader
          alt="user-pp"
          width={219}
          height={146}
          src={'/assets/img/dog_default_pp.webp'}
        />
      </div>

      <Typography variant="subtitle2">{user.name}</Typography>
      <Typography variant="labelSmall">By @{user.username}</Typography>
    </div>
  )
}

export default ThUserCard
