import { OrderDetail } from './order-detail'

describe('OrderDetail Entity', () => {
  it('should be able to create an order detail', () => {
    const orderDetail = new OrderDetail({
      orderId: 'order-1',
      tableNumber: '10',
      comandaNumber: '123'
    })

    expect(orderDetail.id).toBeDefined()
    expect(orderDetail.orderId).toBe('order-1')
    expect(orderDetail.tableNumber).toBe('10')
    expect(orderDetail.comandaNumber).toBe('123')
  })

  it('should be able to update details', () => {
    const orderDetail = new OrderDetail({
      orderId: 'order-1',
      deliveryAddress: 'Old Address'
    })

    orderDetail.updateDetails({
      deliveryAddress: 'New Address',
      deliveryFee: 15.5
    })

    expect(orderDetail.deliveryAddress).toBe('New Address')
    expect(orderDetail.deliveryFee).toBe(15.5)
  })

  it('should handle delivery information', () => {
    const orderDetail = new OrderDetail({
      orderId: 'order-1',
      deliveryAddress: 'Main St, 100',
      deliveryFee: 10
    })

    expect(orderDetail.deliveryAddress).toBe('Main St, 100')
    expect(orderDetail.deliveryFee).toBe(10)
  })
})
