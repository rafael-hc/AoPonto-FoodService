import { Kitchen } from '@/catalog/domain/entities/kitchen'

export const KitchenPresenter = {
  toHTTP(kitchen: Kitchen) {
    return {
      id: kitchen.id,
      description: kitchen.description,
      ip: kitchen.ip,
      port: kitchen.port,
      printer: kitchen.printer,
      versionReg: kitchen.versionReg,
      versionSync: kitchen.versionSync,
      createdAt: kitchen.createdAt,
      updatedAt: kitchen.updatedAt
    }
  }
}
