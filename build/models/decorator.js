function tableName(name) {
    return function (target) {
        target.tableName = name;
    };
}
module.exports = {
    tableName,
};
//# sourceMappingURL=decorator.js.map