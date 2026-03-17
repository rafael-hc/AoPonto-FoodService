import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/shared/database/prisma/prisma.service'
import type { ProductDetail } from '@/catalog/domain/entities/product-detail'
import type { ProductPersonalized } from '@/catalog/domain/entities/product-personalized'
import type { ProductSize } from '@/catalog/domain/entities/product-size'
import type {
  ProductDetailsRepository,
  ProductPersonalizedRepository,
  ProductSizesRepository
} from '@/catalog/domain/repositories/customization-repositories'
import { PrismaProductDetailMapper } from '../mappers/prisma-product-detail-mapper'
import { PrismaProductPersonalizedMapper } from '../mappers/prisma-product-personalized-mapper'
import { PrismaProductSizeMapper } from '../mappers/prisma-product-size-mapper'

@Injectable()
export class PrismaProductPersonalizedRepository
  implements ProductPersonalizedRepository
{
  constructor(private prisma: PrismaService) {}

  async create(productPersonalized: ProductPersonalized): Promise<void> {
    const data = PrismaProductPersonalizedMapper.toPrisma(productPersonalized)
    await this.prisma.productPersonalized.create({ data })
  }

  async save(productPersonalized: ProductPersonalized): Promise<void> {
    const data = PrismaProductPersonalizedMapper.toPrisma(productPersonalized)
    await this.prisma.productPersonalized.update({
      where: { id: data.id },
      data
    })
  }

  async findById(id: string): Promise<ProductPersonalized | null> {
    const raw = await this.prisma.productPersonalized.findUnique({
      where: { id }
    })
    return raw ? PrismaProductPersonalizedMapper.toDomain(raw) : null
  }

  async findByCode(code: number): Promise<ProductPersonalized | null> {
    const raw = await this.prisma.productPersonalized.findUnique({
      where: { code }
    })
    return raw ? PrismaProductPersonalizedMapper.toDomain(raw) : null
  }
}

@Injectable()
export class PrismaProductSizesRepository implements ProductSizesRepository {
  constructor(private prisma: PrismaService) {}

  async create(productSize: ProductSize): Promise<void> {
    const data = PrismaProductSizeMapper.toPrisma(productSize)
    await this.prisma.productSize.create({ data })
  }

  async save(productSize: ProductSize): Promise<void> {
    const data = PrismaProductSizeMapper.toPrisma(productSize)
    await this.prisma.productSize.update({
      where: { id: data.id },
      data
    })
  }

  async findById(id: string): Promise<ProductSize | null> {
    const raw = await this.prisma.productSize.findUnique({ where: { id } })
    return raw ? PrismaProductSizeMapper.toDomain(raw) : null
  }

  async findByCode(code: number): Promise<ProductSize | null> {
    const raw = await this.prisma.productSize.findUnique({ where: { code } })
    return raw ? PrismaProductSizeMapper.toDomain(raw) : null
  }

  async findByPersonalizedId(personalizedId: string): Promise<ProductSize[]> {
    const raws = await this.prisma.productSize.findMany({
      where: { productPersonalizedId: personalizedId }
    })
    return raws.map(PrismaProductSizeMapper.toDomain)
  }
}

@Injectable()
export class PrismaProductDetailsRepository
  implements ProductDetailsRepository
{
  constructor(private prisma: PrismaService) {}

  async create(productDetail: ProductDetail): Promise<void> {
    const data = PrismaProductDetailMapper.toPrisma(productDetail)
    await this.prisma.productDetail.create({ data })
  }

  async save(productDetail: ProductDetail): Promise<void> {
    const data = PrismaProductDetailMapper.toPrisma(productDetail)
    await this.prisma.productDetail.update({
      where: { id: data.id },
      data
    })
  }

  async findById(id: string): Promise<ProductDetail | null> {
    const raw = await this.prisma.productDetail.findUnique({ where: { id } })
    return raw ? PrismaProductDetailMapper.toDomain(raw) : null
  }

  async findByCode(code: number): Promise<ProductDetail | null> {
    const raw = await this.prisma.productDetail.findUnique({ where: { code } })
    return raw ? PrismaProductDetailMapper.toDomain(raw) : null
  }

  async findByProductId(productId: string): Promise<ProductDetail[]> {
    const raws = await this.prisma.productDetail.findMany({
      where: { productId }
    })
    return raws.map(PrismaProductDetailMapper.toDomain)
  }
}
