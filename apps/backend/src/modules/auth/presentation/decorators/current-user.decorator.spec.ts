import { type ExecutionContext } from '@nestjs/common'
import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants'
import { CurrentUser, type UserPayload } from './current-user.decorator'

// Helper to get the param decorator factory
function getParamDecoratorFactory(
  decorator: (...args: unknown[]) => ParameterDecorator
) {
  class Test {
    test(@decorator() _value: UserPayload) {}
  }

  const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, 'test')
  return args[Object.keys(args)[0]].factory
}

describe('CurrentUserDecorator', () => {
  it('should return the user from the request', () => {
    const factory = getParamDecoratorFactory(CurrentUser)
    const mockRequest = { user: { sub: 'user_id' } }
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest
      })
    } as unknown as ExecutionContext

    const result = factory(null, mockContext)

    expect(result).toEqual({ sub: 'user_id' })
  })
})
