import {
  Order as PrismaOrder,
  OrderDetail as PrismaOrderDetail,
  OrderItem as PrismaOrderItem,
  OrderStatus as PrismaOrderStatus,
  OrderType as PrismaOrderType
} from '@prisma/client'
import { Order, OrderStatus, OrderType } from '@/orders/domain/entities/order'
import { OrderDetail } from '@/orders/domain/entities/order-detail'
import { OrderItem } from '@/orders/domain/entities/order-item'

export const PrismaOrderMapper = {
  toDomain(
    raw: PrismaOrder & {
      items?: PrismaOrderItem[]
      details?: PrismaOrderDetail | null
    }
  ): Order {
    return new Order({
      id: raw.id,
      code: raw.code,
      status: raw.status as OrderStatus,
      type: raw.type as OrderType,
      totalAmount: Number(raw.totalAmount),
      notes: raw.notes,
      customerId: raw.customerId,
      items: raw.items?.map(
        (item) =>
          new OrderItem({
            id: item.id,
            orderId: item.orderId,
            productId: item.productId,
            quantity: Number(item.quantity),
            unitPrice: Number(item.unitPrice),
            totalPrice: Number(item.totalPrice),
            notes: item.notes,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
          })
      ),
      details: raw.details
        ? new OrderDetail({
            id: raw.details.id,
            orderId: raw.details.orderId,
            tableNumber: raw.details.tableNumber,
            comandaNumber: raw.details.comandaNumber,
            deliveryAddress: raw.details.deliveryAddress,
            deliveryFee: raw.details.deliveryFee
              ? Number(raw.details.deliveryFee)
              : null
          })
        : null,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt
    })
  },

  toPrisma(order: Order) {
    return {
      id: order.id,
      code: order.code,
      status: order.status as PrismaOrderStatus,
      type: order.type as PrismaOrderType,
      totalAmount: order.totalAmount,
      notes: order.notes,
      customerId: order.customerId,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      deletedAt: order.deletedAt || null
    }
  },

  itemToPrisma(item: OrderItem) {
    return {
      id: item.id,
      orderId: item.orderId,
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: item.totalPrice,
      notes: item.notes,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    }
  },

  detailToPrisma(detail: OrderDetail) {
    return {
      id: detail.id,
      orderId: detail.orderId,
      tableNumber: detail.tableNumber,
      comandaNumber: detail.comandaNumber,
      deliveryAddress: detail.deliveryAddress,
      deliveryFee: detail.deliveryFee
    }
  }
}
