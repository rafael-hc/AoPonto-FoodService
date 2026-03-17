import { BaseEntity, BaseEntityProps } from './base-entity'

interface StubProps extends BaseEntityProps {
  name: string
}

class StubEntity extends BaseEntity<StubProps> {
  static create(props: StubProps) {
    return new StubEntity(props)
  }

  get name() {
    return this.props.name
  }
}

describe('BaseEntity', () => {
  it('should be able to create a new entity with default props', () => {
    const entity = StubEntity.create({ name: 'Test' })

    expect(entity.id).toBeDefined()
    expect(entity.active).toBe(true)
    expect(entity.createdAt).toBeInstanceOf(Date)
    expect(entity.updatedAt).toBeInstanceOf(Date)
    expect(entity.deletedAt).toBeUndefined()
  })

  it('should be able to create an entity with custom props', () => {
    const id = 'custom-id'
    const createdAt = new Date()
    const entity = StubEntity.create({
      id,
      name: 'Test',
      active: false,
      createdAt
    })

    expect(entity.id).toBe(id)
    expect(entity.active).toBe(false)
    expect(entity.createdAt).toBe(createdAt)
  })

  it('should be able to activate an entity', () => {
    const entity = StubEntity.create({ name: 'Test', active: false })

    entity.activate()

    expect(entity.active).toBe(true)
    expect(entity.updatedAt).toBeInstanceOf(Date)
  })

  it('should be able to deactivate an entity', () => {
    const entity = StubEntity.create({ name: 'Test', active: true })

    entity.deactivate()

    expect(entity.active).toBe(false)
    expect(entity.updatedAt).toBeInstanceOf(Date)
  })

  it('should be able to soft delete an entity', () => {
    const entity = StubEntity.create({ name: 'Test' })

    entity.delete()

    expect(entity.deletedAt).toBeInstanceOf(Date)
    expect(entity.active).toBe(false)
    expect(entity.updatedAt).toBeInstanceOf(Date)
  })
})
