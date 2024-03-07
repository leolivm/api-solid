import { beforeEach, describe, expect, it } from 'vitest'

import { FetchNearByGymsService } from './fetch-nearby-gyms.service'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository'

let sut: FetchNearByGymsService
let gymsRepository: InMemoryGymsRepository

describe('Fetch Nearby Gyms Service', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearByGymsService(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Far Gym',
      latitude: -20.5852471,
      longitude: -47.8585234,
      description: null,
      phone: null,
    })

    await gymsRepository.create({
      title: 'Near Gym',
      latitude: -20.3432799,
      longitude: -47.7939431,
      description: null,
      phone: null,
    })

    const { gyms } = await sut.execute({
      userLatitude: -20.3386307,
      userLongitude: -47.788896,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
