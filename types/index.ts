export interface PointOfInterest {
  id: string
  name: string
  category: string
  description: string
  address: string
  image: string
  latitude: number
  longitude: number
  rating: number
  reviewCount: number
  recommendedTime: string
}

export interface User {
  id: string
  name: string
  email: string
  preferences?: {
    categories: string[]
    interests: string[]
  }
}

export interface Itinerary {
  id: string
  name: string
  destination: string
  startDate: string
  endDate: string
  points: PointOfInterest[]
  userId: string
}

