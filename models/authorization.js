const ORM = require('./orm')

class AuthorizationModel extends ORM {
  constructor({ user_id }) {
    this.user_id = user_id
  }
}

AuthorizationModel.tableName = 'authorizations'

module.exports = AuthorizationModel