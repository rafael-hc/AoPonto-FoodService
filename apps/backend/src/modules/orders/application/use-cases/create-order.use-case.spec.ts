import { Product } from '@/catalog/domain/entities/product'
import { TaxMetadata } from '@/catalog/domain/entities/value-objects/product-tax-metadata'
import { InMemoryProductsRepository } from '@/catalog/test/repositories/in-memory-products-repository'
import { OrderType } from '../../domain/entities/order'
import { InMemoryOrdersRepository } from '../../test/repositories/in-memory-orders-repository'
import { CreateOrderUseCase } from './create-order.use-case'

describe('Create Order Use Case', () => {
  let ordersRepository: InMemoryOrdersRepository
  let productsRepository: InMemoryProductsRepository
  let sut: CreateOrderUseCase

  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository()
    productsRepository = new InMemoryProductsRepository()
    sut = new CreateOrderUseCase(ordersRepository, productsRepository)
  })

  it('should be able to create an order', async () => {
    const product = new Product({
      name: 'Test Product',
      price: 15.5,
      unitId: 'unit-1',
      productTypeId: 'type-1',
      taxMetadata: TaxMetadata.create({
        ncm: '12345678',
        cfopId: 'cfop-1',
        originId: 'origin-1',
        icmsModalityId: 'mod-1',
        isServiceTaxExempt: false
      })
    })

    await productsRepository.create(product)

    const { order } = await sut.execute({
      type: OrderType.COUNTER,
      items: [
        {
          productId: product.id,
          quantity: 2,
          notes: 'No salt'
        }
      ],
      notes: 'General notes'
    })

    expect(order.id).toBeDefined()
    expect(order.totalAmount).toBe(31)
    expect(ordersRepository.items[0].id).toBe(order.id)
    expect(order.items).toHaveLength(1)
    expect(order.items[0].totalPrice).toBe(31)
  })

  it('should calculate total with delivery fee', async () => {
    const product = new Product({
      name: 'Test Product',
      price: 10,
      unitId: 'unit-1',
      productTypeId: 'type-1',
      taxMetadata: TaxMetadata.create({
        ncm: '12345678',
        cfopId: 'cfop-1',
        originId: 'origin-1',
        icmsModalityId: 'mod-1',
        isServiceTaxExempt: false
      })
    })

    await productsRepository.create(product)

    const { order } = await sut.execute({
      type: OrderType.DELIVERY,
      items: [
        {
          productId: product.id,
          quantity: 1
        }
      ],
      deliveryFee: 5,
      deliveryAddress: 'Main St, 123'
    })

    expect(order.totalAmount).toBe(15)
    expect(order.details?.deliveryFee).toBe(5)
  })

  it('should not be able to create an order without items', async () => {
    await expect(
      sut.execute({
        type: OrderType.COUNTER,
        items: []
      })
    ).rejects.toThrow('Order must have at least one item')
  })

  it('should not be able to create an order with non-existing product', async () => {
    await expect(
      sut.execute({
        type: OrderType.COUNTER,
        items: [
          {
            productId: 'non-existing-product',
            quantity: 1
          }
        ]
      })
    ).rejects.toThrow('Product non-existing-product not found')
  })
})
