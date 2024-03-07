import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { ValidateCheckInService } from './validate-check-in.service'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins.repository'

let sut: ValidateCheckInService
let checkInsRepository: InMemoryCheckInsRepository

describe('Validate Check-in Service', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInService(checkInsRepository)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      user_id: 'user-1',
      gym_id: 'gym-1',
      created_at: new Date(),
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.is_validated).toEqual(expect.any(Date))
    expect(checkInsRepository.checkIns[0].is_validated).toEqual(
      expect.any(Date)
    )
  })

  it('should not be able to validate an inexistent check in', async () => {
    await expect(() =>
      sut.execute({ checkInId: 'invalid-check-in-id' })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate check in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2022, 0, 1, 13, 40, 0))

    const createdCheckIn = await checkInsRepository.create({
      user_id: 'user-1',
      gym_id: 'gym-1',
      created_at: new Date(),
    })

    const twentyOneMinutesLaterInMilliseconds = 1000 * 60 * 21
    vi.advanceTimersByTime(twentyOneMinutesLaterInMilliseconds)

    await expect(() =>
      sut.execute({ checkInId: createdCheckIn.id })
    ).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})
