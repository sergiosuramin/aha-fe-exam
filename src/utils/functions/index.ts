import { FriendInterface } from '@/models'

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

export function filterIsFollowing(friends: FriendInterface[]) {
  return friends.filter((friend) => friend.isFollowing === true)
}

export function toggleFollowingStatus(
  friendId: string,
  friends: FriendInterface[]
) {
  return friends.map((friend) =>
    friend.id === friendId
      ? { ...friend, isFollowing: !friend.isFollowing }
      : friend
  )
}

// -----------------------------START: form strength functions-----------------------------
export function CheckIsNumeric(s: string) {
  const isNumeric = /^\d+$/.test(s)

  return isNumeric
}

export function checkPasswordStrength(password: string) {
  // Rule 1: Have at least one uppercase letter
  const hasUppercase = /(?=.*[A-Z])/.test(password)

  // Rule 2: Have at least one lowercase letter
  const hasLowercase = /(?=.*[a-z])/.test(password)

  // Rule 3: Have at least one number
  const hasNumber = /(?=.*\d)/.test(password)

  // Rule 4: Have at least one special character
  const hasSpecialCharacter = /(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])/.test(
    password
  )

  // Rule 5: Longer than 8 characters
  const isLongEnough = /(?=.{9,})/.test(password)

  // Combine all rules
  const isStrongPassword =
    hasUppercase &&
    hasLowercase &&
    hasNumber &&
    hasSpecialCharacter &&
    isLongEnough

  return {
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecialCharacter,
    isLongEnough,
    isStrongPassword,
  }
}
// -----------------------------END: form strength functions-----------------------------
