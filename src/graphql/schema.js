const { gql } = require('apollo-server-express')

module.exports = gql`
  type Query {
    users: [User]
    profile: User
  }

  type User {
    "用户名"
    name: String
    "用户邮箱"
    email: String
  }

  type Mutation {
    "注册"
    register (name: String!, email: String!, password: String!): String
    "登录"
    login (name: String!, password: String!): String
    "更新用户信息"
    updateProfile (email: String, password: String): String
  }
`