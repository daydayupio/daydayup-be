import { ORM } from "./orm"
const { tableName } = require("./decorator.js")

@tableName("posts")
export class PostModel extends ORM {}
