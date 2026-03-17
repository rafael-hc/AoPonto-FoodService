import { Unit } from '@/catalog/domain/entities/unit'
import { UnitsRepository } from '@/catalog/domain/repositories/units-repository'

export class InMemoryUnitsRepository implements UnitsRepository {
  public items: Unit[] = []

  async findById(id: string): Promise<Unit | null> {
    const unit = this.items.find((item) => item.id === id)
    if (!unit) return null
    return unit
  }

  async findMany(): Promise<Unit[]> {
    return this.items
  }

  async create(unit: Unit): Promise<void> {
    this.items.push(unit)
  }

  async save(unit: Unit): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === unit.id)
    if (itemIndex >= 0) {
      this.items[itemIndex] = unit
    }
  }

  async delete(id: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === id)
    if (itemIndex >= 0) {
      this.items.splice(itemIndex, 1)
    }
  }
}
