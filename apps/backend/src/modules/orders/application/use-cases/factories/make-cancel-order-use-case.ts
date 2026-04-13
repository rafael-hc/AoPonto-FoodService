import { PrismaOrdersRepository } from '@/orders/infrastructure/database/prisma/repositories/prisma-orders.repository'
import { PrismaService } from '@/shared/database/prisma/prisma.service'
import { CancelOrderUseCase } from '../cancel-order.use-case'

export function makeCancelOrderUseCase(prismaService: PrismaService) {
  const orderRepository = new PrismaOrdersRepository(prismaService)
  return new CancelOrderUseCase(orderRepository)
}
