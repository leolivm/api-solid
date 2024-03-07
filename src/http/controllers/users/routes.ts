import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { ProfileController } from './profile.controller'
import { RefreshController } from './refresh.controller'
import { RegisterController } from './register.controller'
import { AuthenticateController } from './authenticate.controller'

export async function usersRouter(app: FastifyInstance) {
  app.post('/users', RegisterController)
  app.post('/sessions', AuthenticateController)

  app.patch('/token/refresh', RefreshController)

  /** Authenticated routes */
  app.get('/me', { onRequest: [verifyJwt] }, ProfileController)
}
