import { Label } from '@/catalog/classifications/domain/entities/label'

export const LabelPresenter = {
  toHTTP(label: Label) {
    return {
      id: label.id,
      description: label.description,
      order: label.order,
      type: label.type,
      externalId: label.externalId,
      deleteDate: label.deleteDate,
      versionReg: label.versionReg,
      versionSync: label.versionSync,
      createdAt: label.createdAt,
      updatedAt: label.updatedAt
    }
  }
}
