const { gql } = require('apollo-server-express')

module.exports = gql`
  type Query {
    users: [User]
    jwt: String
  }

  type User {
    name: String
    password_digest: String
    email: String
  }

  type Mutation {
    register (name: String!, email: String!, password: String!): String
    login (name: String!, password: String!): String
  }
`