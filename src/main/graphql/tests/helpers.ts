import { ApolloServer } from 'apollo-server-express'
import resolvers from '../resolvers'
import typeDefs from '../type-defs'
import schemaDirectives from '../directives'

export const makeApolloServer = (): ApolloServer => new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives,
  context: ({ req }) => ({ req })
})
