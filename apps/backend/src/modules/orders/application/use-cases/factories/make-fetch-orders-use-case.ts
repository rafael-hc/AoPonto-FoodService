import { PrismaOrdersRepository } from '@/orders/infrastructure/database/prisma/repositories/prisma-orders.repository'
import { PrismaService } from '@/shared/database/prisma/prisma.service'
import { FetchOrdersUseCase } from '../fetch-orders.use-case'

export function makeFetchOrdersUseCase(prismaService: PrismaService) {
  const orderRepository = new PrismaOrdersRepository(prismaService)
  return new FetchOrdersUseCase(orderRepository)
}
