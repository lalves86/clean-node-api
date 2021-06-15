import { makeDbLoadAccountByToken } from '../usecases/account/db-load-account-by-token.ts/db-load-account-by-token-factory.ts'
import { Middleware } from '@/presentation/protocols'
import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'

export const makeAuthMiddleware = (role?: string): Middleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken(), role)
}
