export interface Spot {
  id: number,
  name: string,
  latitude: number,
  longitude: number,
  owner: User,
  spotType: string,
  images?: string[],
  likes?: number,
  user?: User,
  description: string,
  spot_type: string
  park_near: boolean
  park_description?: string,
  reports?: number,
  type_specific_data?: {
    seating_provided?: boolean
    guarded?: boolean
    guard_free_time?: string
    open_time?: string
    close_time?: string
    expected_duration?: number
    path_description?: string
  }

}

export interface Type {
  type_name: string,
  display_name: string
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