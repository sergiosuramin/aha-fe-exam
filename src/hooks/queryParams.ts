import { useRouter } from 'next/router'

import { buildQueryString, parseQueryString } from '@/utils/functions'

export default function useQueryParams<T>() {
  const router = useRouter()
  const pathname = router.pathname
  const query = router.query

  function setQueryFilter(params: Partial<T>) {
    // Call buildQueryString to construct the query string
    const queryString = buildQueryString(params)

    // Replace the query part of the URL
    return `${queryString}`
  }

  function setQueryParams(params: Partial<T>) {
    // Call buildQueryString to construct the query string
    const queryString = buildQueryString(params)

    // Replace the query part of the URL
    router.replace(`${pathname}${queryString}`)
  }

  function parseQueryParams(params: string) {
    /**
     * return example:
     *  {
     *    foo: ['bar1', 'bar2'],
     *    foo_1: ['bar3'],
     *  }
     */
    return parseQueryString(params)
  }

  return {
    queryParams: query,
    setQueryFilter,
    setQueryParams,
    parseQueryParams,
  }
}
