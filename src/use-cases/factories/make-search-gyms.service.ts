import { SearchGymsService } from '../search-gyms.service'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms.repository'

export function makeSearchGymsService() {
  return new SearchGymsService(new PrismaGymsRepository())
}
