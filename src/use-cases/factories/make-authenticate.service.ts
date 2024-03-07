import { AuthenticateService } from '../authenticate.service'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'

export function makeAuthenticateService() {
  return new AuthenticateService(new PrismaUsersRepository())
}
