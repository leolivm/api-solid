import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { CreateController } from './create.controller'
import { HistoryController } from './history.controller'
import { MetricsController } from './metrics.controller'
import { ValidateController } from './validate.controller'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function checkInsRouter(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/check-ins/history', HistoryController)
  app.get('/check-ins/metrics', MetricsController)

  app.post('/check-ins', CreateController)
  app.patch(
    '/check-ins/:checkInId/validate',
    { onRequest: [verifyUserRole('ADMIN')] },
    ValidateController
  )
}
