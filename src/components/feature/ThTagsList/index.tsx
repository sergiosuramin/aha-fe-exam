import ThTags from '@/components/feature/ThTags'
import { TagInterface } from '@/models'

interface ComponentProps {
  list: TagInterface[]
}

export default function ThTagsPage({ list }: ComponentProps) {
  return (
    <>
      <div className="tw-grid tw-place-items-center tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4 xl:tw-grid-cols-5 tw-gap-6">
        {list.map((tag, index) => {
          return <ThTags key={index} tag={tag} />
        })}
      </div>
    </>
  )
}
