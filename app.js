const express = require('express')
const logger = require('./util/logger')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const AuthController = require('./controllers/auth')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    if (req.body.operationName === 'IntrospectionQuery') {
      return {}
    }
    const token = req.headers.authorization || ''
    const user = AuthController.getUserByToken(token)
    if (!user) {
      if (process.env.NODE_ENV === 'production') {
        throw new Error('not logged in')
      }
    }
    return { user }
  },
})

const app = express()
server.applyMiddleware({ app })

app.listen({ port: 4000 }, () =>
  logger.debug(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
