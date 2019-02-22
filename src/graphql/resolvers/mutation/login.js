const logger = require('../../../util/logger')
const jwt = require('../../../util/jwt')
const pw = require('../../../util/password')
const UserModel = require('../../../models/user')
const ERROR_CODE = require('../../../config/errorCode')
const {ApolloError} = require('apollo-server-express')

module.exports = async function (parent, { name, password }, context) {
  const user = await UserModel.validate({ name, password })
  if (!user) {
    throw new ApolloError(ERROR_CODE.INVALID_LOGIN.message, ERROR_CODE.INVALID_LOGIN.code)
  }
  const { id, name: userName } = user
  const token = jwt.sign({ id, name: userName })

  await UserModel.updateToken({ userId: id, token })

  return token
}