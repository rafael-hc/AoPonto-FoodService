import { Module } from '@nestjs/common'
import { DatabaseModule } from '@/shared/database/database.module'
import { PrismaService } from '@/shared/database/prisma/prisma.service'
import { CancelOrderUseCase } from './application/use-cases/cancel-order.use-case'
import { CreateOrderUseCase } from './application/use-cases/create-order.use-case'
import { makeCancelOrderUseCase } from './application/use-cases/factories/make-cancel-order-use-case'
import { makeCreateOrderUseCase } from './application/use-cases/factories/make-create-order-use-case'
import { makeFetchOrdersUseCase } from './application/use-cases/factories/make-fetch-orders-use-case'
import { makeUpdateOrderStatusUseCase } from './application/use-cases/factories/make-update-order-status-use-case'
import { FetchOrdersUseCase } from './application/use-cases/fetch-orders.use-case'
import { UpdateOrderStatusUseCase } from './application/use-cases/update-order-status.use-case'
import { CancelOrderController } from './presentation/controllers/cancel-order.controller'
import { CreateOrderController } from './presentation/controllers/create-order.controller'
import { FetchOrdersController } from './presentation/controllers/fetch-orders.controller'
import { UpdateOrderStatusController } from './presentation/controllers/update-order-status.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateOrderController,
    FetchOrdersController,
    UpdateOrderStatusController,
    CancelOrderController
  ],
  providers: [
    {
      provide: CreateOrderUseCase,
      useFactory: makeCreateOrderUseCase,
      inject: [PrismaService]
    },
    {
      provide: FetchOrdersUseCase,
      useFactory: makeFetchOrdersUseCase,
      inject: [PrismaService]
    },
    {
      provide: UpdateOrderStatusUseCase,
      useFactory: makeUpdateOrderStatusUseCase,
      inject: [PrismaService]
    },
    {
      provide: CancelOrderUseCase,
      useFactory: makeCancelOrderUseCase,
      inject: [PrismaService]
    }
  ],
  exports: [
    CreateOrderUseCase,
    FetchOrdersUseCase,
    UpdateOrderStatusUseCase,
    CancelOrderUseCase
  ]
})
export class OrdersModule {}
