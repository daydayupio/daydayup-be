export function tableName(name: string) {
    return function (target: any) {
        target.tableName = name;
        target.prototype.tableName = () => name
    };
}
