import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  sign (): string {
    return 'any_token'
  }
}))

describe('Jwt Adapter', () => {
  test('should call sign with correct values', () => {
    const sut = new JwtAdapter('secret')
    const signSpy = jest.spyOn(jwt, 'sign')
    sut.encrypt('any_id')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
  })

  test('should return a token on sign success', () => {
    const sut = new JwtAdapter('secret')
    const accessToken = sut.encrypt('any_id')
    expect(accessToken).toBe('any_token')
  })
})
