
const ORM = require('./orm')
const pw = require('../util/password')
const AuthorizationModel = require('./authorization')
// const { query } = require('../database')

class UserModel extends ORM {
  static async validate({ name, password }) {
    const { results } = await this.find({ name, password: pw.encrypt(password) })
    return results[0]
  }
  static async isTokenValid({ userId, token }) {
    const { results } = await AuthorizationModel.find({ user_id: userId, token })
    return results.length > 0
  }
  static encryptPassword(password) {
    return pw.encrypt(password)
  }
  static async updateToken({ userId, token }) {
    const { results } = await AuthorizationModel.find({ user_id: userId })
    if (results.length === 0) {
      await AuthorizationModel.insert({ user_id: id, token })
    } else {
      const authorizationRecord = results[0]
      const authorizationId = authorizationRecord.id
      await AuthorizationModel.update({ token }, { id: authorizationId })
    }
  }
}

UserModel.tableName = 'users'

module.exports = UserModel