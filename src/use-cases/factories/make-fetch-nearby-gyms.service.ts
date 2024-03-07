import { FetchNearByGymsService } from '../fetch-nearby-gyms.service'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms.repository'

export function makeFetchNearByGymsService() {
  return new FetchNearByGymsService(new PrismaGymsRepository())
}
