import faker from 'faker'
import { AddAccount } from '@/domain/usecases/account/add-account'
import { Authentication } from '@/domain/usecases/account/authentication'
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'

export class AddAccountSpy implements AddAccount {
  result = true
  addAccountParams: AddAccount.Params

  async add (account: AddAccount.Params): Promise<AddAccount.Result> {
    this.addAccountParams = account
    return this.result
  }
}

export class AuthenticationSpy implements Authentication {
  authenticationParams: Authentication.Params
  authenticationModel = {
    accessToken: faker.datatype.uuid(),
    name: faker.name.findName()
  }

  async auth (authenticationParams: Authentication.Params): Promise<Authentication.Result> {
    this.authenticationParams = authenticationParams
    return this.authenticationModel
  }
}

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  result = { id: faker.datatype.uuid() }
  accessToken: string
  role: string

  async load (accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
    this.accessToken = accessToken
    this.role = role
    return this.result
  }
}
