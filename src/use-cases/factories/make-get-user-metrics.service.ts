import { GetUserMetricsService } from '../get-user-metrics.service'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins.repository'

export function makeGetUserMetricsService() {
  return new GetUserMetricsService(new PrismaCheckInsRepository())
}
