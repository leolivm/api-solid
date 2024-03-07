import { RegisterService } from '../register.service'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'

export function makeRegisterService() {
  return new RegisterService(new PrismaUsersRepository())
}
