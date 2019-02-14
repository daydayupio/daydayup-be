const UserModel = require('../../../models/user')
const jwt = require('../../../util/jwt')
const pw = require('../../../util/password')
const logger = require('../../../util/logger')

module.exports = async function (parent, { name, email, password }, context) {
  // judge repeat name
  var { results } = await UserModel.find({ name })
  if (results.length > 0) {
    throw new Error('username is invalid')
  }

  // insert record
  await UserModel.insert({ name, email, password: pw.encrypt(password) })

  const user = await UserModel.validate({ name, password })
  if (!user) {
    throw new Error('register error')
  }

  // login
  return jwt.sign({ id: user.id, name: user.name })
}