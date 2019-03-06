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
class ORM {
    /**
     * @param {object} condition
     */
    static find(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.query(this.findSQL(condition));
        });
    }
    /**
     * @param {string} id
     */
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { results } = yield this.find({ id });
            return results[0];
        });
    }
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.find();
        });
    }
    /**
     * @param {string} sql
     */
    static query(sql) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.query(sql);
        });
    }
    static insert(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.query(this.insertSQL(condition));
        });
    }
    static update(condition, whereClause) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!whereClause) {
                throw new Error("update need where clause");
            }
            return database_1.query(this.updateSQL(condition, whereClause));
        });
    }
    static findSQL(condition) {
        return `SELECT * FROM ${this.tableName} WHERE ${this.whereClauseSQL(condition)}`;
    }
    static insertSQL(condition = null) {
        const now = new Date();
        const conditions = Object.entries(Object.assign({}, condition, { created_at: now, updated_at: now }));
        const fieldsSQL = conditions.map(([key]) => key).join(", ");
        const valuesSQL = conditions
            .map(([, val]) => database_1.conn.escape(val))
            .join(", ");
        return `INSERT INTO ${this.tableName} (${fieldsSQL}) VALUES (${valuesSQL})`;
    }
    static updateSQL(condition, whereClause) {
        const now = new Date();
        const conditions = Object.entries(Object.assign({}, condition, { updated_at: now }));
        const sql = conditions
            .map(([key, val]) => {
            return `${key}=${database_1.conn.escape(val)}`;
        })
            .join(", ");
        return `UPDATE ${this.tableName} SET ${sql} WHERE ${this.whereClauseSQL(whereClause)}`;
    }
    static whereClauseSQL(condition) {
        if (!condition) {
            return "1=1";
        }
        const conditions = Object.entries(condition);
        return conditions
            .map(([key, val]) => {
            return `${key}=${database_1.conn.escape(val)}`;
        })
            .join(" AND ");
    }
    constructor() {
        this.id = null;
        this.created_at = null;
        this.updated_at = null;
    }
    insert() {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.query(ORM.insertSQL());
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.ORM = ORM;
//# sourceMappingURL=orm.js.map