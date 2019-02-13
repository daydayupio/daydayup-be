const jwt = require('jsonwebtoken')
const { salt } = require('../config/jwt')

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
  static getUserByToken(token) {
    if (!token) {
      return null
    }
    return jwt.verify(token, salt)
  }
}