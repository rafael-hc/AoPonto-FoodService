import { Label } from '@/catalog/domain/entities/label'

export abstract class LabelsRepository {
  abstract findById(id: string): Promise<Label | null>
  abstract findMany(): Promise<Label[]>
  abstract create(label: Label): Promise<void>
  abstract save(label: Label): Promise<void>
  abstract delete(id: string): Promise<void>
}
