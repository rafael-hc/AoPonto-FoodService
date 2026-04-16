import { Label } from '@/catalog/classifications/domain/entities/label'
import { LabelsRepository } from '@/catalog/classifications/domain/repositories/labels-repository'

export class InMemoryLabelsRepository implements LabelsRepository {
  public items: Label[] = []
  async findById(id: string): Promise<Label | null> {
    const label = this.items.find((item) => item.id === id)
    if (!label) return null
    return label
  }

  async findMany(): Promise<Label[]> {
    return this.items
  }

  async create(label: Label): Promise<void> {
    this.items.push(label)
  }

  async save(label: Label): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === label.id)
    if (itemIndex >= 0) {
      this.items[itemIndex] = label
    }
  }

  async delete(id: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === id)
    if (itemIndex >= 0) {
      this.items.splice(itemIndex, 1)
    }
  }
}
