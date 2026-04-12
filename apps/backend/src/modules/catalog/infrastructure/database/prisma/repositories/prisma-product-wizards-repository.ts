import { Injectable } from '@nestjs/common'
import { ProductWizard } from '@/catalog/domain/entities/product-wizard'
import { ProductWizardsRepository } from '@/catalog/domain/repositories/wizard-repositories'
import { PrismaService } from '@/shared/database/prisma/prisma.service'
import { PrismaProductWizardMapper } from '../mappers/prisma-product-wizard-mapper'

@Injectable()
export class PrismaProductWizardsRepository implements ProductWizardsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<ProductWizard | null> {
    const item = await this.prisma.productWizard.findUnique({
      where: { id },
      include: { wizardQuestion: true }
    })

    if (!item) return null

    return PrismaProductWizardMapper.toDomain(item)
  }

  async findByProductId(productId: string): Promise<ProductWizard[]> {
    const items = await this.prisma.productWizard.findMany({
      where: { productId },
      include: { wizardQuestion: true },
      orderBy: { order: 'asc' }
    })

    return items.map(PrismaProductWizardMapper.toDomain)
  }

  async create(productWizard: ProductWizard): Promise<void> {
    const data = PrismaProductWizardMapper.toPrisma(productWizard)

    await this.prisma.productWizard.create({
      data
    })
  }

  async save(productWizard: ProductWizard): Promise<void> {
    const data = PrismaProductWizardMapper.toPrisma(productWizard)

    await this.prisma.productWizard.update({
      where: { id: productWizard.id },
      data
    })
  }

  async delete(productWizard: ProductWizard): Promise<void> {
    await this.prisma.productWizard.delete({
      where: { id: productWizard.id }
    })
  }

  async deleteManyByProductId(productId: string): Promise<void> {
    await this.prisma.productWizard.deleteMany({
      where: { productId }
    })
  }
}
