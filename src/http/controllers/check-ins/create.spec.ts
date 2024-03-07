import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create check-in e2e', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'Gym 1',
        description: 'Gym 1 description',
        phone: '123456789',
        latitude: -20.5852471,
        longitude: -47.8585234,
      },
    })

    const response = await request(app.server)
      .post('/check-ins ')
      .set('Authorization', `Bearer ${token}`)
      .send({
        gymId: gym.id,
        latitude: -20.5852471,
        longitude: -47.8585234,
      })

    expect(response.statusCode).toBe(201)
  })
})
