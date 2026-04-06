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
import { DeleteProductUseCase } from '@/catalog/application/use-cases/delete-product.use-case'
import { EditProductUseCase } from '@/catalog/application/use-cases/edit-product.use-case'
import { FetchProductsUseCase } from '@/catalog/application/use-cases/fetch-products.use-case'
import { RegisterProductUseCase } from '@/catalog/application/use-cases/register-product.use-case'
import { EditProductDto } from '@/catalog/presentation/dtos/edit-product.dto'
import {
  FetchProductsResponseDto,
  SingleProductResponseDto
} from '@/catalog/presentation/dtos/product-response.dto'
import { RegisterProductDto } from '@/catalog/presentation/dtos/register-product.dto'
import { ProductPresenter } from '@/catalog/presentation/presenters/product.presenter'

@ApiTags('Products')
@Controller('/products')
export class ProductsController {
  constructor(
    private registerProduct: RegisterProductUseCase,
    private fetchProducts: FetchProductsUseCase,
    private editProduct: EditProductUseCase,
    private deleteProduct: DeleteProductUseCase
  ) {}

  @Post()
  @ApiOkResponse({ type: SingleProductResponseDto })
  async create(@Body() body: RegisterProductDto) {
    const { product } = await this.registerProduct.execute(body)

    return {
      product: ProductPresenter.toHTTP(product)
    }
  }

  @Get()
  @ApiOkResponse({ type: FetchProductsResponseDto })
  async list() {
    const { products } = await this.fetchProducts.execute()

    return {
      products: products.map(ProductPresenter.toHTTP)
    }
  }

  @Put(':id')
  @ApiOkResponse({ type: SingleProductResponseDto })
  async edit(@Param('id') id: string, @Body() body: EditProductDto) {
    const { product } = await this.editProduct.execute({ id, ...body })

    return {
      product: ProductPresenter.toHTTP(product)
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteOne(@Param('id') id: string) {
    await this.deleteProduct.execute({ id })
  }
}
