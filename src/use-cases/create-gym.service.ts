import { Gym } from '@prisma/client'

import { GymsRepository } from '@/repositories/gyms.repository'

interface CreateGymSchema {
  title: string
  latitude: number
  longitude: number
  phone?: string | null
  description?: string | null
}

interface CreateGymResponse {
  gym: Gym
}

export class CreateGymService {
  constructor(private gymsRepository: GymsRepository) {}

  async execute(data: CreateGymSchema): Promise<CreateGymResponse> {
    const gym = await this.gymsRepository.create(data)

    return { gym }
  }
}
