import { makeGetUserProfileService } from '@/use-cases/factories/make-get-user-profile.service'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function ProfileController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getUserProfile = makeGetUserProfileService()
  const { user } = await getUserProfile.execute({ userId: request.user.sub })

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}
