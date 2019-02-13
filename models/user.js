
const ORM = require('./orm')
const { query } = require('../database')

class UserModel extends ORM {
  static async findById(id) {
    return await query(`SELECT * FROM ${this.tableName} WHERE id = ${id}`)
  }
  static async findByName(name) {
    return await query(`SELECT * FROM ${this.tableName} WHERE name = '${name}'`)
  }
  static async find(conditions) {
    return await this.findByCondition(conditions)
  }
}

UserModel.tableName = 'users'

module.exports = UserModel