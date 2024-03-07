import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'

import { makeSearchGymsService } from '@/use-cases/factories/make-search-gyms.service'

export async function SearchController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const searchGymBodySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = searchGymBodySchema.parse(request.query)

  const searchGymService = makeSearchGymsService()

  const { gyms } = await searchGymService.execute({
    query: q,
    page,
  })

  return reply.status(200).send({ gyms })
}
