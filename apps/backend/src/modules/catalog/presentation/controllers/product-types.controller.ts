import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put
} from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { DeleteProductTypeUseCase } from '@/catalog/application/use-cases/delete-product-type.use-case'
import { EditProductTypeUseCase } from '@/catalog/application/use-cases/edit-product-type.use-case'
import { FetchProductTypesUseCase } from '@/catalog/application/use-cases/fetch-product-types.use-case'
import { RegisterProductTypeUseCase } from '@/catalog/application/use-cases/register-product-type.use-case'
import { EditProductTypeDto } from '@/catalog/presentation/dtos/edit-product-type.dto'
import {
  FetchProductTypesResponseDto,
  SingleProductTypeResponseDto
} from '@/catalog/presentation/dtos/product-type-response.dto'
import { RegisterProductTypeDto } from '@/catalog/presentation/dtos/register-product-type.dto'
import { ProductTypePresenter } from '@/catalog/presentation/presenters/product-type.presenter'

@ApiTags('ProductTypes')
@Controller('product-types')
export class ProductTypesController {
  constructor(
    private registerProductType: RegisterProductTypeUseCase,
    private fetchProductTypes: FetchProductTypesUseCase,
    private editProductType: EditProductTypeUseCase,
    private deleteProductType: DeleteProductTypeUseCase
  ) {}

  @Post()
  @ApiOkResponse({ type: SingleProductTypeResponseDto })
  async register(@Body() body: RegisterProductTypeDto) {
    const { productType } = await this.registerProductType.execute(body)
    return { productType: ProductTypePresenter.toHTTP(productType) }
  }

  @Get()
  @ApiOkResponse({ type: FetchProductTypesResponseDto })
  async fetch() {
    const { productTypes } = await this.fetchProductTypes.execute()
    return { productTypes: productTypes.map(ProductTypePresenter.toHTTP) }
  }

  @Put(':id')
  @ApiOkResponse({ type: SingleProductTypeResponseDto })
  async edit(@Param('id') id: string, @Body() body: EditProductTypeDto) {
    const { productType } = await this.editProductType.execute({
      id,
      ...body
    })
    return { productType: ProductTypePresenter.toHTTP(productType) }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteOne(@Param('id') id: string) {
    await this.deleteProductType.execute({ id })
  }
}
