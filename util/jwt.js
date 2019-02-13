const { salt } = require('../config/jwt')
const jwt = require('jsonwebtoken')
const defaultOptions = {
  expiresIn: '2h',
}
module.exports = {
  /**
   * sign
   * @param {*} payload 
   * @param {SignOptions} options 
   */
  sign(payload, options) {
    const newOptions = Object.assign({}, defaultOptions, options)
    return jwt.sign(payload, salt, newOptions)
  },
  verify(token) {
    return jwt.verify(token, salt)
  }
}