import { ORM } from "./orm";
const { tableName } = require("./decorator.js");

@tableName("posts")
export class PostModel extends ORM {
    protected getCondition(): Object {
        throw new Error("Method not implemented.");
    }
}
