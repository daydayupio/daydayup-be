const jwt = require('jsonwebtoken')
const {ApolloError} = require('apollo-server-express')
const { salt } = require('../config/jwt')
const UserModel = require('../models/user')
const ERROR_CODE = require('../config/errorCode')

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
  static async getUserByAuthorization(authorization) {
    const token = authorization.split(' ')[1]
    return await this.getUserByToken(token)
  }
  static async getUserByToken(token) {
    if (!token) {
      return null
    }
    let user
    try {
      user = jwt.verify(token, salt)
    } catch (err) {
      throw new ApolloError(err.message, ERROR_CODE.SESSION_EXPIRED)
    }
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