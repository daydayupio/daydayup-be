const UserModel = require('../../../models/user')

module.exports = async function (parent, data, context) {
  const { results } = await UserModel.findAll()
  return results
}