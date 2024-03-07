import { Gym } from '@prisma/client'

import { GymsRepository } from '@/repositories/gyms.repository'

interface FetchNearByGymsSchema {
  userLatitude: number
  userLongitude: number
}

interface FetchNearByGymsResponse {
  gyms: Gym[]
}

export class FetchNearByGymsService {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearByGymsSchema): Promise<FetchNearByGymsResponse> {
    const gyms = await this.gymsRepository.findyManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { gyms }
  }
}
