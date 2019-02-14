const jwt = require('../../../util/jwt')
const UserModel = require('../../../models/user')
module.exports = async function (parent, data, context) {
  if (!context.user) {
    throw new Error('not login')
  }

  const userId = context.user.id

  const condition = {}
  Object.entries(data).forEach(([key, val]) => {
    condition[key] = key === 'password' ? UserModel.encryptPassword(val) : val
  })
  await UserModel.update(condition, { id: userId })
  const { results } = await UserModel.find({ id: userId })
  const user = results[0]
  context.user = { id: user.id, name: user.name }
  return jwt.sign({ id: user.id, name: user.name })
}