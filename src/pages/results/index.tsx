import { Typography } from '@mui/material'
import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'

import ThUserCard from '@/components/feature/ThUserCard'
import ThSkeletonLoading from '@/components/ui/ThSkeletonLoading'
import { useScreenSize } from '@/context/MediaQuery'
import { useQueryState } from '@/context/QueryFilter'
import useQueryParams from '@/hooks/queryParams'
import { DynamicInterface, ResultInterface } from '@/models'

interface ResultProps {
  API_URL: string
  params?: DynamicInterface
  query?: DynamicInterface
}

export default function ResultPage({ query, API_URL }: ResultProps) {
  const { isSmallScreen, isMediumScreen } = useScreenSize()
  const { keyword, page, pageSize, setPage, setKeyword } = useQueryState()
  const { setQueryFilter } = useQueryParams()
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [resultList, setResultList] = useState<ResultInterface[]>([])
  const [totalPages, setTotalPages] = useState<number>(0)

  const skeletonToShow = isSmallScreen ? 1 : isMediumScreen ? 2 : 3

  const didmount = () => {
    setPage(1)

    if (!!query) {
      const { keyword } = query ?? {}
      setKeyword(keyword as string)
    }
  }

  useEffect(() => {
    didmount()
    // didmount only, safe to ignore
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = `${API_URL}/users/all${setQueryFilter({
        keyword,
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
          setResultList(users)
        } else {
          setResultList((prev) => [...prev, ...users])
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
  }, [keyword, page])

  const renderUserList = () => {
    if (resultList.length === 0) {
      return (
        <Typography variant="subtitle2">
          There is no user whose name is &quot;{keyword}&quot;
        </Typography>
      )
    }

    return (
      <div className="tw-grid tw-place-items-center tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6">
        {resultList.map((user, index) => (
          <ThUserCard
            key={index}
            user={user}
            totalPages={totalPages}
            isLast={index === resultList.length - 1}
            setNewLimit={() => {
              setPage(page + 1)
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="tw-container tw-mx-auto tw-pb-16 tw-px-8 md:tw-p-16">
      <div className="tw-mb-4 tw-ml-12">
        <Typography variant="h1">Results</Typography>
      </div>

      {isFetching ? (
        <ThSkeletonLoading usersSkeleton skeletonToShow={skeletonToShow} />
      ) : (
        // <ThTagsList list={tagList} />
        renderUserList()
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const { query } = context
  return {
    props: {
      API_URL,
      query,
    }, // will be passed to the page component as props
  }
}
