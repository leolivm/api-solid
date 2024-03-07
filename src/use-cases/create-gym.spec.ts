import { describe, expect, it, beforeEach } from 'vitest'

import { CreateGymService } from './create-gym.service'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository'

let sut: CreateGymService
let gymsRepository: InMemoryGymsRepository

describe('Create Gym Service', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymService(gymsRepository)
  })

  it('should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'Gym 1',
      latitude: 0,
      longitude: 0,
      description: null,
      phone: null,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
