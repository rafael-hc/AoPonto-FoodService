import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags
} from '@nestjs/swagger'
import { FetchProductWizardsUseCase } from '@/catalog/wizard/application/use-cases/fetch-product-wizards.use-case'
import { SyncProductWizardsUseCase } from '@/catalog/wizard/application/use-cases/sync-product-wizards.use-case'
import { FetchProductWizardsResponseDto } from '../dtos/product-wizard-response.dto'
import { SyncProductWizardsDto } from '../dtos/sync-product-wizards.dto'
import { ProductWizardPresenter } from '../presenters/product-wizard.presenter'

@ApiTags('Product Wizards (Linkage)')
@Controller('/product-wizards')
export class ProductWizardsController {
  constructor(
    private syncProductWizards: SyncProductWizardsUseCase,
    private fetchProductWizards: FetchProductWizardsUseCase
  ) {}

  @Post('/sync')
  @ApiOperation({ summary: 'Sync wizard questions linked to a product detail' })
  @ApiNoContentResponse({ description: 'Synced with success' })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  @HttpCode(204)
  async sync(@Body() body: SyncProductWizardsDto) {
    await this.syncProductWizards.execute(body)
  }

  @Get(':productId')
  @ApiOperation({
    summary: 'Fetch wizard questions linked to a product detail'
  })
  @ApiParam({ name: 'productId', type: 'string', format: 'uuid' })
  @ApiOkResponse({ type: FetchProductWizardsResponseDto })
  async fetch(@Param('productId') productId: string) {
    const { productWizards } = await this.fetchProductWizards.execute({
      productId
    })

    return {
      productWizards: productWizards.map(ProductWizardPresenter.toHTTP)
    }
  }
}
