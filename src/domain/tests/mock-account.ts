import { Authentication } from '@/data/usecases/account/authentication/db-authentication-protocols'
import { AddAccount } from '@/domain/usecases/account/add-account'
import faker from 'faker'

export const mockAddAccountParams = (): AddAccount.Params => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
