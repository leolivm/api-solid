import dayjs from 'dayjs'
import { CheckIn } from '@prisma/client'

import { CheckInsRepository } from '@/repositories/check-ins.repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'

interface ValidateCheckInSchema {
  checkInId: string
}

interface ValidateCheckInResponse {
  checkIn: CheckIn
}

export class ValidateCheckInService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInSchema): Promise<ValidateCheckInResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) throw new ResourceNotFoundError()

    const distanceInMinutesFromCreatedCheckIn = dayjs(new Date()).diff(
      checkIn.created_at,
      'minute'
    )

    if (distanceInMinutesFromCreatedCheckIn > 20) {
      throw new LateCheckInValidationError()
    }

    checkIn.is_validated = new Date()
    await this.checkInsRepository.save(checkIn)

    return { checkIn }
  }
}
