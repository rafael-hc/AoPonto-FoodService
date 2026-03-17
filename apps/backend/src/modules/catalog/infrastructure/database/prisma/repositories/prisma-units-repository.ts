import { Injectable } from '@nestjs/common'
import { Unit } from '@/catalog/domain/entities/unit'
import { UnitsRepository } from '@/catalog/domain/repositories/units-repository'
import { PrismaService } from '@/shared/database/prisma/prisma.service'
import { PrismaUnitMapper } from '../mappers/prisma-unit-mapper'

@Injectable()
export class PrismaUnitsRepository implements UnitsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Unit | null> {
    const unit = await this.prisma.unit.findUnique({
      where: { id }
    })

    if (!unit) return null

    return PrismaUnitMapper.toDomain(unit)
  }

  async findMany(): Promise<Unit[]> {
    const units = await this.prisma.unit.findMany()

    return units.map(PrismaUnitMapper.toDomain)
  }

  async create(unit: Unit): Promise<void> {
    const data = PrismaUnitMapper.toPrisma(unit)

    await this.prisma.unit.create({
      data
    })
  }

  async save(unit: Unit): Promise<void> {
    const data = PrismaUnitMapper.toPrisma(unit)

    await this.prisma.unit.update({
      where: { id: unit.id },
      data
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.unit.delete({
      where: { id }
    })
  }
}
