import type { Prisma, WizardOption as PrismaWizardOption } from '@prisma/client'
import { WizardOption } from '@/catalog/wizard/domain/entities/wizard-option'

export const PrismaWizardOptionMapper = {
  toDomain(raw: PrismaWizardOption): WizardOption {
    return new WizardOption({
      id: raw.id,
      description: raw.description,
      wizardQuestionId: raw.wizardQuestionId,
      productId: raw.productId,
      promoPrice: raw.promoPrice ? Number(raw.promoPrice) : null,
      maxQty: Number(raw.maxQty),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt
    })
  },

  toPrisma(option: WizardOption): Prisma.WizardOptionUncheckedCreateInput {
    return {
      id: option.id,
      description: option.description,
      wizardQuestionId: option.wizardQuestionId,
      productId: option.productId,
      promoPrice: option.promoPrice,
      maxQty: option.maxQty,
      createdAt: option.createdAt,
      updatedAt: option.updatedAt,
      deletedAt: option.deletedAt
    }
  }
}
