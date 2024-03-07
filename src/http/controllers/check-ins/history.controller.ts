import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'

import { makeFetchUserCheckInsHistoryService } from '@/use-cases/factories/make-fetch-user-check-ins-history.service'

export async function HistoryController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const checkInsHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInsHistoryQuerySchema.parse(request.query)

  const checkInsHistoryService = makeFetchUserCheckInsHistoryService()

  const { checkIns } = await checkInsHistoryService.execute({
    page,
    userId: request.user.sub,
  })

  return reply.status(200).send({ checkIns })
}
