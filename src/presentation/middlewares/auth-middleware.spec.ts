import { AuthMiddleware } from './auth-middleware'
import { forbidden } from '../helper/http/http-helper'
import { AccessDeniedError } from '../errors'

describe('Auth Middleware', () => {
  test('should return 403 if no x-access-token exists in headers', async () => {
    const sut = new AuthMiddleware()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
})
