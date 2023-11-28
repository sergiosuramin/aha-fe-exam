export interface TagInterface {
  id?: string | null
  name?: string | null
  count?: number | null
}

export interface FriendInterface {
  id: string
  name: string
  username: string
  avater: string
  isFollowing: boolean
}

export interface DynamicInterface {
  keyword?: string
  page?: string | number
  pageSize?: string | number
  [key: string]: string | number | unknown | undefined | null
}
