import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { buildQueryStringV2, parseQueryStringV2 } from '@/utils/functions'

export default function useQueryParams<T>() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function setQueryFilter(params: Partial<T>) {
    // Call buildQueryStringV2 to construct the query string
    const queryString = buildQueryStringV2(params)

    // Replace the query part of the URL
    return `${queryString}`
  }

  function setQueryParams(params: Partial<T>) {
    // Call buildQueryStringV2 to construct the query string
    const queryString = buildQueryStringV2(params)

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
    return parseQueryStringV2(params)
  }

  return {
    queryParams: searchParams,
    setQueryFilter,
    setQueryParams,
    parseQueryParams,
  }
}
