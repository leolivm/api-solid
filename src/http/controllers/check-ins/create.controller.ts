import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'

import { makeCheckInService } from '@/use-cases/factories/make-check-in.service'

export async function CreateController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createCheckInBodySchema = z.object({
    gymId: z.string(),
    latitude: z.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.number().refine((value) => Math.abs(value) <= 180),
  })

  const { gymId, latitude, longitude } = createCheckInBodySchema.parse(
    request.body
  )

  const checkInService = makeCheckInService()

  await checkInService.execute({
    gymId,
    userLatitude: latitude,
    userId: request.user.sub,
    userLongitude: longitude,
  })

  return reply.status(201).send()
}
