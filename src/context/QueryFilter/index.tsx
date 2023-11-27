import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import { DynamicInterface } from '@/models'

interface QueryState {
  keyword: string
  page: number
  pageSize: number
  setKeyword: (value: string) => void
  setPage: (value: number) => void
  setPageSize: (value: number) => void
  resetQueries: () => void
  updateDefaultQueries: (queries: DynamicInterface) => void
}

const QueryStateContext = createContext<QueryState | undefined>(undefined)

interface QueryStateProviderProps {
  children: ReactNode
}

const QueryStateProvider: React.FC<QueryStateProviderProps> = ({
  children,
}) => {
  const [page, setPage] = useState<number>(1)
  const [keyword, setKeyword] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)

  const resetQueries = () => {
    setPage(1)
    setPageSize(10)
    setKeyword('')
  }

  const updateDefaultQueries = (newQueries: DynamicInterface) => {
    setPage(typeof newQueries.page === 'number' ? newQueries.page : 1)
    setPageSize(
      typeof newQueries.pageSize === 'number' ? newQueries.pageSize : 10
    )
    setKeyword(typeof newQueries.keyword === 'string' ? newQueries.keyword : '')
  }

  useEffect(() => {
    setPage(1)
  }, [keyword, pageSize])

  const value: QueryState = {
    keyword,
    page,
    pageSize,
    setKeyword,
    setPage,
    setPageSize,
    resetQueries,
    updateDefaultQueries,
  }

  return (
    <QueryStateContext.Provider value={value}>
      {children}
    </QueryStateContext.Provider>
  )
}

const useQueryState = (): QueryState => {
  const context = useContext(QueryStateContext)
  if (!context) {
    throw new Error('useQueryState must be used within a QueryStateProvider')
  }
  return context
}

export { QueryStateProvider, useQueryState }
