const UserModel = require('../../../models/user')

module.exports = async function (parent, data, context) {
  const user = context.user
  return user
}