import { PrismaOrdersRepository } from '@/orders/infrastructure/database/prisma/repositories/prisma-orders.repository'
import { PrismaService } from '@/shared/database/prisma/prisma.service'
import { UpdateOrderStatusUseCase } from '../update-order-status.use-case'

export function makeUpdateOrderStatusUseCase(prismaService: PrismaService) {
  const orderRepository = new PrismaOrdersRepository(prismaService)
  return new UpdateOrderStatusUseCase(orderRepository)
}
