import { FastifyRequest, FastifyReply } from 'fastify'

import { makeGetUserMetricsService } from '@/use-cases/factories/make-get-user-metrics.service'

export async function MetricsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getUserMetricsService = makeGetUserMetricsService()

  const { checkInsCount } = await getUserMetricsService.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({ checkInsCount })
}
