import { CreateGymService } from '../create-gym.service'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms.repository'

export function makeCreateGymService() {
  return new CreateGymService(new PrismaGymsRepository())
}
