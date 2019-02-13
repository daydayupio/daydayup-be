const jwt = require('../../../util/jwt')
module.exports = function (parent, args, context) {
  console.log(arguments)
  return context.user.name
  return jwt.sign({ name: 'lisiur' }, salt)
}
