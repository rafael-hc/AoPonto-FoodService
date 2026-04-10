import { BcryptHasher } from './bcrypt-hasher'

describe('BcryptHasher', () => {
  let sut: BcryptHasher

  beforeEach(() => {
    sut = new BcryptHasher()
  })

  it('should hash a string', async () => {
    const result = await sut.hash('password123')

    expect(result).toBeDefined()
    expect(result).not.toBe('password123')
    expect(result.length).toBeGreaterThan(10)
  })

  it('should compare a plain text with a hash', async () => {
    const password = 'password123'
    const hashed = await sut.hash(password)

    const result = await sut.compare(password, hashed)

    expect(result).toBe(true)
  })

  it('should return false if comparison fails', async () => {
    const password = 'password123'
    const hashed = await sut.hash(password)

    const result = await sut.compare('wrong-password', hashed)

    expect(result).toBe(false)
  })
})
