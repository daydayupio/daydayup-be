import { conn, queryResult, insertResult, updateResult, deleteResult } from "../database";

export interface BaseDef {
    id: string
    created_at: Date
    updated_at: Date
}

export abstract class BaseModel<Def> {
    static tableName: string;

    public id: string;
    public created_at: Date;
    public updated_at: Date;
    constructor() {
        this.id = null;
        this.created_at = null;
        this.updated_at = null;
    }

    tableName() {
        return BaseModel.tableName
    }

    /** 查询 */
    async find(condition?: Partial<Def>) {
        return queryResult<Def>(findSQL(this.tableName(), condition));
    }

    /** 根据 id 查询 */
    async findById(id: string) {
        return (await this.find({ id } as unknown as Partial<Def>))[0]
    }

    /** 查询所有 */
    async findAll() {
        return this.find();
    }

    /** 传入 sql 语句查询 */
    async query<T>(sql: string) {
        return queryResult<T>(sql);
    }

    /** 插入记录 */
    async insert(condition: Partial<Def>) {
        return (await insertResult(insertSQL(this.tableName(), condition)))[0]
    }

    /** 更新记录 */
    async update<T>(condition: T, whereClause: T) {
        if (!whereClause) {
            throw new Error("update need where clause");
        }
        return updateResult(updateSQL(this.tableName(), condition, whereClause));
    }

    /** 删除记录 */
    async delete(whereClause: Partial<Def>) {
        if (!whereClause) {
            throw new Error("update need where clause");
        }
        return deleteResult(deleteSQL(this.tableName(), whereClause));
    }

    /** 插入或更新记录 */
    async insertOrUpdate(condition: Partial<Def>, whereClause: Partial<Def>) {
        const results = await this.find(condition);
        if (results.length === 0) {
            return await this.insert(Object.assign({}, condition, whereClause))
        } else {
            return await this.update(condition, whereClause)
        }
    }
}





/** 构造 sql 查询语句 */
function findSQL<T>(tableName: string, condition: T) {
    return `SELECT * FROM ${tableName} WHERE ${whereClauseSQL(
        condition
    )}`;
}

/** 构造 sql 插入语句 */
function insertSQL<T>(tableName: string, condition: T) {
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
        tableName
        } (${fieldsSQL}) VALUES (${valuesSQL})`;
}

/** 构造 sql 更新语句 */
function updateSQL<T>(tableName: string, condition: T, whereClause: T) {
    const now = new Date();
    const conditions = Object.entries({ ...condition, updated_at: now });
    const sql = conditions
        .map(([key, val]) => {
            return `${key}=${conn.escape(val)}`;
        })
        .join(", ");
    return `UPDATE ${tableName} SET ${sql} WHERE ${whereClauseSQL<T>(
        whereClause
    )}`;
}

/** 构造 sql 删除语句 */
function deleteSQL<T>(tableName: string, whereClause: T) {
    const now = new Date();
    return `DELETE FROM ${tableName} WHERE ${whereClauseSQL<T>(
        whereClause
    )}`;
}

/** 构造 sql where 条件语句 */
function whereClauseSQL<T>(condition?: T) {
    if (!condition || Object.keys(condition).length === 0) {
        return "1=1";
    }
    const conditions = Object.entries(condition);
    return conditions
        .map(([key, val]) => {
            return `${key}=${conn.escape(val)}`;
        })
        .join(" AND ");
}
