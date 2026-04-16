import type {
  Prisma,
  ProductWizard as PrismaProductWizard,
  WizardQuestion as PrismaWizardQuestion
} from '@prisma/client'
import { ProductWizard } from '@/catalog/wizard/domain/entities/product-wizard'
import { PrismaWizardQuestionMapper } from './prisma-wizard-question-mapper'

type PrismaProductWizardWithRelations = PrismaProductWizard & {
  wizardQuestion?: PrismaWizardQuestion
}

export const PrismaProductWizardMapper = {
  toDomain(raw: PrismaProductWizardWithRelations): ProductWizard {
    return new ProductWizard({
      id: raw.id,
      productId: raw.productId,
      wizardQuestionId: raw.wizardQuestionId,
      order: raw.order,
      wizardQuestion: raw.wizardQuestion
        ? PrismaWizardQuestionMapper.toDomain(raw.wizardQuestion)
        : undefined,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt
    })
  },

  toPrisma(
    productWizard: ProductWizard
  ): Prisma.ProductWizardUncheckedCreateInput {
    return {
      id: productWizard.id,
      productId: productWizard.productId,
      wizardQuestionId: productWizard.wizardQuestionId,
      order: productWizard.order,
      createdAt: productWizard.createdAt,
      updatedAt: productWizard.updatedAt
    }
  }
}
