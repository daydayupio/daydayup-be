const jwt = require('jsonwebtoken')
const { salt } = require('../config/jwt')
const UserModel = require('../models/user')

module.exports = class Auth {
  /**
   * 
   * @param {object} payload 
   * @param {string} payload.name
   * @param {string} payload.password
   */
  static login(payload) {
    return jwt.sign({ name: payload.name })
  }
  static async getUserByToken(token) {
    if (!token) {
      return null
    }
    const user = jwt.verify(token, salt)
    if (!user) {
      return null
    }
    const valid = await UserModel.isTokenValid({ userId: user.id, token })
    if (!valid) {
      return null
    }
    return user
  }
}