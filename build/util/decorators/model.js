"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function tableName(name) {
    return function (target) {
        target.tableName = name;
        target.prototype.tableName = () => name;
    };
}
exports.tableName = tableName;
//# sourceMappingURL=model.js.map