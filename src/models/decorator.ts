export function tableName(name) {
    return function(target) {
        target.tableName = name;
    };
}

export function tableFields(
    fields: Array<{
        name: string;
        type: NumberConstructor | StringConstructor | DateConstructor;
    }>
) {
    return function(target) {
        target.tableFields = fields;
        fields.forEach(it => {
            target.prototype[it.name] = it.type;
        });
    };
}
