const UserModel = require('../../../models/user')

module.exports = async function () {
  const { results } = await UserModel.findAll()
  return results
}