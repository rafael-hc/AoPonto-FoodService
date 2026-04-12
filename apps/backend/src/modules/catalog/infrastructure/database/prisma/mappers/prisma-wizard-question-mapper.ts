import type {
  Prisma,
  WizardOption as PrismaWizardOption,
  WizardQuestion as PrismaWizardQuestion
} from '@prisma/client'
import { WizardQuestion } from '@/catalog/domain/entities/wizard-question'
import { PrismaWizardOptionMapper } from './prisma-wizard-option-mapper'

type PrismaWizardQuestionWithRelations = PrismaWizardQuestion & {
  options?: PrismaWizardOption[]
}

export const PrismaWizardQuestionMapper = {
  toDomain(raw: PrismaWizardQuestionWithRelations): WizardQuestion {
    return new WizardQuestion({
      id: raw.id,
      internalCode: raw.internalCode,
      description: raw.description,
      context: raw.context as 'PRODUCT' | 'COMBO',
      minResponses: raw.minResponses,
      maxResponses: raw.maxResponses,
      minItems: Number(raw.minItems),
      maxItems: Number(raw.maxItems),
      options: raw.options?.map(PrismaWizardOptionMapper.toDomain),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt
    })
  },

  toPrisma(
    question: WizardQuestion
  ): Prisma.WizardQuestionUncheckedCreateInput {
    return {
      id: question.id,
      internalCode: question.internalCode,
      description: question.description,
      context: question.context,
      minResponses: question.minResponses,
      maxResponses: question.maxResponses,
      minItems: question.minItems,
      maxItems: question.maxItems,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
      deletedAt: question.deletedAt
    }
  }
}
