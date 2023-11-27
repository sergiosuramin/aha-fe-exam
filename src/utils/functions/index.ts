/* eslint-disable @typescript-eslint/no-explicit-any */
export function buildQueryStringV2(
  queryConstants: Record<string, any>
): string {
  const queryString = Object.keys(queryConstants)
    .map((key) => {
      if (Array.isArray(queryConstants[key])) {
        // Join array values with '%'
        return `${key}=${queryConstants[key]
          .map((value: any) => encodeURIComponent(value))
          .join('|')}`
      } else {
        return `${key}=${encodeURIComponent(queryConstants[key])}`
      }
    })
    .join('&')

  return queryString ? `?${queryString}` : ''
}

export function parseQueryStringV2(queryString: string): Record<string, any> {
  /**
   * attention:
   * handle all queries to an array even if they only have a single value.
   * objective: universal handling
   */
  const queryParameters = new URLSearchParams(queryString)
  const queries: Record<string, any> = {}

  queryParameters.forEach((value, key) => {
    if (value.includes('|')) {
      // If the value contains '%', split by '%' and decode each part
      queries[key] = value.split('|').map(decodeURIComponent)
    }
    // else if (!isNaN(Number(value))) {
    //   // If the value is a number, convert it to a number
    //   queries[key] = Number(value)
    // }
    else {
      // For other keys, just store the value
      queries[key] = [value]
    }
  })

  return queries
}

export function generateMarks({
  max,
  markToShow,
}: {
  max: number
  markToShow: number
}) {
  const step = max / (markToShow - 1)
  return Array.from({ length: markToShow }, (_, index) => ({
    value: Math.round(index * step),
    label: Math.round(index * step).toString(),
  }))
}
