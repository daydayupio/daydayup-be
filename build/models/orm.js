var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { query, conn } = require("../database");
module.exports = class ORM {
    /**
     * @param {object} condition
     */
    static find(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            return query(this.findSQL(condition));
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
            return query(sql);
        });
    }
    static insert(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            return query(this.insertSQL(condition));
        });
    }
    static update(condition, whereClause) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!whereClause) {
                throw new Error("update need where clause");
            }
            return query(this.updateSQL(condition, whereClause));
        });
    }
    static findSQL(condition) {
        return `SELECT * FROM ${this.tableName} WHERE ${this.whereClauseSQL(condition)}`;
    }
    static insertSQL(condition) {
        const now = new Date();
        const conditions = Object.entries(Object.assign({}, condition, { created_at: now, updated_at: now }));
        const fieldsSQL = conditions.map(([key]) => key).join(", ");
        const valuesSQL = conditions
            .map(([, val]) => conn.escape(val))
            .join(", ");
        return `INSERT INTO ${this.tableName} (${fieldsSQL}) VALUES (${valuesSQL})`;
    }
    static updateSQL(condition, whereClause) {
        const now = new Date();
        const conditions = Object.entries(Object.assign({}, condition, { updated_at: now }));
        const sql = conditions
            .map(([key, val]) => {
            return `${key}=${conn.escape(val)}`;
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
            return `${key}=${conn.escape(val)}`;
        })
            .join(" AND ");
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
        ];
        this.id = null;
        this.createdAt = null;
        this.updatedAt = null;
    }
    insert() {
        return __awaiter(this, void 0, void 0, function* () {
            return query(ORM.insertSQL());
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
};
//# sourceMappingURL=orm.js.map