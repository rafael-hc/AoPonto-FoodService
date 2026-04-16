import { Unit } from '@/catalog/classifications/domain/entities/unit'

export abstract class UnitsRepository {
  abstract findById(id: string): Promise<Unit | null>
  abstract findMany(): Promise<Unit[]>
  abstract create(unit: Unit): Promise<void>
  abstract save(unit: Unit): Promise<void>
  abstract delete(id: string): Promise<void>
}
