import { ValidateCheckInService } from '../validate-check-in.service'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins.repository'

export function makeValidateCheckInService() {
  return new ValidateCheckInService(new PrismaCheckInsRepository())
}
