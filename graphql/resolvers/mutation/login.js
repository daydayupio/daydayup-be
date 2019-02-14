const logger = require('../../../util/logger')
const jwt = require('../../../util/jwt')
const pw = require('../../../util/password')
const UserModel = require('../../../models/user')

module.exports = async function (parent, { name, password }, context) {
  const user = await UserModel.validate({ name, password })
  if (!user) {
    throw new Error('username or password is incorrect')
  }
  const { id, name: userName } = user
  return jwt.sign({ id, name: userName })
}