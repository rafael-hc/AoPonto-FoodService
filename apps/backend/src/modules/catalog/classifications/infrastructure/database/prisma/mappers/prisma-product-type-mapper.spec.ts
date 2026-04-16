import { ProductType } from '@/catalog/classifications/domain/entities/product-type'
import { PrismaProductTypeMapper } from './prisma-product-type-mapper'

describe('PrismaProductTypeMapper', () => {
  it('should be able to map to domain', () => {
    const raw = {
      id: 'pt-1',
      description: 'Type 1',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const productType = PrismaProductTypeMapper.toDomain(raw)

    expect(productType.id).toBe('pt-1')
    expect(productType.description).toBe('Type 1')
  })

  it('should be able to map to prisma', () => {
    const productType = ProductType.create({
      description: 'Type 1'
    })

    const raw = PrismaProductTypeMapper.toPrisma(productType)

    expect(raw.id).toBe(productType.id)
    expect(raw.description).toBe('Type 1')
  })
})
