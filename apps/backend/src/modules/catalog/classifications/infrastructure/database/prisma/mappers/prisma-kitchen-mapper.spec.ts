import { Kitchen } from '@/catalog/classifications/domain/entities/kitchen'
import { PrismaKitchenMapper } from './prisma-kitchen-mapper'

describe('PrismaKitchenMapper', () => {
  it('should be able to map to domain', () => {
    const raw = {
      id: 'kitchen-1',
      description: 'Kitchen 1',
      ip: '192.168.0.1',
      port: '8080',
      printer: 'Printer 1',
      versionReg: 1,
      versionSync: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const kitchen = PrismaKitchenMapper.toDomain(raw)

    expect(kitchen.id).toBe('kitchen-1')
    expect(kitchen.description).toBe('Kitchen 1')
  })

  it('should be able to map to prisma', () => {
    const kitchen = Kitchen.create({
      description: 'Kitchen 1',
      ip: '192.168.0.1',
      port: '8080',
      printer: 'Printer 1'
    })

    const raw = PrismaKitchenMapper.toPrisma(kitchen)

    expect(raw.id).toBe(kitchen.id)
    expect(raw.description).toBe('Kitchen 1')
  })
})
