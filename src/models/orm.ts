import { query, conn } from "../database";
export abstract class ORM {
    protected static tableName: string;
    protected id: number;
    protected created_at: Date;
    protected updated_at: Date;
    /**
     * @param {object} condition
     */
    static async find(condition?: object) {
        return query(this.findSQL(condition));
    }

    /**
     * @param {string} id
     */
    static async findById(id) {
        const { results } = await this.find({ id });
        return results[0];
    }
    static async findAll() {
        return this.find();
    }

    /**
     * @param {string} sql
     */
    static async query(sql) {
        return query(sql);
    }

    static async insert(condition) {
        return query(this.insertSQL(condition));
    }
    static async update(condition, whereClause) {
        if (!whereClause) {
            throw new Error("update need where clause");
        }
        return query(this.updateSQL(condition, whereClause));
    }

    static findSQL(condition) {
        return `SELECT * FROM ${this.tableName} WHERE ${this.whereClauseSQL(
            condition
        )}`;
    }
    static insertSQL(condition = null) {
        const now = new Date();
        const conditions = Object.entries({
            ...condition,
            created_at: now,
            updated_at: now,
        });
        const fieldsSQL = conditions.map(([key]) => key).join(", ");
        const valuesSQL = conditions
            .map(([, val]) => conn.escape(val))
            .join(", ");
        return `INSERT INTO ${
            this.tableName
        } (${fieldsSQL}) VALUES (${valuesSQL})`;
    }
    static updateSQL(condition, whereClause) {
        const now = new Date();
        const conditions = Object.entries({ ...condition, updated_at: now });
        const sql = conditions
            .map(([key, val]) => {
                return `${key}=${conn.escape(val)}`;
            })
            .join(", ");
        return `UPDATE ${this.tableName} SET ${sql} WHERE ${this.whereClauseSQL(
            whereClause
        )}`;
    }

    static whereClauseSQL(condition?: object) {
        if (!condition) {
            return "1=1";
        }
        const conditions = Object.entries(condition);
        return conditions
            .map(([key, val]) => {
                return `${key}=${conn.escape(val)}`;
            })
            .join(" AND ");
    }

    constructor() {
        this.id = null;
        this.created_at = null;
        this.updated_at = null;
    }
    public async create() {
        return query(ORM.insertSQL(this.mergeCondition()));
    }
    public async update() {}
    private mergeCondition() {
        return Object.assign({}, this.getCondition(), {
            id: this.id,
        });
    }
    protected abstract getCondition(): Object;
}
