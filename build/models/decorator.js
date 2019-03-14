"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function tableName(name) {
    return function (target) {
        target.tableName = name;
    };
}
exports.tableName = tableName;
//# sourceMappingURL=decorator.js.map