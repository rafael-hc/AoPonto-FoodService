import { Injectable } from '@nestjs/common'
import { Kitchen } from '@/catalog/domain/entities/kitchen'
import { KitchensRepository } from '@/catalog/domain/repositories/kitchens-repository'
import { PrismaService } from '@/shared/database/prisma/prisma.service'
import { PrismaKitchenMapper } from '../mappers/prisma-kitchen-mapper'

@Injectable()
export class PrismaKitchensRepository implements KitchensRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Kitchen | null> {
    const kitchen = await this.prisma.kitchen.findUnique({
      where: { id }
    })

    if (!kitchen) return null

    return PrismaKitchenMapper.toDomain(kitchen)
  }

  async findMany(): Promise<Kitchen[]> {
    const kitchens = await this.prisma.kitchen.findMany()

    return kitchens.map(PrismaKitchenMapper.toDomain)
  }

  async create(kitchen: Kitchen): Promise<void> {
    const data = PrismaKitchenMapper.toPrisma(kitchen)

    await this.prisma.kitchen.create({
      data
    })
  }

  async save(kitchen: Kitchen): Promise<void> {
    const data = PrismaKitchenMapper.toPrisma(kitchen)

    await this.prisma.kitchen.update({
      where: { id: kitchen.id },
      data
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.kitchen.delete({
      where: { id }
    })
  }
}
