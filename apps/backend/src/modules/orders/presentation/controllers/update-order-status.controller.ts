import { Body, Controller, Param, Patch } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { UpdateOrderStatusUseCase } from '@/orders/application/use-cases/update-order-status.use-case'
import { OrderResponseDto } from '../dtos/order-response.dto'
import { UpdateOrderStatusDto } from '../dtos/update-order-status.dto'

@ApiTags('orders')
@Controller('orders')
export class UpdateOrderStatusController {
  constructor(private updateOrderStatusUseCase: UpdateOrderStatusUseCase) {}

  @Patch(':id/status')
  @ApiOkResponse({ type: OrderResponseDto })
  async handle(@Param('id') id: string, @Body() body: UpdateOrderStatusDto) {
    const { order } = await this.updateOrderStatusUseCase.execute({
      id,
      status: body.status
    })

    return {
      id: order.id,
      status: order.status
    }
  }
}
