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
import { DeleteProductUseCase } from '@/catalog/products/application/use-cases/delete-product.use-case'
import { EditProductUseCase } from '@/catalog/products/application/use-cases/edit-product.use-case'
import { FetchProductsUseCase } from '@/catalog/products/application/use-cases/fetch-products.use-case'
import { RegisterProductUseCase } from '@/catalog/products/application/use-cases/register-product.use-case'
import { EditProductDto } from '@/catalog/products/presentation/dtos/edit-product.dto'
import {
  FetchProductsResponseDto,
  SingleProductResponseDto
} from '@/catalog/products/presentation/dtos/product-response.dto'
import { RegisterProductDto } from '@/catalog/products/presentation/dtos/register-product.dto'
import { ZodValidationErrorDto } from '@/catalog/products/presentation/dtos/zod-validation-error.dto'
import { ProductPresenter } from '@/catalog/products/presentation/presenters/product.presenter'

const COMPLEMENTO_TYPE_ID = 'b0dff670-38ad-4917-8952-1314a6e0d7cb'

@ApiTags('Complements')
@Controller('/complements')
export class ComplementsController {
  constructor(
    private registerProduct: RegisterProductUseCase,
    private fetchProducts: FetchProductsUseCase,
    private editProduct: EditProductUseCase,
    private deleteProduct: DeleteProductUseCase
  ) {}

  @Post()
  @ApiOperation({ summary: 'Register a complement' })
  @ApiCreatedResponse({ type: SingleProductResponseDto })
  @ApiBadRequestResponse({
    description: 'Invalid payload',
    type: ZodValidationErrorDto
  })
  async create(@Body() body: RegisterProductDto) {
    const { product } = await this.registerProduct.execute({
      ...body,
      productTypeId: COMPLEMENTO_TYPE_ID
    })

    return {
      product: ProductPresenter.toHTTP(product)
    }
  }

  @Get()
  @ApiOperation({ summary: 'List all complements' })
  @ApiOkResponse({ type: FetchProductsResponseDto })
  async list() {
    const { products } = await this.fetchProducts.execute({
      productTypeId: COMPLEMENTO_TYPE_ID
    })

    return {
      products: products.map(ProductPresenter.toHTTP)
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Edit a complement by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiOkResponse({ type: SingleProductResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  @ApiNotFoundResponse({ description: 'Complement not found' })
  async edit(@Param('id') id: string, @Body() body: EditProductDto) {
    const { product } = await this.editProduct.execute({
      id,
      ...body,
      productTypeId: COMPLEMENTO_TYPE_ID
    })

    return {
      product: ProductPresenter.toHTTP(product)
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a complement by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiNoContentResponse({ description: 'Deleted with success' })
  @ApiNotFoundResponse({ description: 'Complement not found' })
  @HttpCode(204)
  async deleteOne(@Param('id') id: string) {
    await this.deleteProduct.execute({ id })
  }
}
