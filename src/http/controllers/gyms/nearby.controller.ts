import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'

import { makeFetchNearByGymsService } from '@/use-cases/factories/make-fetch-nearby-gyms.service'

export async function NearByController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const nearByGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
  })

  const { latitude, longitude } = nearByGymsQuerySchema.parse(request.query)

  const nearByGymsService = makeFetchNearByGymsService()

  const { gyms } = await nearByGymsService.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({ gyms })
}
