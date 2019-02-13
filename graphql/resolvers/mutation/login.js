const logger = require('../../../util/logger')
const jwt = require('../../../util/jwt')
const UserModel = require('../../../models/user')

module.exports = async function (parent, { name, password }, context) {
  const [err, result] = await UserModel.find({ name, password })
  if (err) {
    throw err
  }
  if (result.length === 0) {
    throw new Error('username or password is incorrect')
  }
  const { id } = result[0]
  logger.debug(result[0])
  return jwt.sign({ id })
}