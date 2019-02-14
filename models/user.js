
const ORM = require('./orm')
const pw = require('../util/password')
// const { query } = require('../database')

class UserModel extends ORM {
  static async validate({ name, password }) {
    const { results } = await this.find({ name, password: pw.encrypt(password) })
    return results[0]
  }
  static encryptPassword(password) {
    return pw.encrypt(password)
  }
}

UserModel.tableName = 'users'

module.exports = UserModel