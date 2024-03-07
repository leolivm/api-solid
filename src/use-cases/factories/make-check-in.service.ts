import { CheckInService } from '../check-in.service'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms.repository'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins.repository'

export function makeCheckInService() {
  return new CheckInService(
    new PrismaCheckInsRepository(),
    new PrismaGymsRepository()
  )
}
