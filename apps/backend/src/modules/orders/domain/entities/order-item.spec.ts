import { OrderItem } from './order-item'

describe('OrderItem Entity', () => {
  it('should be able to create an order item', () => {
    const orderItem = new OrderItem({
      orderId: 'order-1',
      productId: 'product-1',
      quantity: 2,
      unitPrice: 10,
      totalPrice: 20,
      notes: 'No onions'
    })

    expect(orderItem.id).toBeDefined()
    expect(orderItem.quantity).toBe(2)
    expect(orderItem.totalPrice).toBe(20)
  })

  it('should have optional notes', () => {
    const orderItem = new OrderItem({
      orderId: 'order-1',
      productId: 'product-1',
      quantity: 1,
      unitPrice: 50,
      totalPrice: 50
    })

    expect(orderItem.notes).toBeUndefined()
  })
})
