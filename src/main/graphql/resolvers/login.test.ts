import { Collection } from 'mongodb'
import { hash } from 'bcrypt'
import { createTestClient } from 'apollo-server-integration-testing'
import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { ApolloServer, gql } from 'apollo-server-express'
import { makeApolloServer } from '../tests/helpers'

let accountCollection: Collection
let apolloServer: ApolloServer

describe('Login GraphQL', () => {
  beforeAll(async () => {
    apolloServer = makeApolloServer()
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('Login Query', () => {
    const loginQuery = gql`
      query login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          accessToken
          name
        }
      }
    `
    test('Should return an Account on valid credentials', async () => {
      const password = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'Lucas',
        email: 'lucas@email.com',
        password
      })
      const { query } = createTestClient({ apolloServer })
      const res: any = await query(loginQuery, {
        variables: {
          email: 'lucas@email.com',
          password: '123'
        }
      })
      expect(res.data.login.accessToken).toBeTruthy()
      expect(res.data.login.name).toBe('Lucas')
    })

    test('Should return an UnauthorizedError on invalid credentials  ', async () => {
      const { query } = createTestClient({ apolloServer })
      const res: any = await query(loginQuery, {
        variables: {
          email: 'lucas@email.com',
          password: '123'
        }
      })
      expect(res.data).toBeFalsy()
      expect(res.errors[0].message).toBe('Unauthorized')
    })
  })

  describe('Signup Mutation', () => {
    const signupMutation = gql`
      mutation signup($name: String!, $email: String!, $password: String!, $passwordConfirmation: String!) {
        signup(name: $name, email: $email, password: $password, , passwordConfirmation: $passwordConfirmation) {
          accessToken
          name
        }
      }
    `
    test('Should return an Account on valid data', async () => {
      const { mutate } = createTestClient({ apolloServer })
      const res: any = await mutate(signupMutation, {
        variables: {
          name: 'Lucas',
          email: 'lucas@email.com',
          password: '123',
          passwordConfirmation: '123'
        }
      })
      expect(res.data.signup.accessToken).toBeTruthy()
      expect(res.data.signup.name).toBe('Lucas')
    })

    test('Should return EmailInUseError on invalid data', async () => {
      const password = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'Lucas',
        email: 'lucas@email.com',
        password
      })
      const { mutate } = createTestClient({ apolloServer })
      const res: any = await mutate(signupMutation, {
        variables: {
          name: 'Lucas',
          email: 'lucas@email.com',
          password: '123',
          passwordConfirmation: '123'
        }
      })
      expect(res.data).toBeFalsy()
      expect(res.errors[0].message).toBe('The received e-mail is already in use')
    })
  })
})
