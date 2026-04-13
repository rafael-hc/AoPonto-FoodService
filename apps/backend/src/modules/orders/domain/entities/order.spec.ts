import { Order, OrderStatus, OrderType } from './order'
import { OrderDetail } from './order-detail'
import { OrderItem } from './order-item'

describe('Order Entity', () => {
  it('should be able to create an order', () => {
    const order = new Order({
      code: 1,
      status: OrderStatus.PENDING,
      type: OrderType.COUNTER,
      totalAmount: 0
    })

    expect(order.id).toBeDefined()
    expect(order.status).toBe(OrderStatus.PENDING)
  })

  it('should be able to change order status', () => {
    const order = new Order({
      code: 1,
      status: OrderStatus.PENDING,
      type: OrderType.COUNTER,
      totalAmount: 0
    })

    order.changeStatus(OrderStatus.PREPARING)
    expect(order.status).toBe(OrderStatus.PREPARING)
  })

  it('should calculate total based on items', () => {
    const order = new Order({
      code: 1,
      status: OrderStatus.PENDING,
      type: OrderType.COUNTER,
      totalAmount: 0
    })

    const item1 = new OrderItem({
      orderId: order.id,
      productId: 'p1',
      quantity: 1,
      unitPrice: 10,
      totalPrice: 10
    })

    const item2 = new OrderItem({
      orderId: order.id,
      productId: 'p2',
      quantity: 2,
      unitPrice: 5,
      totalPrice: 10
    })

    order.addItem(item1)
    expect(order.totalAmount).toBe(10)

    order.addItem(item2)
    expect(order.totalAmount).toBe(20)
  })

  it('should calculate total with delivery fee', () => {
    const order = new Order({
      code: 1,
      status: OrderStatus.PENDING,
      type: OrderType.DELIVERY,
      totalAmount: 0
    })

    const item = new OrderItem({
      orderId: order.id,
      productId: 'p1',
      quantity: 1,
      unitPrice: 20,
      totalPrice: 20
    })

    const details = new OrderDetail({
      orderId: order.id,
      deliveryAddress: 'Street 1',
      deliveryFee: 7.5
    })

    order.addItem(item)
    order.updateDetails(details)

    expect(order.totalAmount).toBe(27.5)
  })

  it('should recalculate total when an item is removed', () => {
    const order = new Order({
      code: 1,
      status: OrderStatus.PENDING,
      type: OrderType.COUNTER,
      totalAmount: 0
    })

    const item1 = new OrderItem({
      orderId: order.id,
      productId: 'p1',
      quantity: 1,
      unitPrice: 10,
      totalPrice: 10
    })

    const item2 = new OrderItem({
      orderId: order.id,
      productId: 'p2',
      quantity: 1,
      unitPrice: 5,
      totalPrice: 5
    })

    order.addItem(item1)
    order.addItem(item2)
    expect(order.totalAmount).toBe(15)

    order.removeItem(item1.id)
    expect(order.totalAmount).toBe(5)
  })
})
