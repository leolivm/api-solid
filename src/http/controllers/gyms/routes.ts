import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

import { SearchController } from './search.controller'
import { CreateController } from './create.controller'
import { NearByController } from './nearby.controller'

export async function gymsRouter(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/gyms/search', SearchController)
  app.get('/gyms/nearby', NearByController)

  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, CreateController)
}
