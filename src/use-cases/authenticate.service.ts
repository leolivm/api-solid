import { compare } from 'bcryptjs'
import { User } from '@prisma/client'

import { UsersRepository } from '@/repositories/users.repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AuthenticateSchema {
  email: string
  password: string
}

interface AuthenticateResponse {
  user: User
}

export class AuthenticateService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateSchema): Promise<AuthenticateResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
