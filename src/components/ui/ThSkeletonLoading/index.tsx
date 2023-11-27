/**
 * it is okay to to have a longer code in this component and make it independent to each boolean value,
 * since it offers a cleaner code rather than doing it in the component directly.
 * We can always refactor this as needed when the application grows.
 */

import { Skeleton } from '@mui/material'

interface SkeletonProps {
  skeletonToShow?: number
  usersSkeleton?: boolean
  friendsSkeleton?: boolean
  tagsSkeleton?: boolean
}

const ThSkeletonLoading = ({
  skeletonToShow = 1,
  usersSkeleton = false,
  friendsSkeleton = false,
  tagsSkeleton = false,
}: SkeletonProps) => {
  // handle all case with map so it is unified
  const skeletonArray = Array.from(new Array(skeletonToShow).fill([]))

  // use grid as the default skeleton layout
  if (usersSkeleton) {
    return (
      <div className="tw-grid tw-place-items-center tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6">
        {skeletonArray.map((_, index) => (
          <div key={index} className="tw-w-full">
            <Skeleton
              variant="rounded"
              className="!tw-mb-2 !tw-w-[335px] !tw-h-[222px] md:!tw-w-[219px] md:!tw-h-[146px]"
            />
            <Skeleton
              variant="text"
              className="!tw-mb-2 !tw-w-[335px] md:!tw-w-[219px]"
            />
            <Skeleton variant="text" width={80} />
          </div>
        ))}
      </div>
    )
  }

  if (friendsSkeleton) {
    return (
      <div className="tw-grid tw-place-items-center tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4 xl:tw-grid-cols-5 tw-gap-6">
        {skeletonArray.map((_, index) => (
          <div key={index}>
            <Skeleton
              variant="rounded"
              width={150}
              height={150}
              className="!tw-mb-2"
            />
            <Skeleton variant="text" width={150} className="!tw-mb-2" />
            <Skeleton variant="text" width={80} />
          </div>
        ))}
      </div>
    )
  }

  if (tagsSkeleton) {
    return (
      <div className="tw-grid tw-place-items-center tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4 xl:tw-grid-cols-5 tw-gap-6">
        {skeletonArray.map((_, index) => (
          <div key={index}>
            <Skeleton
              variant="rounded"
              width={150}
              height={150}
              className="!tw-mb-2"
            />
            <Skeleton variant="text" width={150} className="!tw-mb-2" />
            <Skeleton variant="text" width={80} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="tw-grid tw-place-items-center tw-grid-cols-1 tw-gap-6">
      <Skeleton className="!tw-m-4" />
    </div>
  )
}

export default ThSkeletonLoading
