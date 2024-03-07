import { beforeEach, describe, expect, it } from 'vitest'

import { SearchGymsService } from './search-gyms.service'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository'

let sut: SearchGymsService
let gymsRepository: InMemoryGymsRepository

describe('Search Gyms Service', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsService(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Gym 1',
      latitude: 0,
      longitude: 0,
      description: null,
      phone: null,
    })

    await gymsRepository.create({
      title: 'Gym 2',
      latitude: 0,
      longitude: 0,
      description: null,
      phone: null,
    })

    const { gyms } = await sut.execute({
      query: 'Gym',
      page: 1,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Gym 1' }),
      expect.objectContaining({ title: 'Gym 2' }),
    ])
  })

  it('should be able to search paginated gyms', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Gym ${i}`,
        latitude: 0,
        longitude: 0,
        description: null,
        phone: null,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Gym',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Gym 21' }),
      expect.objectContaining({ title: 'Gym 22' }),
    ])
  })
})
