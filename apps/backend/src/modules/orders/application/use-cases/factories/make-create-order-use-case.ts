import { PrismaProductsRepository } from '@/catalog/products/infrastructure/database/prisma/repositories/prisma-products-repository'
import { PrismaOrdersRepository } from '@/orders/infrastructure/database/prisma/repositories/prisma-orders.repository'
import { PrismaService } from '@/shared/database/prisma/prisma.service'
import { CreateOrderUseCase } from '../create-order.use-case'

export function makeCreateOrderUseCase(prismaService: PrismaService) {
  const orderRepository = new PrismaOrdersRepository(prismaService)
  const productRepository = new PrismaProductsRepository(prismaService)
  return new CreateOrderUseCase(orderRepository, productRepository)
}
