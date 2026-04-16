import type { Kitchen } from '../entities/kitchen'

export abstract class KitchensRepository {
  abstract findById(id: string): Promise<Kitchen | null>
  abstract findMany(): Promise<Kitchen[]>
  abstract create(kitchen: Kitchen): Promise<void>
  abstract save(kitchen: Kitchen): Promise<void>
  abstract delete(id: string): Promise<void>
}
