import { Controller, Delete, Param } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { CancelOrderUseCase } from '@/orders/application/use-cases/cancel-order.use-case'

@ApiTags('orders')
@Controller('orders')
export class CancelOrderController {
  constructor(private cancelOrderUseCase: CancelOrderUseCase) {}

  @Delete(':id')
  @ApiOkResponse({ description: 'Order successfully canceled' })
  async handle(@Param('id') id: string) {
    const { order } = await this.cancelOrderUseCase.execute({ id })

    return {
      id: order.id,
      status: order.status
    }
  }
}
