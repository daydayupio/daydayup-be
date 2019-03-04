const { query, conn } = require("../database")
module.exports = class ORM {
    /**
     * @param {object} condition
     */
    static async find(condition) {
        return query(this.findSQL(condition))
    }

    /**
     * @param {string} id
     */
    static async findById(id) {
        const { results } = await this.find({ id })
        return results[0]
    }
    static async findAll() {
        return this.find()
    }

    /**
     * @param {string} sql
     */
    static async query(sql) {
        return query(sql)
    }

    static async insert(condition) {
        return query(this.insertSQL(condition))
    }
    static async update(condition, whereClause) {
        if (!whereClause) {
            throw new Error("update need where clause")
        }
        return query(this.updateSQL(condition, whereClause))
    }

    static findSQL(condition) {
        return `SELECT * FROM ${this.tableName} WHERE ${this.whereClauseSQL(
            condition
        )}`
    }
    static insertSQL(condition) {
        const now = new Date()
        const conditions = Object.entries({
            ...condition,
            created_at: now,
            updated_at: now,
        })
        const fieldsSQL = conditions.map(([key]) => key).join(", ")
        const valuesSQL = conditions
            .map(([, val]) => conn.escape(val))
            .join(", ")
        return `INSERT INTO ${
            this.tableName
        } (${fieldsSQL}) VALUES (${valuesSQL})`
    }
    static updateSQL(condition, whereClause) {
        const now = new Date()
        const conditions = Object.entries({ ...condition, updated_at: now })
        const sql = conditions
            .map(([key, val]) => {
                return `${key}=${conn.escape(val)}`
            })
            .join(", ")
        return `UPDATE ${this.tableName} SET ${sql} WHERE ${this.whereClauseSQL(
            whereClause
        )}`
    }

    static whereClauseSQL(condition) {
        if (!condition) {
            return "1=1"
        }
        const conditions = Object.entries(condition)
        return conditions
            .map(([key, val]) => {
                return `${key}=${conn.escape(val)}`
            })
            .join(" AND ")
    }

    constructor() {
        this.fields = [
            {
                id: {
                    type: Number,
                },
                created_at: {
                    type: Date,
                },
                updated_at: {
                    type: Date,
                },
            },
        ]
        this.id = null
        this.createdAt = null
        this.updatedAt = null
    }
    async insert() {
        return query(ORM.insertSQL())
    }
    async update() {}
}
