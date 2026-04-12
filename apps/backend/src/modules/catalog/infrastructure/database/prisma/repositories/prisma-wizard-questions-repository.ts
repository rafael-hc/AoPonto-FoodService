import { Injectable } from '@nestjs/common'
import { WizardQuestion } from '@/catalog/domain/entities/wizard-question'
import { WizardQuestionsRepository } from '@/catalog/domain/repositories/wizard-repositories'
import { PrismaService } from '@/shared/database/prisma/prisma.service'
import { PrismaWizardOptionMapper } from '../mappers/prisma-wizard-option-mapper'
import { PrismaWizardQuestionMapper } from '../mappers/prisma-wizard-question-mapper'

@Injectable()
export class PrismaWizardQuestionsRepository
  implements WizardQuestionsRepository
{
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<WizardQuestion | null> {
    const question = await this.prisma.wizardQuestion.findUnique({
      where: { id },
      include: { options: { where: { deletedAt: null } } }
    })

    if (!question) return null

    return PrismaWizardQuestionMapper.toDomain(question)
  }

  async findByCode(code: number): Promise<WizardQuestion | null> {
    const question = await this.prisma.wizardQuestion.findUnique({
      where: { internalCode: code },
      include: { options: { where: { deletedAt: null } } }
    })

    if (!question) return null

    return PrismaWizardQuestionMapper.toDomain(question)
  }

  async findMany(params?: { search?: string }): Promise<WizardQuestion[]> {
    const questions = await this.prisma.wizardQuestion.findMany({
      where: {
        deletedAt: null,
        ...(params?.search && {
          description: { contains: params.search, mode: 'insensitive' }
        })
      },
      include: { options: { where: { deletedAt: null } } },
      orderBy: { description: 'asc' }
    })

    return questions.map(PrismaWizardQuestionMapper.toDomain)
  }

  async create(wizardQuestion: WizardQuestion): Promise<void> {
    const data = PrismaWizardQuestionMapper.toPrisma(wizardQuestion)
    const options = (
      wizardQuestion.options?.map(PrismaWizardOptionMapper.toPrisma) ?? []
    ).map((opt) => {
      const { wizardQuestionId, ...rest } = opt
      return rest
    })

    await this.prisma.wizardQuestion.create({
      data: {
        ...data,
        options: {
          createMany: {
            data: options
          }
        }
      }
    })
  }

  async save(wizardQuestion: WizardQuestion): Promise<void> {
    const data = PrismaWizardQuestionMapper.toPrisma(wizardQuestion)
    const options = wizardQuestion.options ?? []

    await this.prisma.$transaction(async (tx) => {
      // 1. Atualizar a pergunta
      await tx.wizardQuestion.update({
        where: { id: wizardQuestion.id },
        data
      })

      // 2. Gerenciar opções (Simples: Deleta e Recria ou Upsert)
      // Para manter histórico e IDs, vamos usar Upsert manual ou Deletar/Criar se a lógica for simples.
      // Neste caso, vamos marcar como deletado as que não estão no array atual e upsert nas novas.

      const currentOptionIds = options.filter((o) => !!o.id).map((o) => o.id)

      // Marcar como deletado as opções que não vieram no payload
      await tx.wizardOption.updateMany({
        where: {
          wizardQuestionId: wizardQuestion.id,
          id: { notIn: currentOptionIds },
          deletedAt: null
        },
        data: { deletedAt: new Date() }
      })

      // Upsert nas opções enviadas
      for (const option of options) {
        const optionData = PrismaWizardOptionMapper.toPrisma(option)
        await tx.wizardOption.upsert({
          where: { id: option.id },
          create: optionData,
          update: optionData
        })
      }
    })
  }

  async delete(wizardQuestion: WizardQuestion): Promise<void> {
    await this.prisma.wizardQuestion.update({
      where: { id: wizardQuestion.id },
      data: { deletedAt: new Date() }
    })
  }
}
