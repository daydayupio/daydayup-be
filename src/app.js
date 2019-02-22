const express = require('express')
const logger = require('./util/logger')
const { ApolloServer, ApolloError } = require('apollo-server-express')
const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')
const AuthController = require('./controllers/auth')
const ERROR_CODE = require('./config/errorCode')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const operationName = req.body.operationName
    if (operationName === 'IntrospectionQuery' || operationName === 'login' || operationName === 'register') {
      return {}
    }
    const authorization = req.headers.authorization || ''
    const user = await AuthController.getUserByAuthorization(authorization)
    if (!user) {
      if (!['login', 'register'].includes(operationName)) {
        throw new ApolloError(ERROR_CODE.NOT_LOGIN.message, ERROR_CODE.NOT_LOGIN.code)
      }
    }
    return { user }
  },
  formatError: error => {
    console.log(error)
    return error
  }
})

const app = express()
server.applyMiddleware({ app })

app.listen({ port: 4000 }, () =>
  logger().debug(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
