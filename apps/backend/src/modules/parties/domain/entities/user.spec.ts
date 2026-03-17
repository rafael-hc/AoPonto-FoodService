import { User, UserRole } from './user'

describe('User Entity', () => {
  it('should be able to create a new user', () => {
    const user = new User({
      login: 'johndoe',
      password: 'hashed-password',
      role: UserRole.ADMIN,
      contactId: 'contact-1'
    })

    expect(user.id).toBeDefined()
    expect(user.login).toBe('johndoe')
    expect(user.active).toBe(true)
  })

  it('should be able to update user details', () => {
    const user = new User({
      login: 'johndoe',
      password: 'hashed-password',
      role: UserRole.ADMIN,
      contactId: 'contact-1'
    })

    user.updateDetails({
      login: 'johnsmith',
      role: UserRole.KITCHEN
    })

    expect(user.login).toBe('johnsmith')
    expect(user.role).toBe(UserRole.KITCHEN)
    expect(user.updatedAt).toBeInstanceOf(Date)
  })

  it('should be able to soft delete a user', () => {
    const user = new User({
      login: 'johndoe',
      password: 'hashed-password',
      role: UserRole.ADMIN,
      contactId: 'contact-1'
    })

    user.delete()

    expect(user.deletedAt).toBeInstanceOf(Date)
    expect(user.active).toBe(false)
  })
})
