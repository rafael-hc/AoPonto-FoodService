import { Injectable } from '@nestjs/common'
import { Label } from '@/catalog/domain/entities/label'
import { LabelsRepository } from '@/catalog/domain/repositories/labels-repository'
import { PrismaService } from '@/shared/database/prisma/prisma.service'
import { PrismaLabelMapper } from '../mappers/prisma-label-mapper'

@Injectable()
export class PrismaLabelsRepository implements LabelsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Label | null> {
    const label = await this.prisma.label.findUnique({
      where: { id }
    })

    if (!label) return null

    return PrismaLabelMapper.toDomain(label)
  }

  async findMany(): Promise<Label[]> {
    const labels = await this.prisma.label.findMany({
      where: { deleteDate: null }
    })

    return labels.map(PrismaLabelMapper.toDomain)
  }

  async create(label: Label): Promise<void> {
    const data = PrismaLabelMapper.toPrisma(label)

    await this.prisma.label.create({
      data
    })
  }

  async save(label: Label): Promise<void> {
    const data = PrismaLabelMapper.toPrisma(label)

    await this.prisma.label.update({
      where: { id: label.id },
      data
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.label.delete({
      where: { id }
    })
  }
}
