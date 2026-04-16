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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags
} from '@nestjs/swagger'
import { DeleteProductTypeUseCase } from '@/catalog/classifications/application/use-cases/delete-product-type.use-case'
import { EditProductTypeUseCase } from '@/catalog/classifications/application/use-cases/edit-product-type.use-case'
import { FetchProductTypesUseCase } from '@/catalog/classifications/application/use-cases/fetch-product-types.use-case'
import { RegisterProductTypeUseCase } from '@/catalog/classifications/application/use-cases/register-product-type.use-case'
import { EditProductTypeDto } from '@/catalog/classifications/presentation/dtos/edit-product-type.dto'
import {
  FetchProductTypesResponseDto,
  SingleProductTypeResponseDto
} from '@/catalog/classifications/presentation/dtos/product-type-response.dto'
import { RegisterProductTypeDto } from '@/catalog/classifications/presentation/dtos/register-product-type.dto'
import { ProductTypePresenter } from '@/catalog/classifications/presentation/presenters/product-type.presenter'
import { ZodValidationErrorDto } from '@/catalog/products/presentation/dtos/zod-validation-error.dto'

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
  @ApiOperation({ summary: 'Register a product type' })
  @ApiCreatedResponse({ type: SingleProductTypeResponseDto })
  @ApiBadRequestResponse({
    description: 'Invalid payload',
    type: ZodValidationErrorDto
  })
  async register(@Body() body: RegisterProductTypeDto) {
    const { productType } = await this.registerProductType.execute(body)
    return { productType: ProductTypePresenter.toHTTP(productType) }
  }

  @Get()
  @ApiOperation({ summary: 'List all product types' })
  @ApiOkResponse({ type: FetchProductTypesResponseDto })
  async fetch() {
    const { productTypes } = await this.fetchProductTypes.execute()
    return { productTypes: productTypes.map(ProductTypePresenter.toHTTP) }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Edit a product type by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiOkResponse({ type: SingleProductTypeResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  @ApiNotFoundResponse({ description: 'Product type not found' })
  async edit(@Param('id') id: string, @Body() body: EditProductTypeDto) {
    const { productType } = await this.editProductType.execute({
      id,
      ...body
    })
    return { productType: ProductTypePresenter.toHTTP(productType) }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product type by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiNoContentResponse({ description: 'Deleted with success' })
  @ApiNotFoundResponse({ description: 'Product type not found' })
  @HttpCode(204)
  async deleteOne(@Param('id') id: string) {
    await this.deleteProductType.execute({ id })
  }
}
