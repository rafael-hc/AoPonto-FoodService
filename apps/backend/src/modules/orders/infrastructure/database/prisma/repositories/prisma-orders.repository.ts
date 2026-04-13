import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { Order } from '@/orders/domain/entities/order'
import {
  OrderFilters,
  OrderRepository,
  PaginatedOrders
} from '@/orders/domain/repositories/order.repository'
import { PrismaService } from '@/shared/database/prisma/prisma.service'
import { PrismaOrderMapper } from '../mappers/prisma-order-mapper'

@Injectable()
export class PrismaOrdersRepository implements OrderRepository {
  constructor(private prisma: PrismaService) {}

  async create(order: Order): Promise<void> {
    const data = PrismaOrderMapper.toPrisma(order)
    const itemsData = order.items.map(PrismaOrderMapper.itemToPrisma)
    const detailsData = order.details
      ? PrismaOrderMapper.detailToPrisma(order.details)
      : null

    await this.prisma.order.create({
      data: {
        ...data,
        items: {
          create: itemsData
        },
        ...(detailsData && {
          details: {
            create: detailsData
          }
        })
      }
    })
  }

  async update(order: Order): Promise<void> {
    const data = PrismaOrderMapper.toPrisma(order)

    await this.prisma.$transaction(async (tx) => {
      // 1. Atualizar logica do header do pedido
      await tx.order.update({
        where: { id: order.id },
        data: {
          status: data.status,
          totalAmount: data.totalAmount,
          notes: data.notes,
          type: data.type,
          updatedAt: data.updatedAt
        }
      })

      // 2. Atualiza a tela de detalhes se existir
      if (order.details) {
        const detailsData = PrismaOrderMapper.detailToPrisma(order.details)
        await tx.orderDetail.upsert({
          where: { orderId: order.id },
          create: detailsData,
          update: detailsData
        })
      }

      // 3. Atualizar os Itens
      // Deletar itens que não existem mais e adicionar novos seria um cenário,
      // mas para simplificar, se você quiser só criar ou fazer upsert, faremos assim:
      const itemsData = order.items.map(PrismaOrderMapper.itemToPrisma)

      for (const item of itemsData) {
        await tx.orderItem.upsert({
          where: { id: item.id },
          create: item,
          update: item
        })
      }
    })
  }

  async findById(id: string): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: true,
        details: true
      }
    })

    if (!order) {
      return null
    }

    return PrismaOrderMapper.toDomain(order)
  }

  async findMany(filters?: OrderFilters): Promise<PaginatedOrders> {
    const where: Prisma.OrderWhereInput = {
      deletedAt: null
    }

    if (filters?.status) {
      where.status = filters.status
    }

    if (filters?.customerId) {
      where.customerId = filters.customerId
    }

    const page = filters?.page ?? 1
    const limit = filters?.limit ?? 10

    const skip = (page - 1) * limit

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        take: limit,
        skip,
        include: {
          items: true,
          details: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      }),
      this.prisma.order.count({ where })
    ])

    return {
      data: orders.map(PrismaOrderMapper.toDomain),
      total,
      page,
      limit
    }
  }
}
