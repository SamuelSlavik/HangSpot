/*
Author: Samuel Slávik (xslavi37), Jakub Kontrík (xkontr02), Adam Pekný(xpekny00)
Brief: File with all structures that are used in the project
*/

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

export interface SpotDetail {
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
  lat: number | undefined,
  lng: number | undefined
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

export interface Image {
  id: number
  spot: number
  image_url: string
}

export interface SpotFinderSpot {
  id: number
  name: string
  description:string
  type: string
  image: string
}
export interface Result {
  points: number
  distance: number
  real_coordinates: CoordinatesInterface
  guess_coordinates: CoordinatesInterface
}