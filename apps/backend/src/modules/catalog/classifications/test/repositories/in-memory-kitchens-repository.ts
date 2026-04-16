import { Kitchen } from '@/catalog/classifications/domain/entities/kitchen'
import { KitchensRepository } from '@/catalog/classifications/domain/repositories/kitchens-repository'

export class InMemoryKitchensRepository implements KitchensRepository {
  public items: Kitchen[] = []

  async delete(id: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === id)
    if (itemIndex === -1) return
    this.items.splice(itemIndex, 1)
  }

  async findById(id: string): Promise<Kitchen | null> {
    const kitchen = this.items.find((item) => item.id === id)
    if (!kitchen) return null
    return kitchen
  }

  async findMany(): Promise<Kitchen[]> {
    return this.items
  }

  async create(kitchen: Kitchen): Promise<void> {
    this.items.push(kitchen)
  }

  async save(kitchen: Kitchen): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === kitchen.id)
    this.items[itemIndex] = kitchen
  }
}
