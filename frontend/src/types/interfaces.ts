export interface Spot {
  id: number,
  name: string,
  latitude: number,
  longitude: number,
  owner: User,
  spot_type: Type

  images?: string[],
  user?: User,
  description?: string,
  park_near?: boolean
  park_description?: string,
  reports?: number,
  type_specific_data?: {
    seating_provided?: boolean // picnic, sunset
    guarded?: boolean // bmx, skateboard
    guard_free_from?: string // bmx, skateboard
    guard_free_till?: string // bmx, skateboard
    open_time?: string // bmx, skateboard
    close_time?: string // bmx, skateboard
    expected_duration?: number // walk
    path_description?: string // walk
  }
}

export interface SpotForTheFuckinDetail {
  id: number,
  name: string,
  latitude: number,
  longitude: number,
  owner: User,
  spot_type: Type

  images?: string[],
  user?: User,
  description?: string,
  park_near?: boolean
  park_description?: string,
  reports?: number,
  seating_provided?: boolean // picnic, sunset
  guarded?: boolean // bmx, skateboard
  guard_free_from?: string // bmx, skateboard
  guard_free_till?: string // bmx, skateboard
  open_time?: string // bmx, skateboard
  close_time?: string // bmx, skateboard
  expected_duration?: number // walk
  path_description?: string // walk
}

export interface Like {
  likes: number
  user_in: boolean
}

export interface Type {
  type_name: string,
  display_name: string,
  marker_color: string
}

export interface User {
  id: number,
  username: string,
  email: string,
  image?: string,
}

export interface CoordinatesInterface {
  lat: number,
  lng: number
}

export interface Achievement {
  current_tier: number
  total_tiers: number
  goal: {
    progress: number
    quantity: number
    description: number
  }
}