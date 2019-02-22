const { query, conn } = require('../database')
module.exports = class ORM {
  static find(condition) {
    return query(this.findSQL(condition))
  }
  static findAll() {
    return this.find()
  }
  static query(sql) {
    return query(sql)
  }
  static insert(condition) {
    const date = new Date()
    const created_at = date
    const updated_at = date
    const newCondition = { ...condition, created_at, updated_at }
    return query(this.insertSQL(newCondition))
  }
  static update(condition, whereClause) {
    if (!whereClause) {
      throw new Error('update need where clause')
    }
    const date = new Date()
    const updated_at = date
    const newCondition = { ...condition, updated_at }
    return query(this.updateSQL(newCondition, whereClause))
  }

  static findSQL(condition) {
    return `SELECT * FROM ${this.tableName} WHERE ${this.whereClauseSQL(condition)}`
  }
  static insertSQL(condition) {
    const conditions = Object.entries(condition)
    const fieldsSQL = conditions.map(([key]) => key).join(', ')
    const valuesSQL = conditions.map(([, val]) => conn.escape(val)).join(', ')
    return `INSERT INTO ${this.tableName} (${fieldsSQL}) VALUES (${valuesSQL})`
  }
  static updateSQL(condition, whereClause) {
    const conditions = Object.entries(condition)
    const sql = conditions.map(([key, val]) => {
      return `${key}=${conn.escape(val)}`
    }).join(', ')
    return `UPDATE ${this.tableName} SET ${sql} WHERE ${this.whereClauseSQL(whereClause)}`
  }

  static whereClauseSQL(condition) {
    if (!condition) {
      return '1=1'
    }
    const conditions = Object.entries(condition)
    return conditions.map(([key, val]) => {
      return `${key}=${conn.escape(val)}`
    }).join(' AND ')
  }
}