"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function tableName(name) {
    return function (target) {
        target.tableName = name;
    };
}
exports.tableName = tableName;
function tableFields(fields) {
    return function (target) {
        target.tableFields = fields;
        fields.forEach(it => {
            target.prototype[it.name] = it.type;
        });
    };
}
exports.tableFields = tableFields;
//# sourceMappingURL=decorator.js.map