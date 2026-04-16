import { Label } from '@/catalog/classifications/domain/entities/label'
import { PrismaLabelMapper } from './prisma-label-mapper'

describe('PrismaLabelMapper', () => {
  it('should be able to map to domain', () => {
    const raw = {
      id: 'label-1',
      description: 'Label 1',
      order: 0,
      type: 'P',
      externalId: 'ext-1',
      deleteDate: null,
      versionReg: 1,
      versionSync: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const label = PrismaLabelMapper.toDomain(raw)

    expect(label.id).toBe('label-1')
    expect(label.description).toBe('Label 1')
  })

  it('should be able to map to prisma', () => {
    const label = Label.create({
      description: 'Label 1',
      externalId: 'ext-1'
    })

    const raw = PrismaLabelMapper.toPrisma(label)

    expect(raw.id).toBe(label.id)
    expect(raw.description).toBe('Label 1')
  })
})
