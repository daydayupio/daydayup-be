const { query } = require('../database')
module.exports = class ORM {
  static findByCondition(condition) {
    const conditions = Object.entries(condition)
    const conditionSQL = conditions.map(([key, val]) => {
      if (typeof val === 'string') {
        return `${key} = '${val}'`
      } else {
        return `${key} = ${val}`
      }
    }).join(' AND ')
    return query(`SELECT * FROM ${this.tableName} WHERE ${conditionSQL}`)
  }
}