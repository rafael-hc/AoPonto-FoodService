import { WizardQuestion } from '@/catalog/domain/entities/wizard-question'
import { WizardQuestionsRepository } from '@/catalog/domain/repositories/wizard-repositories'

export class InMemoryWizardQuestionsRepository
  implements WizardQuestionsRepository
{
  public items: WizardQuestion[] = []

  async findById(id: string): Promise<WizardQuestion | null> {
    const item = this.items.find((i) => i.id === id)
    return item || null
  }

  async findByCode(code: number): Promise<WizardQuestion | null> {
    const item = this.items.find((i) => i.internalCode === code)
    return item || null
  }

  async findMany(params?: { search?: string }): Promise<WizardQuestion[]> {
    let filteredItems = this.items.filter((i) => !i.deletedAt)

    if (params?.search) {
      filteredItems = filteredItems.filter((i) =>
        i.description.toLowerCase().includes(params.search?.toLowerCase() ?? '')
      )
    }

    return filteredItems
  }

  async create(wizardQuestion: WizardQuestion): Promise<void> {
    this.items.push(wizardQuestion)
  }

  async save(wizardQuestion: WizardQuestion): Promise<void> {
    const index = this.items.findIndex((i) => i.id === wizardQuestion.id)
    if (index >= 0) {
      this.items[index] = wizardQuestion
    }
  }

  async delete(wizardQuestion: WizardQuestion): Promise<void> {
    const index = this.items.findIndex((i) => i.id === wizardQuestion.id)
    if (index >= 0) {
      this.items[index].delete()
    }
  }
}
