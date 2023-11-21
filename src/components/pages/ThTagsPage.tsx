import ThTags from '@/components/feature/ThTags'

export default function ThTagsPage() {
  const dummy = [
    {
      id: '0028df30-e772-4920-b534-4fc93d34c458',
      name: 'Generic Soft Soap',
      count: 6,
    },
    {
      id: 'c065c6e4-71bb-4d15-8d2f-0ba082ccb2b3',
      name: 'Tasty Concrete Table',
      count: 48,
    },
    {
      id: '89b78813-a13b-4262-b5e7-93a2b7c08dc6',
      name: 'Unbranded Metal Gloves',
      count: 186,
    },
    {
      id: 'de9d5395-4415-459a-b089-d9e9c00c73a5',
      name: 'Handmade Metal Bike',
      count: 68,
    },
    {
      id: 'c065c6e4-71bb-4d15-8d2f-0ba082ccb2b3',
      name: 'Tasty Concrete Table',
      count: 48,
    },
    {
      id: '89b78813-a13b-4262-b5e7-93a2b7c08dc6',
      name: 'Unbranded Metal Gloves',
      count: 186,
    },
    {
      id: 'de9d5395-4415-459a-b089-d9e9c00c73a5',
      name: 'Handmade Metal Bike',
      count: 68,
    },
  ]

  return (
    <>
      <div className="tw-grid tw-place-items-center tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4 xl:tw-grid-cols-5 tw-gap-6">
        {dummy.map((tag, index) => {
          return <ThTags key={index} tag={tag} />
        })}
      </div>
    </>
  )
}
