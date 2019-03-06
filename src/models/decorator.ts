export function tableName(name) {
    return function(target) {
        target.tableName = name
    }
}
