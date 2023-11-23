import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'

import ThTagsList from '@/components/feature/ThTagsList'
import { TagInterface } from '@/models'

export default function TagsPage() {
  const [tagList, setTagList] = useState<TagInterface[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tagsResponse = await fetch(
          'https://avl-frontend-exam.herokuapp.com/api/tags'
        )

        const data = await tagsResponse.json()
        console.log('lala-- data--', data)
        setTagList(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  console.log('lala-- tagList--', tagList)

  return (
    <div className="tw-container tw-mx-auto tw-pb-16 tw-px-8 md:tw-p-16">
      <div className="tw-mb-4">
        <Typography variant="h1">Tags</Typography>
      </div>
      <ThTagsList list={tagList} />
    </div>
  )
}
