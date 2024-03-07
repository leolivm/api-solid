import { hash } from 'bcryptjs'
import { User } from '@prisma/client'

import { UsersRepository } from '@/repositories/users.repository'
import { UserAlreadyExistsError } from './errors/user-already-exists.error'

interface RegisterSchema {
  name: string
  email: string
  password: string
}

interface RegisterResponse {
  user: User
}

export class RegisterService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterSchema): Promise<RegisterResponse> {
    const password_hash = await hash(password, 6)

    const userExists = await this.usersRepository.findByEmail(email)

    if (userExists) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return { user }
  }
}
