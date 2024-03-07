import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'

import { makeValidateCheckInService } from '@/use-cases/factories/make-validate-check-in.service'

export async function ValidateController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  const validateCheckInService = makeValidateCheckInService()

  await validateCheckInService.execute({
    checkInId,
  })

  return reply.status(204).send()
}
