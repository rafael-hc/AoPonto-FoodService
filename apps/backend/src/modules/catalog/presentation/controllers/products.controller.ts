import { Body, Controller, Get, Post } from '@nestjs/common'
import { FetchProductsUseCase } from '@/catalog/application/use-cases/fetch-products.use-case'
import { RegisterProductUseCase } from '@/catalog/application/use-cases/register-product.use-case'
import { RegisterProductDto } from '@/catalog/presentation/dtos/register-product.dto'
import { ProductPresenter } from '@/catalog/presentation/presenters/product.presenter'

@Controller('/products')
export class ProductsController {
  constructor(
    private registerProduct: RegisterProductUseCase,
    private fetchProducts: FetchProductsUseCase
  ) {}

  @Post()
  async create(@Body() body: RegisterProductDto) {
    const { product } = await this.registerProduct.execute(body)

    return {
      product: ProductPresenter.toHTTP(product)
    }
  }

  @Get()
  async list() {
    const { products } = await this.fetchProducts.execute()

    return {
      products: products.map(ProductPresenter.toHTTP)
    }
  }
}
