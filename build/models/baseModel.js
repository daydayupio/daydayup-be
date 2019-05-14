"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
class BaseModel {
    constructor() {
        this.id = null;
        this.created_at = null;
        this.updated_at = null;
    }
    tableName() {
        return BaseModel.tableName;
    }
    /** 查询 */
    find(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.queryResult(findSQL(this.tableName(), condition));
        });
    }
    /** 根据 id 查询 */
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.find({ id }))[0];
        });
    }
    /** 查询所有 */
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.find();
        });
    }
    /** 传入 sql 语句查询 */
    query(sql) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.queryResult(sql);
        });
    }
    /** 插入记录 */
    insert(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield database_1.insertResult(insertSQL(this.tableName(), condition)))[0];
        });
    }
    /** 更新记录 */
    update(condition, whereClause) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!whereClause) {
                throw new Error("update need where clause");
            }
            return database_1.updateResult(updateSQL(this.tableName(), condition, whereClause));
        });
    }
    /** 删除记录 */
    delete(whereClause) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!whereClause) {
                throw new Error("update need where clause");
            }
            return database_1.deleteResult(deleteSQL(this.tableName(), whereClause));
        });
    }
    /** 插入或更新记录 */
    insertOrUpdate(condition, whereClause) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.find(condition);
            if (results.length === 0) {
                return yield this.insert(Object.assign({}, condition, whereClause));
            }
            else {
                return yield this.update(condition, whereClause);
            }
        });
    }
}
exports.BaseModel = BaseModel;
/** 构造 sql 查询语句 */
function findSQL(tableName, condition) {
    return `SELECT * FROM ${tableName} WHERE ${whereClauseSQL(condition)}`;
}
/** 构造 sql 插入语句 */
function insertSQL(tableName, condition) {
    const now = new Date();
    const conditions = Object.entries(Object.assign({}, condition, { created_at: now, updated_at: now }));
    const fieldsSQL = conditions.map(([key]) => key).join(", ");
    const valuesSQL = conditions
        .map(([, val]) => database_1.conn.escape(val))
        .join(", ");
    return `INSERT INTO ${tableName} (${fieldsSQL}) VALUES (${valuesSQL})`;
}
/** 构造 sql 更新语句 */
function updateSQL(tableName, condition, whereClause) {
    const now = new Date();
    const conditions = Object.entries(Object.assign({}, condition, { updated_at: now }));
    const sql = conditions
        .map(([key, val]) => {
        return `${key}=${database_1.conn.escape(val)}`;
    })
        .join(", ");
    return `UPDATE ${tableName} SET ${sql} WHERE ${whereClauseSQL(whereClause)}`;
}
/** 构造 sql 删除语句 */
function deleteSQL(tableName, whereClause) {
    const now = new Date();
    return `DELETE FROM ${tableName} WHERE ${whereClauseSQL(whereClause)}`;
}
/** 构造 sql where 条件语句 */
function whereClauseSQL(condition) {
    if (!condition || Object.keys(condition).length === 0) {
        return "1=1";
    }
    const conditions = Object.entries(condition);
    return conditions
        .map(([key, val]) => {
        return `${key}=${database_1.conn.escape(val)}`;
    })
        .join(" AND ");
}
//# sourceMappingURL=baseModel.js.map